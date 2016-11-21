// projectile.js: A demo showing a prototype medium for reasoning
// about projectile motion in two dimensions.
//
// By Michael Nielsen, July 2016
//
// MIT License
//
// Written to target Chrome (~53) on OS X

// The gravitational constant, in nominal units.  Be careful about the
// sign: in our co-ordinate system, with increasing y being "up", the
// acceleration is -g.
var g = 1;
var GHOSTCOLOR = "#ccccff";
var GHOSTBORDER = "#7777dd";

(function() {
    "use strict";
    // Configuration
    var DEBUGGING = false;
    var STARTSLIDE = 0;
    var StoneColor = "#ff5555",	Obj1Color = "#99cc00", Obj2Color = "#00cc99";
    var ObjectRadius = 6; // used for stone and both other objects

    
    // setup scales: map x = 0 to 200 to 40 to 660 and y = 0 to 100 to
    // 460 to 100, as well as the corresponding maps for velocity
    function xScale(x) {
	return 40+x*620/200.0;
    }
    function yScale(y) {
	return 460-y*360/100.00;
    }

    function vxScale(vx) {
	return vx*620/200.0;
    }
    function vyScale(vy) {
	return -vy*360/100.00;
    }


    function ProjectileVector(demo, x, y, vx, vy) {
	this.demo = demo;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.mouseover = false;
    }

    ProjectileVector.prototype.end = function() {
	return {x: xScale(this.x)+vxScale(this.vx), y: yScale(this.y)+vyScale(this.vy)};
    };

    ProjectileVector.prototype.color = function() {
	return (this.mouseover)? "#dddd55" : StoneColor;
    };

    ProjectileVector.prototype.display = function() {
	this.demo.ctx.arrow(xScale(this.x), yScale(this.y), this.end().x, this.end().y,
			    this.color());
    };

    ProjectileVector.prototype.checkMouseover = function(mouse) {
	// Return true if mouse if over the vector
	var xLeft = Math.min(xScale(this.x), xScale(this.x)+vxScale(this.vx));
	var yTop = Math.min(yScale(this.y), yScale(this.y)+vyScale(this.vy));
	var xRight = Math.max(xScale(this.x), xScale(this.x)+vxScale(this.vx));
	var yBottom = Math.max(yScale(this.y), yScale(this.y)+vyScale(this.vy));
	return (mouse.x > xLeft-mouse.img.width) && (mouse.x < xRight) &&
	    (mouse.y > yTop-mouse.img.height) && (mouse.y < yBottom);
    };


    ProjectileVector.prototype.swing = function(vx1, vy1, mouse, callback, trajectory) {
	// if the optional trajectory parameter is provided, we'll swing it around too
	var vx0 = this.vx, vy0 = this.vy;
	var mouseX0 = mouse.x, mouseY0 = mouse.y;
	var j = 0;
	var steps = Math.ceil(0.5*vectorLength(vxScale(vx1-vx0), vyScale(vy1-vy0)));
	interp.bind(this)();
	function interp() {
	    j++;
	    this.vx = vx0+(j/steps)*(vx1-vx0);
	    this.vy = vy0+(j/steps)*(vy1-vy0);
	    mouse.x = mouseX0+(j/steps)*vxScale(vx1-vx0);
	    mouse.y = mouseY0+(j/steps)*vyScale(vy1-vy0);
	    mouse.display();
	    if (trajectory) {
		trajectory.recomputeUnderGravity(this.vx, this.vy);
	    }
	    this.demo.display();
	    if (j < steps) {myRequestAnimationFrame(interp.bind(this));} else {callback();}
	}
    };


    function Ghosts(N, x0, y0, x1, y1) {
	this.ghosts = [];
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1;
	var ghost;
	var deltax = x1-x0, deltay = y1-y0;
	var phi = Math.acos(deltay / Math.sqrt(deltax*deltax+deltay*deltay));
	var phij, nx, ny, v;
	for (var j=1; j <=N; j++) {
	    phij = (j/(N+1))*phi;
	    nx = Math.sin(phij);
	    ny = Math.cos(phij);
	    v = Math.sqrt(g/2)*Math.abs(deltax/nx)/Math.sqrt(deltax*ny/nx-deltay);
	    this.ghosts.push(new Ghost(phij, x0, y0, nx, ny, v));
	}
    }

    Ghosts.prototype.display = function() {
	for (var j=0; j < this.ghosts.length; j++) {
	    this.ghosts[j].display();
	}
	var xFinal = 200;
	var deltaY = (xFinal/(this.x1-this.x0))*(this.y1-this.y0);
	projectileDemo.ctx.line(xScale(this.x1), yScale(-10), xScale(this.x1), yScale(130), GHOSTBORDER);
	// This assumes this.x0 is 0, as it is in my examples.
	projectileDemo.ctx.line(
	    xScale(this.x0), yScale(this.y0), xScale(xFinal), yScale(this.y0+deltaY), GHOSTBORDER);
    };

    Ghosts.prototype.suppress = function() {
	// this suppresses mouseover highlighting, which is used in
	// Ghost.prototype.display.  Something of a hack, should be
	// fixed by better design.
	for (var j=0; j < this.ghosts.length; j++) {this.ghosts[j].suppressFlag = true;}
    };

    Ghosts.prototype.express = function() {
	// Opposite of Ghosts.prototype.suppress
	for (var j=0; j < this.ghosts.length; j++) {this.ghosts[j].suppressFlag = false;}
    };

    function Ghost(phi, x0, y0, nx, ny, v) {
	this.positions = [];
	this.x0 = x0;
	this.y0 = y0;
	this.vx = v*nx;
	this.vy = v*ny;
	this.mouseover = false;
	this.suppressFlag = true; // don't change color on mouseover, initially
	function position(x0, vx, y0, vy, t) {
	    return {x: x0+vx*t, y: y0+vy*t-0.5*g*t*t, t: t};
	}
	for (var t=0; t <= 40; t+=0.5) {
	    this.positions.push(position(x0, this.vx, y0, this.vy, t));
	}
    }

    Ghost.prototype.display = function() {
	this.checkMouseover(mouse);
	var col = ((this.mouseover) && (!this.suppressFlag)) ? GOLD : GHOSTCOLOR;
        for (var j=0; j < this.positions.length-1; j++) {
	    projectileDemo.ctx.line(
		xScale(this.positions[j].x), yScale(this.positions[j].y),
		xScale(this.positions[j+1].x), yScale(this.positions[j+1].y),
		col);
	}
    };

    Ghost.prototype.checkMouseover = function(mouse) {
	// Ideally, the redundancy between this and the corresponding
	// Trajectory method would be removed.
	var x = mouse.x+mouse.img.width/2;
	var y = mouse.y+mouse.img.height/2;
	function nearby(pos, x, y) {
	    return (Math.sqrt(Math.pow(xScale(pos.x)-x, 2)+Math.pow(yScale(pos.y)-y, 2)) < 10);
	}
	this.mouseover = (this.positions.some(function(p) {return nearby(p, x, y);}));
    };

    //
    // CREATE THE DEMO OBJECT, AND ADD THE SLIDES
    //
    var projectileDemo = new Demo("projectile", "canvas", STARTSLIDE, DEBUGGING); 

    var xAxis = {}, yAxis = {}, launchPoint = {};
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Suppose we're standing on top of a hill, and launch a projectile through the air");
	xAxis.display = function() {
	    projectileDemo.ctx.arrow(xScale(0), yScale(0), xScale(200), yScale(0), "#555555");
	}
	yAxis.display = function() {
	    projectileDemo.ctx.arrow(xScale(0), yScale(0), xScale(0), yScale(100), "#555555");
	}
	launchPoint.display = function() {
	    projectileDemo.ctx.strokeStyle = "#555555";
	    projectileDemo.ctx.line(xScale(-2), yScale(82), xScale(2), yScale(78));
	    projectileDemo.ctx.line(xScale(-2), yScale(78), xScale(2), yScale(82));
	}
	projectileDemo.scene.push(xAxis, yAxis, launchPoint);
	projectileDemo.display();
	callback();
    })


    function play(callback, t0) {
	var t0, t, t1=20, delta=0.2, j=0;
	if (!t0) {t0=0;}
	t = t0;
	cast();
	function cast() {
	    projectileDemo.ctx.clear();
	    projectileDemo.display(j);
	    j++;
	    t += delta;
	    if (t <= t1) {myRequestAnimationFrame(cast)} else {callback();}
	}
    }

    
    var traj, stone;
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "The projectile moves freeely, accelerating under gravity only.  We "+
		"neglect air friction");
	var t0=0, t=t0, t1 = 20, delta = 0.2, j=0;
	traj = new Trajectory(projectileDemo, t0, t1, delta,
			      function(t) {return positionUnderGravity(0, 80, 8, 5, t0, t)},
			      xScale, yScale);
	stone = new Ball(projectileDemo, ObjectRadius, StoneColor, traj, xScale, yScale);
	projectileDemo.scene.push(traj, stone);
	mySetTimeout(function() {play(callback)}, 1000);
    })

    
    var traj1, traj2, object1, object2;
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("Suppose two target objects are also flying around");
        var t0=0, t=t0, t1 = 20, delta = 0.2, j=0;
	traj1 = new Trajectory(projectileDemo, t0, t1, delta, positionObject1, xScale, yScale);
	traj2 = new Trajectory(projectileDemo, t0, t1, delta, positionObject2, xScale, yScale);
	object1 = new Ball(projectileDemo, ObjectRadius, Obj1Color, traj1, xScale, yScale);
	object2 = new Ball(projectileDemo, ObjectRadius, Obj2Color, traj2, xScale, yScale);
	projectileDemo.scene.push(traj1, traj2, object1, object2);
	play(callback);
    })
    function positionObject1(t) {
	var x = 200-10*t;
	return {x: x, y: 20+x/3+10*Math.sin(t/2), t: t}
    }

    function positionObject2(t) {
	var rescaledT = Math.pow(t/20, 1.4)*20;
	var x = 200-10*rescaledT;
	return {x: x, y: 25-0.1*x+3*sawtooth(t/2), t: t}
    }
    
    projectileDemo.addMessageSlides(
	"The target trajectories are arbitrary &ndash; think of the targets as drones which "+
	    "can move in any fashion",
	"With our current aim, the projectile misses both targets");
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Let's watch it again, noticing the projectile miss both targets");
	mySetTimeout(function() {play(callback)}, 1000);
    });
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("If we aim the projectile differently, it may hit one of the targets");
	projectileDemo.removeObject(traj);
	projectileDemo.removeObject(stone);
	var t0=0, t=t0, t1 = 20, delta = 0.2, j=0;
	traj = new Trajectory(projectileDemo, t0, t1, delta,
			      function(t) {return positionUnderGravity(0, 80, 16, 0, t0, t)},
			      xScale, yScale);
	stone = new Ball(projectileDemo, ObjectRadius, StoneColor, traj, xScale, yScale);
	projectileDemo.scene.push(traj, stone);
	mySetTimeout(function() {play(callback)}, 1000);
    });
    projectileDemo.addMessageSlides(
	"Is it possible to launch the projectile so it intersects both targets?",
	"&ldquo;Killing two drones with one stone&rdquo;, so to speak?",
	"To solve this problem seems to me to be a difficult problem in mechanics",
	"I tried solving it through a conventional algebraic approach.  No luck!",
	"But using an interface building in powerful ideas from mechanics, we'll discover "+
	    "some interesting insights",
	"We won't solve the problem completely. But we will gain lots of understanding!",
	"As a warmup, let's figure out when it's possible to hit a single target",
	"If you've ever spent much time throwing a ball, you probably know intuitively "+
	    "that this is always possible",
	"It's great to have that everyday intuition",
	"But it's also desirable to have a justification for the everyday intuition, based "+
	    "on the laws of mechanics",
	"Building up comfort and understanding and &ndash; eventually &ndash; intuition "+
	    "based on those laws ultimately leads to a more 'scalable' understanding "+
	    "of particle motion",
	"I'll switch to showing a prototype interactive medium where we attack "+
	    "this problem");
    
    var playIcon, timeSlider, resetTimeIcon, playForwardIcon, playBackwardIcon;
    var mouse, stoneVelocity;
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Here's the medium.  I've started out showing the stone, its launch velocity, and a "+
		"single target object");
	// reset time
	projectileDemo.k = 0;
	// add icons and mouse pointer
	projectileDemo.removeObject(traj2);
	projectileDemo.removeObject(object2);
	// add icons
	playIcon = new Icon(projectileDemo, "play", 0, 0, 44);
	var t0 = 0, t1 = 20, delta = 0.2, N = (t1-t0)/delta;;
	timeSlider = new Slider(projectileDemo, "&nbsp;time:", 44, 0, 100, 45, 5, t0, t1, t0, N);
	resetTimeIcon = new Icon(projectileDemo, "reset time", 144, 0, 90);
	playBackwardIcon = new Icon(projectileDemo, "<", 234, 0, 30);
	playForwardIcon = new Icon(projectileDemo, ">", 264, 0, 30);
	projectileDemo.scene.push(playIcon, timeSlider, resetTimeIcon, playBackwardIcon, playForwardIcon);
	// add the mouse
	mouse = new Mouse(projectileDemo, 50, 100);
	stoneVelocity = new ProjectileVector(projectileDemo, 0, 80, 8, 5);
	traj.recomputeUnderGravity(8, 5);
	projectileDemo.scene.push(stoneVelocity);
	projectileDemo.display();
	callback();
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("We can edit the launch velocity, and the trajectory changes");
	function swing() {
	    mySetTimeout(function() {stoneVelocity.swing(12, -4, mouse, callback, traj)}, 500)
	}
	mouse.move(
	    stoneVelocity.end().x-5, stoneVelocity.end().y-5, swing);
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("Let's see how the stone moves with the changed launch velocity");
	playIcon.clickBy(mouse, function() {play(callback)})
    })

    projectileDemo.addMessageSlides(
	"An elementary result of mechanics says that between any start point and any end point "+
	    "there is always a range of trajectories",
	"We can build this into the interface"
    );

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "To see this, let's delete our trajectory, re-select the original start point, "+
		"select a point on the target trajectory, and select a trajectory for the stone");
	moveToTraj();
	function moveToTraj() {
	    mouse.move(114, 208, function() {mySetTimeout(removeStuff, 300)});
	}
	function removeStuff() {
	    projectileDemo.removeObject(stone);
	    projectileDemo.removeObject(traj);
	    projectileDemo.removeObject(stoneVelocity);
	    projectileDemo.display();
	    mySetTimeout(moveToLaunchPoint, 300);
	}
	function moveToLaunchPoint() {
	    mouse.move(xScale(0), yScale(80), function() {mySetTimeout(addStoneAgain, 300)});
	}
	function addStoneAgain() {
	    projectileDemo.scene.push(stone);
	    projectileDemo.display();
	    mySetTimeout(moveToOther, 300);
	}
	var ghosts, tempBall;
	function moveToOther() {
	    var j=0;
	    var x0 = xScale(0), y0 = yScale(80);
	    var x1 = xScale(100)-5, y1 = yScale(43.74)-5;
	    var steps=100;
	    interp();
	    function interp() {
		j++;
		var x = x0+(j/steps)*(x1-x0);
		var y = y0+(j/steps)*(y1-y0);
		if (j > 8) {
		    ghosts = new Ghosts(10, 0, 80, (j/steps)*100, 80+(j/steps)*(43.74-80));
		    projectileDemo.scene.push(ghosts);
		}
		mouse.x = x;
		mouse.y = y;
		mouse.display();
		projectileDemo.display();
		if ((j > 8) && (j < steps)) {
		    projectileDemo.removeObject(ghosts);
		}
		if (j === steps-10) {
		    tempBall = new StaticBall(
			projectileDemo, ObjectRadius, GOLD, xScale(100), yScale(43.74));
		    projectileDemo.scene.push(tempBall);
		    traj1.col = GOLD;
		}
		if (j < steps) {myRequestAnimationFrame(interp)} else {
		    delete traj1.col;
		    mySetTimeout(selectGhost, 300);};
	    }
	}
	function selectGhost() {
	    ghosts.express();
	    mouse.move(xScale(42.5), yScale(102.6)-5,
		       function() {mySetTimeout(showTrajectory, 300)});
	}
	function showTrajectory() {
	    projectileDemo.removeObject(tempBall);
	    projectileDemo.removeObject(ghosts);
	    var t0=0, t1=20, delta=0.2;
	    var vx = ghosts.ghosts[3].vx;
	    var vy = ghosts.ghosts[3].vy;
	    traj = new Trajectory(
		projectileDemo, t0, t1, delta,
		function(t) {return positionUnderGravity(0, 80, vx, vy, t0, t)},
		xScale, yScale);
	    traj.vx = vx; // we'll need these later, which is why they're being set
	    traj.vy = vy;
	    projectileDemo.scene.push(traj);
	    stone.trajectory = traj;
	    projectileDemo.display();
	    callback();
	}
    })
    
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("Let's see how the stone moves along it's new trajectory");
	playIcon.clickBy(mouse, function() {play(callback)})
    })

    projectileDemo.addMessageSlide(
	"The stone doesn't hit the target trajectory at the right time");

    projectileDemo.addMessageSlide("But we can address that, simply by timing the throw");

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("Let's reset the time to the start");
	resetTimeIcon.clickBy(mouse, resetTime);
	function resetTime() {
	    projectileDemo.k = 0;
	    projectileDemo.display();
	    callback();
	};
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Let's manually move to the time the target crosses the stone's trajectory, then stop");
	playForwardIcon.clickBy(mouse, playForward); 
	function playForward() {
	    var j = 0;
	    playForwardIcon.span.style.color = GOLD;
	    interp();
	    function interp() {
		j++;
		projectileDemo.k = j;
		projectileDemo.display();
		if (j < 50) {mySetTimeout(interp, 35)} else {highlight()};
	    }
	}
	function highlight() {
	    playForwardIcon.span.style.color = "#555555";
	    var oldColor = object1.color;
	    object1.color = GOLD;
	    projectileDemo.display();
	    object1.color = oldColor;
	    callback();
	}
    });

    var localBackwardIcon, localForwardIcon;
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Then displace the stone forward in time.  Informally, we're using the interface to "+
		"\"throw the stone earlier\"");
	mySetTimeout(function() {object1.color = GOLD; stone.clickBy(mouse, stoneColor);}, 0);
	function stoneColor() {
	    object1.color = Obj1Color;
	    stone.color = GOLD;
	    projectileDemo.display();
	    mySetTimeout(function() {
				     projectileDemo.display();
				     localIcons();},
			 300);
	};
	function localIcons() {
	    localBackwardIcon = new Icon(projectileDemo, "local <", 294, 0, 80);
	    localForwardIcon = new Icon(projectileDemo, "local >", 374, 0, 80);
	    projectileDemo.scene.push(localBackwardIcon, localForwardIcon);
	    localForwardIcon.clickBy(mouse, displaceStoneForward);
	}
	function displaceStoneForward() {
	    var j = 0;
	    var deltaT;
	    var displacedTraj;
	    localForwardIcon.span.style.color = GOLD;
	    interp();
	    function interp() {
		j++;
		stone.localDisplacement = j; // something of a hack,
					     // this moves the stone forward along the trajectory
		projectileDemo.display();
		if (j === 35) {
		    projectileDemo.display();
		}
		if (j < 38) {mySetTimeout(interp, 35);}
		else {
		    finishLocalDisplace();
		}
	    }
	}
	function finishLocalDisplace() {
	    mySetTimeout(eraseIcons, 300);
	}
	function eraseIcons() {
	    stone.color = StoneColor;
	    projectileDemo.removeObject(localForwardIcon);
	    projectileDemo.removeObject(localBackwardIcon);
	    removeElement(localForwardIcon.span);
	    removeElement(localBackwardIcon.span);
	    projectileDemo.display();
	    callback();
	}
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Now rewind time everywhere so the stone goes back to the launch point");
	playBackwardIcon.clickBy(mouse, backward);
	function backward() {
	    stone.color = StoneColor;
	    projectileDemo.removeObject(traj);
	    projectileDemo.removeObject(traj1);
	    var t0=-7.6, t=t0, t1 = 20, delta = 0.2, j=0;
	    var vx = traj.vx;
	    var vy = traj.vy;
	    traj = new Trajectory(projectileDemo, t0, t1, delta,
				  function(t) {return positionUnderGravity(0, 80, vx, vy, t0, t)},
				  xScale, yScale);
	    traj1 = new Trajectory(projectileDemo, t0, t1, delta, positionObject1, xScale, yScale);
	    projectileDemo.scene.push(traj, traj1);
	    stone.trajectory = traj;
	    object1.trajectory = traj1;
	    stone.localDisplacement = 0;
	    projectileDemo.k = 0;
	    // now do the actual backward movement
	    var j = 88;
	    playBackwardIcon.span.style.color = GOLD;
	    interp();
	    function interp() {
		j--;
		projectileDemo.k = j;
		projectileDemo.display();
		if (j > 0) {mySetTimeout(interp, 35)}
		else {
		    playBackwardIcon.span.style.color = "#555555";
		    callback();
		};
	    }
	}
    });

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "And then play the full trajectory, noticing that the stone does, indeed, hit the target");
	playIcon.clickBy(mouse, function() {play(callback, -7.6)});
    });

    projectileDemo.addMessageSlides(
	"What we learn from this argument is that <strong>from any starting point</strong> "+
	    "we can hit our target, <strong>at any point along its trajectory</strong>",
	"This is an extremely useful operation &ndash; enough so that I will build it "+
	    "(implicitly) into other parts of the interface");

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "Let's return to our original problem: casting our stone to hit two target objects");
	projectileDemo.removeObject(traj);
	projectileDemo.removeObject(traj1);
	projectileDemo.removeObject(stone);
	projectileDemo.removeObject(object1);
	var t0=0, t=t0, t1 = 20, delta = 0.2, j=0;
	traj = new Trajectory(projectileDemo, t0, t1, delta,
			      function(t) {return {x: 0, y: 80, t: t}}, xScale, yScale);
	stone.trajectory = traj;
	traj1 = new Trajectory(projectileDemo, t0, t1, delta, positionObject1, xScale, yScale);
	traj2 = new Trajectory(projectileDemo, t0, t1, delta, positionObject2, xScale, yScale);
	object1 = new Ball(projectileDemo, ObjectRadius, Obj1Color, traj1, xScale, yScale);
	object1.trajectory = traj1;
	object2 = new Ball(projectileDemo, ObjectRadius, Obj2Color, traj2, xScale, yScale);
	object2.trajectory = traj2;
	projectileDemo.scene.push(traj, traj1, traj2, object1, object2, stone);
	projectileDemo.k = 0;
	projectileDemo.display();
	callback();
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("Let's watch our target objects move");
	playIcon.clickBy(mouse, secondSetup);
	function secondSetup() {
	    play(callback);
	}
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "To attack the problem, let's pick out one point on the trajectory of one target object");
	resetTimeIcon.clickBy(mouse, resetTime);
	function resetTime() {
	    projectileDemo.k = 0;
	    projectileDemo.display();
	    mySetTimeout(hitPlay, 300);
	}
	function hitPlay() {
	    mySetTimeout(
		function() {playForwardIcon.clickBy(mouse, playForward)}, 300);
	}
	function playForward() {
	    var j = 0;
	    interp();
	    function interp() {
		j++;
		projectileDemo.k = j;
		projectileDemo.display();
		if (j < 50) {mySetTimeout(interp, 35)} else {callback();}
	    }
	}
    })

    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage(
	    "And let's consider all trajectories for our stone that collide with "+
		"the target, <em>at that point in time</em>");
	var ghosts;
	mySetTimeout(mouseToOrigin, 300);
	function mouseToOrigin() {
	    mouse.move(xScale(0), yScale(80), function() {mySetTimeout(moveToOther, 300)});
	}
	function moveToOther() {
	    var j=0;
	    var x0 = xScale(0), y0 = yScale(80);
	    var x1 = xScale(100)-5, y1 = yScale(43.74)-5;
	    var steps=100;
	    interp();
	    function interp() {
		j++;
		var x = x0+(j/steps)*(x1-x0);
		var y = y0+(j/steps)*(y1-y0);
		if (j > 8) {
		    ghosts = new Ghosts(10, 0, 80, (j/steps)*100, 80+(j/steps)*(43.74-80));
		    projectileDemo.scene.push(ghosts);
		}
		mouse.x = x;
		mouse.y = y;
		mouse.display();
		projectileDemo.display();
		if ((j > 8) && (j < steps)) {
		    projectileDemo.removeObject(ghosts);
		}
		if (j > steps-8) {
		    projectileDemo.ctx.ball(xScale(100), yScale(43.74), 5, GOLD);
		}
		if (j < steps) {myRequestAnimationFrame(interp)} else {callback()};
	    }
	}
    })

    function Wave(x0, y0, x1, y1, T) {
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1;
	this.T = T;
	this.deltax = this.x1-this.x0;
	this.deltay = this.y1-this.y0;
    }

    Wave.prototype.v = function(phi) {
	return Math.sqrt(g/2) * Math.abs(this.deltax/Math.sin(phi)) *
	    1/Math.sqrt(this.deltax/Math.tan(phi)-this.deltay);
    }

    Wave.prototype.x = function(phi, t) {
	return this.x1 +this.v(phi)*Math.sin(phi)*(t-this.T);
    }

    Wave.prototype.y = function(phi, t) {
	return this.y1 +
	    (this.v(phi)*Math.cos(phi)-g*this.deltax/(this.v(phi)*Math.sin(phi)))*(t-this.T) -
	    0.5*g*Math.pow((t-this.T), 2);
    }

    Wave.prototype.display = function(j) {
	var t = j*0.2;
	var phi;
	var steps = 200;
	var angle = Math.acos(this.deltay/Math.sqrt(this.deltax*this.deltax+this.deltay*this.deltay));
	var x0, y0, x1, y1;
	for (var k=1; k < steps-1; k++) {
	    phi = (k/steps)*angle;
	    x0 = this.x(phi, t);
	    y0 = this.y(phi, t);
	    x1 = this.x(phi+angle/steps, t);
	    y1 = this.y(phi+angle/steps, t);
	    projectileDemo.ctx.line(xScale(x0), yScale(y0), xScale(x1), yScale(y1), "#555555");
	}
    }
    
    projectileDemo.addSlide(function(callback) {
	projectileDemo.addMessage("We can play all the trajectories forward from the collision");
	playIcon.clickBy(mouse, launchWave);
	function launchWave() {
	    var wave = new Wave(0, 80, 100, 43.74, 10);
	    projectileDemo.scene.push(wave);
	    var j=50;
	    interp();
	    function interp() {
		j++;
		projectileDemo.display(j);
		if (j === 65) {
		    projectileDemo.addMessage(
			"The interface shows the wavefront of all possible trajectories "+
			    "going through the first target");
		}
		if (j < 100) {mySetTimeout(interp, 200)} else {callback();}
	    }
	}
    })

    projectileDemo.addMessageSlides(
	"If we watch closely we see that the wavefront crosses the other target object, "+
	    "and so there must be a trajectory intersecting both objects",
	"Let's watch again");

    projectileDemo.addSlide(function(callback) {
	// same code as before
	playIcon.clickBy(mouse, launchWave);
	function launchWave() {
	    var wave = new Wave(0, 80, 100, 43.74, 10);
	    projectileDemo.scene.push(wave);
	    var j=50;
	    interp();
	    function interp() {
		j++;
		projectileDemo.display(j);
		if (j === 58) {
		    projectileDemo.addMessage("Boom!");
		}
		if (j < 100) {mySetTimeout(interp, 200)} else {callback();}
	    }
	}
    });

    projectileDemo.addMessageSlides(
	"The nice thing is that most of the details of the trajectory of the other target "+
	    "<em>don't matter</em>",
	"Provided the target started to the 'southeast' of the first target, and its velocity is bounded, "+
	    "it must eventually cross the wavefront",
	"The essential reason is that the boundaries of the region are asymptotes of the wavefront "+
	    "for small times",
	"(You can give a rigorous proof using the intermediate value theorem)",
	"(The target's bounded velocity ensures it can't 'run away' too fast)",
	"And so we've discovered something very interesting:",
	"Provided the targets have bounded velocity, and at some time one is to the "+
	    "'southeast' of the other, we can throw a stone so as to pass through both trajectories",
	"This isn't a complete answer to the question 'When can we ensure a projectile passes through "+
	    "two targets?'",
	"But it's a good start, a non-trivial insight, a discovery"
    );

    
    // Main animation loop
    projectileDemo.rerun(projectileDemo.STARTSLIDE);
    projectileDemo.anim();

}());

function positionUnderGravity(x0, y0, vx0, vy0, t0, t) {
    // returns the position of an object falling freely under the
    // influence of gravity at time t, with given initial
    // conditions
    return {x: x0+vx0*(t-t0), y: y0+vy0*(t-t0)-0.5*g*(t-t0)*(t-t0), t: t};
}

//
// GENERAL HELPER FUNCTIONS
//
function sawtooth(x) {
    return 2*(x-Math.floor(x))-1;
}

function removeElement(elt) {
    elt.parentElement.removeChild(elt);
}


		 
