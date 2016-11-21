// energy.js: Various demonstrations of the principle of conservation
// of energy for a particle moving in one dimension.  Done using
// version 76 of the three.js library.
//
// By Michael Nielsen, November 2016
//
// MIT License
//
// Written to target Chrome (~53) on OS X.

//
// Equation of motion: Our base particle has mass m = 1 and potential
// U(x) = x^2/2, both in arbitrary units.  It follows the equation of
// motion x = A sin(t) + B cos(t).
//

(function() {
    "use strict";
    // Set up the basic demo obect
    var energyDemo = new Demo("energy", "threejs", 0, false);

    // Configuration
    //
    // Colors based on "Keep the Change": https://color.adobe.com/Keep-the-Change-color-theme-1185348/edit/?copy=true
    var AXIS_COLOR = 0x7F7F7F;
    var BALL_COLOR = 0x0420F4;
    var TRAJECTORY_COLOR = 0x707FF3;
    var POTENTIAL_COLOR = 0x74AF6E;
    var PROJECTED_BALL_COLOR = 0xDDDDDD;
    var KEGraphColor = 0xAF5559;
    var energySurfaceMaterials = [
	new THREE.MeshLambertMaterial(
	    {color: 0x4e9246, side: THREE.DoubleSide, transparent: true, opacity: 0.8}),
	new THREE.MeshBasicMaterial(
	    {color: 0xCCEEEE, wireframe: true, transparent: true, opacity: 0.3,
	     side: THREE.DoubleSide})
    ]; // 0xBB3333
    var CONTROL_COLOR = GOLD;
    var GHOST_COLOR = GOLD;
    var TRAJECTORY_MATERIAL = new THREE.LineBasicMaterial({color: TRAJECTORY_COLOR, linewidth: 3});

    // We displace the trajectories a little, so they're above the energy surface.  This is the
    // y displacement or "bump" that we use
    var BUMP = 2;
    // The points used for the sketched potential
    var controlPoints = [[-0.9, 0.3], [-0.3, -0.1], [0.1, 0.1], [0.4, -0.05], [0.95, 0.3]];
    // The oblique camera position used as the default way to view all
    // three axes simultaneously
    var obliqueCameraPosition = new THREE.Vector3(80, 110, 250);
    // The position above 
    var aboveCameraPosition = new THREE.Vector3(0, 300, 0);
    
    //
    // Cast: The global objects appearing throughout the Demo.
    //
    var xLabel, yLabel, zLabel, ball, projectedBall, projectedLine, ball2, potential, xAxis, yAxis, zAxis, geometry, trajectory;
    var geometries, trajectories, KE, KEgeometry, slider, plane, highlightGeometry, highlightTrajectory;
    var shadowTrajectory, highlightG = [], highlightT = [], ESmesh, ES;
    var T, T2, mouse, drawPotentialIcon, energySurfaceIcon, massSlider, cutSurfaceIcon, energySlider, controlPoint1, controlBalls = [],
	interfacePotential, mirrorImg;
    
    //
    // Set up labels for the axes.  These are divs which aren't
    // displayed initially, and will be moved and displayed as
    // needed
    //
    xLabel = energyDemo.placeHTML("<em>x</em>", 0, 0, "xLabel");
    xLabel.style.display = "none";
    yLabel = energyDemo.placeHTML("", 0, 0, "yLabel");
    yLabel.style.display = "none";
    zLabel = energyDemo.placeHTML("<em>v</em>", 0, 0, "zLabel");
    zLabel.style.display = "none";


    function vanishAxisLabels() {
	// Make it so all the axis labels disappear
	xLabel.style.display = yLabel.style.display = zLabel.style.display = "none";
    }

    function cameraXLabel() {
	// set the labels in the view where we can see the x axis, and
	// the energy axis
	xLabel.style.left = "535px";
	xLabel.style.top = "255px";
	xLabel.style.display = "inline";
	yLabel.style.display = "none";
	zLabel.style.display = "none";
    }

    function cameraXYLabel(yHTML) {
	xLabel.style.left = "535px";
	xLabel.style.top = "255px";
	xLabel.style.display = "inline";
	yLabel.style.left = "318px";
	yLabel.style.top = "40px";
	yLabel.innerHTML = yHTML;
	yLabel.style.display = "inline";
	zLabel.style.display = "none";
    }

    function cameraXZLabel() {
	xLabel.style.left = "535px";
	xLabel.style.top = "255px";
	xLabel.style.display = "inline";
	yLabel.style.display = "none";
	zLabel.style.left = "318px";
	zLabel.style.top = "10px";
	zLabel.style.display = "inline";
    }

    function cameraObliqueLabel(yHTML) {
	xLabel.style.left = "595px";
	xLabel.style.top = "275px";
	xLabel.style.display = "inline";
	yLabel.style.left = "318px";
	yLabel.style.top = "16px";
	yLabel.innerHTML = yHTML;
	yLabel.style.display = "inline";
	zLabel.style.left = "369px";
	zLabel.style.top = "159px";
	zLabel.style.display = "inline";
    }

    function cameraYZLabel(yHTML) {
	xLabel.style.display = "none";
	yLabel.style.left = "318px";
	yLabel.style.top = "40px";
	yLabel.innerHTML = yHTML;
	yLabel.style.display = "inline";
	zLabel.style.left = "65px";
	zLabel.style.top = "255px";
	zLabel.style.display = "inline";
    }

    function cameraAboveLabel() {
	xLabel.style.display = "inline";
	var xAxisCanvas = threeToCanvas(new THREE.Vector3(xScale(1.2), yScale(0), zScale(0)), energyDemo);
	xLabel.style.left = (xAxisCanvas[0]+55)+"px";
	xLabel.style.top = (xAxisCanvas[1]-8)+"px";
	yLabel.style.display = "none";
	zLabel.style.display = "none";
    }
    //
    // Set scales connecting logical ranges and three.js co-ordinates.
    // Note that most of the action should take place roughly within x, y,
    // z: [-1, 1].  The viewport is just a little larger.
    //
    function xScale(x) {return 100*x;}
    function yScale(y) {return 150*y;}
    function zScale(z) {return -100*z;} // Minus bc three.js convention is
    // the opposite of what I want

    function inverseXScale(x) {return 0.01*x;}
    
    //
    // Set up all the slides
    //
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "Suppose we have a particle moving backward and forward<br>in one dimension, on a line");
	T = Date.now();
	xAxis = new THREE.ArrowHelper(
	    new THREE.Vector3(1, 0, 0), new THREE.Vector3(xScale(-1.2), yScale(0), zScale(0)),
	    xScale(1.2)-xScale(-1.2), AXIS_COLOR, 8, 4);
	energyDemo.scene.add(xAxis);
	ball = point(xScale(0), yScale(0), zScale(0), 4, BALL_COLOR);
	energyDemo.scene.add(ball);
	cameraXLabel();
	energyDemo.div.appendChild(xLabel);
	energyDemo.div.appendChild(yLabel);
	energyDemo.div.appendChild(zLabel);
	callback();
    }, updateBallPosition);

    energyDemo.addMessageSlides("The particle might, for example, be at the end of a spring",
			      "It doesn't much matter");
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("The particle is moving in a potential, which we'll call <em>U(x)</em>, shown here as the green curve");
	cameraXYLabel("<em>U(x)</em>");
	yAxis = new THREE.ArrowHelper(
	    new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, yScale(-0.7), 0),
	    yScale(0.7)-yScale(-0.7), AXIS_COLOR, 8, 4);
	energyDemo.scene.add(yAxis);
	potential = plotGraph(function(x) {return 0.5*x*x;});
	energyDemo.scene.add(potential);
	callback();
    });

    energyDemo.addSlide(function(callback) { // change potential up to U(x) = 2x^2, set ball again in motion
	energyDemo.addMessage("The shape of the potential determines how the particle moves");
	ball.visible = false;
	interpolate(
	    potential,
	    function(x) {return 0.5*x*x;},
	    function(x) {return 2.0*x*x;},
	    function() {
		ball.position.x = 0;
		ball.visible = true;
		T = Date.now(); // reset the starting time
		callback();
	    });
    }, updateModifiedBallPosition);

    energyDemo.addMessageSlides(
	"For instance, a deeper potential like this one causes the particle to oscillate more tightly",
	"If you're not used to thinking about potentials, you may be wondering &ldquo;where does this green curve "+
	    "come from, and what does it mean?&rdquo;",
	"These are good questions, but they're beyond the scope of this prototype",
	"We're going to assume the green potential curve is known",
	"Our focus is going to be on using the shape of the potential to help us understand the motion of the particle");

    energyDemo.addSlide(function(callback) { // return the potential to its original value
	energyDemo.addMessage("To see how that works, let's go back to our original potential");
	ball.visible = false;
	interpolate(
	    potential,
	    function(x) {return 2.0*x*x;},
	    function(x) {return 0.5*x*x;},
	    function() {
		ball.position.x = 0;
		ball.visible = true;
		T = Date.now(); // reset the starting time
		callback();
	    });
    }, updateBallPosition);

    energyDemo.addMessageSlides(
	"A drawback of this animation is that it provides a "+
	    "very limited understanding of how the system behaves",
	"Any frame in the animation shows a single particle at a single point in time",
	"We can get a more global understanding by explicitly "+
	    "showing the particle's velocity, in addition to its position");

    energyDemo.addSlide(function(callback) {
	// add zAxis, hide yAxis, swing around so we can see the x-v plane and the ball's trajectory
	energyDemo.addMessage("So here's a view showing both the position, <em>x</em>, and velocity, "+
			      "<em>v</em>, at all points along the particle's trajectory");
	yLabel.style.display  = "none";
	zAxis = new THREE.ArrowHelper(
	    new THREE.Vector3(0, 0, -1), new THREE.Vector3(xScale(0), yScale(0), zScale(-1.2)),
	    zScale(-1.2)-zScale(1.2), AXIS_COLOR, 8, 4);
	energyDemo.scene.add(zAxis);
	yAxis.visible = false;
	// add the trajectory
	geometry = new THREE.Geometry();
	var theta;
	for (var j=0; j <= 32; j++) {
	    theta = j*2*Math.PI/32;
	    geometry.vertices.push(
		new THREE.Vector3(0.8*xScale(Math.sin(theta)), 0, 0.8*zScale(Math.cos(theta))));
	}
	geometry.dynamic = true;
	trajectory = new THREE.Line(geometry, TRAJECTORY_MATERIAL);
	energyDemo.scene.add(trajectory);
	// swing the camera around
	var step = 0;
	swing();
	function swing() {
	    step += 1;
	    updateBall3D();
	    energyDemo.camera.position.set(
		0, energyDemo.DISTANCE*Math.sin((step/100)*Math.PI/2),
		energyDemo.DISTANCE*Math.cos((step/100)*Math.PI/2));
	    energyDemo.camera.lookAt(new THREE.Vector3(0, 0, 0));
	    energyDemo.render();
	    if (step < 100) {myRequestAnimationFrame(swing);}
	    else {
		potential.visible = false;
		cameraXZLabel();
		callback();
	    };
	}
    }, updateBall3D);

    energyDemo.addMessageSlides(
	"In this view, we explicitly <em>show</em> the value for the velocity on the vertical axis");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "If we focus on just the ball's position, shown here in grey and projected onto the "+
		"<em>x</em> axis, we see that it oscillates back and forth. "+
		"That's exactly as in the opening animation, just as we should expect");
	projectedBall = point(ball.position.x, yScale(0), zScale(0), 4, PROJECTED_BALL_COLOR);
	energyDemo.scene.add(projectedBall);
	// set up the projected line
	var pLmaterial = new THREE.LineBasicMaterial({color: PROJECTED_BALL_COLOR, linewidth: 1});
	var pLgeometry = new THREE.Geometry();
	pLgeometry.dynamic = true;
	pLgeometry.vertices.push(new THREE.Vector3(ball.position.x, ball.position.y, ball.position.z));
	pLgeometry.vertices.push(new THREE.Vector3(
	    projectedBall.position.x, projectedBall.position.y, projectedBall.position.z));
	projectedLine = new THREE.Line(pLgeometry, pLmaterial);
	energyDemo.scene.add(projectedLine);
	callback();
    }, updateBallAndProjection);

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("A nice thing about this picture is that it shows the particle's "+
			       "entire trajectory, for all times");
	energyDemo.scene.remove(projectedBall);
	energyDemo.scene.remove(projectedLine);
	callback();
    }, updateBall3D);

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("In fact, we can see all possible trajectories of the system at once");
	var radii = [0.4, 0.6, 1.0, 1.2];
	geometries = [];
	trajectories = [];
	var theta;
	for (var j=0; j < 5; j++) {
	    geometries[j] = new THREE.Geometry();
	    var r = radii[j];
	    for (var k=0; k <=32; k++) {
		theta = 2*k*Math.PI/32;
		geometries[j].vertices.push(
		    new THREE.Vector3(xScale(r*Math.sin(theta)), yScale(r*0),
				      zScale(r*Math.cos(theta))));
	    }
	    geometries[j].dynamic = true;
	    trajectories[j] = new THREE.Line(geometries[j], TRAJECTORY_MATERIAL);
	    energyDemo.scene.add(trajectories[j]);
	}
	callback();
    });

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("We can see, for example, a trajectory where the particle "+
			      "starts out moving slower, and nearer the origin");
	T2 = Date.now();
	ball2 = point(xScale(0), yScale(0), zScale(0.4), 4, BALL_COLOR);
	energyDemo.scene.add(ball2);
	callback();
    }, function() {
	updateBall3D();
	updateSecondBall3D();
    });

    energyDemo.addMessageSlide("So this is a global view, showing the system's entire dynamics");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("Let's take a look at position, velocity, and potential energy "+
			      "all at once");
	vanishAxisLabels();
	energyDemo.scene.remove(ball2);
	yAxis.visible = true;
	potential.visible = true;
	linearCameraMove(obliqueCameraPosition, 100, updateBall3D, function() {
	    cameraObliqueLabel("Energy");
	    callback();
	});
    }, updateBall3D);

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "When we change the potential the trajectories in the system also change");
	ball.visible = false;
	interpolate(potential, function(x) {return 0.5*x*x;}, function(x) {return 2*x*x;}, callback,
		    function(lambda) {
		     	var radii = [0.4, 0.6, 1.0, 1.2];
			var theta;
			for (var j=0; j < 5; j++) {
			    var r = radii[j];
			    for (var k=0; k <=32; k++) {
				theta = 2*k*Math.PI/32;
				geometries[j].vertices[k] = new THREE.Vector3(
				    xScale(r*Math.sin(theta)/Math.sqrt(1+3*lambda)), yScale(0), zScale(r*Math.cos(theta)));
			    }
			    geometries[j].verticesNeedUpdate = true;
			    for (var k=0; k <=32; k++) {
				theta = 2*k*Math.PI/32;
				geometry.vertices[k] = new THREE.Vector3(
				    xScale(0.8*Math.sin(theta)/Math.sqrt(1+3*lambda)),
				    yScale(0.8*0),
				    zScale(0.8*Math.cos(theta)));
			    }
			    geometry.verticesNeedUpdate = true;
			}
		    }
		   );
    }, energyDemo.pass);
    
    energyDemo.addMessageSlide(
	"In this case, as the potential gets deeper (that is, the &ldquo;spring tightens&rdquo;), "+
	    "the trajectories also get tighter");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("And when we make the potential shallower, they change back");
	interpolate(potential, function(x) {return 2*x*x;}, function(x) {return 0.5*x*x;},
		    function() {ball.visible = true; callback();},
		    function(lambda) {
		     	var radii = [0.4, 0.6, 1.0, 1.2];
			var theta;
			for (var j=0; j < 5; j++) {
			    var r = radii[j];
			    for (var k=0; k <=32; k++) {
				theta = 2*k*Math.PI/32;
				geometries[j].vertices[k] = new THREE.Vector3(
				    xScale(
					r*Math.sin(theta)/Math.sqrt(4-3*lambda)),
				    yScale(0),
				    zScale(r*Math.cos(theta)));
			    }
			    geometries[j].verticesNeedUpdate = true;
			    for (var k=0; k <=32; k++) {
				theta = 2*k*Math.PI/32;
				geometry.vertices[k] = new THREE.Vector3(
				    xScale(0.8*Math.sin(theta)/Math.sqrt(4-3*lambda)),
				    yScale(0.8*0), zScale(0.8*Math.cos(theta)));
			    }
			    geometry.verticesNeedUpdate = true;
			}
		    }
		   );
    }, updateBall3D);

    energyDemo.addMessageSlides(
	"So the question we want to answer in general is: what's the relationship between the "+
	    "shape of the potential, this green curve, and the shape of the trajectories, "+
	    "all the blue curves?",
	"The more deeply we can answer this question, the more deeply we'll "+
	    "understand the physics of one-dimensional motion");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "To help answer the question, let me remind you of the relationship betweeen the "+
		"particle's velocity and its kinetic energy");
	vanishAxisLabels();
	ball.visible = false;
	// plot the kinetic energy
	var KEmaterial = new THREE.LineBasicMaterial({color: KEGraphColor, linewidth: 5});
	KEgeometry = new THREE.Geometry();
	for (var j=0; j <= 20; j++) {
	    var v = -1+j*0.1; // to be plotted on the z axis
	    var y = 0.5*v*v;
	    KEgeometry.vertices.push(new THREE.Vector3(xScale(0), yScale(y), zScale(v)));
	}
	KEgeometry.dynamic = true;
	KE = new THREE.Line(KEgeometry, KEmaterial);
	energyDemo.scene.add(KE);
	linearCameraMove(new THREE.Vector3(-energyDemo.DISTANCE, 0, 0), 100, function() {},
			 function() {
			     cameraYZLabel("KE");
			     potential.visible = false;
			     callback();
			 });
    }, energyDemo.pass);

    energyDemo.addMessageSlides(
	"The kinetic energy, shown by the dark red curve, is proportional to the "+
	    "square of the particle's velocity, which is the horizontal axis",
	"More precisely, the kinetic energy is equal to <em>&frac12;mv<sup>2</sup></em>",
	"By the way, it'll help later on to note that the kinetic energy is symmetric",
	"That is, we can change the sign of the velocity <em>v</em>, and the kinetic energy "+
	    "doesn't change");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "Having reminded ourselves about the way kinetic energy works, let's go back to the "+
		"global view, showing position, velocity, and now both potential and kinetic energy");
	deleteElt(slider);
	deleteEltById("energy_mass");
	potential.visible = true;
	vanishAxisLabels();
	ball.visible = true;
	linearCameraMove(obliqueCameraPosition, 100, updateBall3D, function() {
	    cameraObliqueLabel("E");
	    callback();
	});
    }, updateBall3D);

    energyDemo.addMessageSlide("The total energy of the particle is just the sum of the potential "+
			       "and the kinetic energies");
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "So we can plot the total energy by sweeping the dark red kinetic energy curve over the green potential energy curve");
	sweepGeometry(function(x, z) {return 0.5*x*x+0.5*z*z;}, callback);
    });

    energyDemo.addMessageSlides(
	"The resulting <em>energy surface</em> shows us the energy for any given position and velocity of the particle",
	"What have we gained by doing this?",
	"Well, the principle of conservation of energy tells us a particle's energy is constant along its trajectory",
	"What this means is that we can find the trajectory by simply cutting the energy surface with a plane",
	"Let's do that");

    energyDemo.addSlide(function(callback) {
	delayedAction();
	function delayedAction() {
     	    var planeGeometry = new THREE.ParametricGeometry(
     		function(u, v) {
     		    return new THREE.Vector3(xScale(4*u), 0, zScale(4*v));
     		}, 1, 1);
     	    var materials = [
     		new THREE.MeshLambertMaterial(
     		    {color: 0xAAAAAA, side: THREE.DoubleSide, transparent: true, opacity: 0.3} ),
     		new THREE.MeshBasicMaterial(
     		    {color: 0xFFFFFF, wireframe: true, transparent: true, opacity: 0.4,
     		     side: THREE.DoubleSide})
     	    ];
     	    plane = THREE.SceneUtils.createMultiMaterialObject(planeGeometry, materials);
     	    energyDemo.scene.add(plane);
     	    var step=0;
	    highlightTrajectory = undefined;
	    var thetaRange;
	    moveIn();     
     	    function moveIn() {
		step++;
		plane.position.set(100-2*step, yScale(0.5*0.8*0.8), zScale(-1.5));
		if (100-2*step < xScale(0.8)) {// we need to start displaying trajectory
		    if (highlightTrajectory) {energyDemo.scene.remove(highlightTrajectory);}
		    highlightGeometry = new THREE.Geometry();
		    var x = inverseXScale(100-2*step);
		    if (xScale(-0.8) < 100-2*step) {
			thetaRange = Math.acos(x/0.8); // we go from -thetaRange to thetaRange
		    } else {
			thetaRange = Math.PI;
		    }
		    for (var j=0; j <= 32; j++) {
			var theta = -thetaRange+2*j*thetaRange/32;
			highlightGeometry.vertices.push(new THREE.Vector3(
			    xScale(0.8*Math.cos(theta)), yScale(0.5*0.8*0.8), zScale(0.8*Math.sin(theta))));
		    }
		    highlightTrajectory = new THREE.Line(highlightGeometry, TRAJECTORY_MATERIAL);
		    energyDemo.scene.add(highlightTrajectory);
		}
     		updateBall3D();
     		energyDemo.render();
     		if (step < 100) {
		    myRequestAnimationFrame(moveIn);
		} else {
		    callback();
		}
     	    }
	}
    });

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "We can see that the trajectory is just the intersection of the "
		+ "energy surface with the plane!");
	var shadowGeometry = new THREE.Geometry();
	var theta;
	for (var j=0; j <= 32; j++) {
	    theta = j*2*Math.PI/32;
	    shadowGeometry.vertices.push(
		new THREE.Vector3(
		    xScale(0.8*Math.sin(theta)), 0, zScale(0.8*Math.cos(theta))));
	}
	shadowTrajectory = new THREE.Line(shadowGeometry, TRAJECTORY_MATERIAL);
	energyDemo.scene.add(shadowTrajectory);
	var step = 0;
	moveShadow();
	function moveShadow() {
	    step++;
	    shadowTrajectory.position.set(0, yScale(0.5*0.8*0.8*(100-step)/100), 0);
	    updateBall3D();
	    energyDemo.render();
	    if (step < 100) {
		myRequestAnimationFrame(moveShadow)
	    } else {
		callback();
	    }
	}
    });

    energyDemo.addMessageSlide("In fact, all the trajectories in the system can be understood in this way");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("If we take a whole lot of cuts through the energy surface, each cut "+
			     "corresponds to a trajectory of the system");
	energyDemo.scene.remove(highlightTrajectory);
	energyDemo.scene.remove(shadowTrajectory);
	energyDemo.render();
	var shadowG, shadowT;
	var radii = [0.4, 0.6, 0.8, 1.0];
	var step = 0;
	var j = 0;
	var y;
	var energies = radii.map(function(r) {return 0.5*r*r}); // the energy values
	play();
	function play() {
	    var theta, thetaRange;
	    y = yScale(energies[j]);
	    if (step === 0) {// generate the shadow trajectory, for later use
		shadowG = new THREE.Geometry();
		for (var k=0; k <= 32; k++) {
		    theta = -Math.PI+2*k*Math.PI/32;
		    shadowG.vertices.push(
	      		new THREE.Vector3(
	      		    xScale(radii[j]*Math.cos(theta)), 0, zScale(radii[j]*Math.sin(theta))));
	 	}
		shadowT = new THREE.Line(shadowG, TRAJECTORY_MATERIAL);
	    }
	    if (step < 50) {
		plane.position.set(100-4*step, y+BUMP, zScale(-1.5));
		if (100-4*step < xScale(radii[j])) {// we need to start displaying trajectory
		    if (highlightT[j]) {energyDemo.scene.remove(highlightT[j]);}
		    highlightG[j] = new THREE.Geometry();
		    var x = inverseXScale(100-4*step);
		    if ((step === 49) || (xScale(-radii[j]) >= 100-4*step)) {
			thetaRange = Math.PI;
		    } else {
			thetaRange = Math.acos(x/radii[j]); // we go from -thetaRange to thetaRange
		    }
		    for (var k=0; k <= 32; k++) {
			theta = -thetaRange+2*k*thetaRange/32;
			highlightG[j].vertices.push(new THREE.Vector3(
			    xScale(radii[j]*Math.cos(theta)), y+BUMP, zScale(radii[j]*Math.sin(theta))));
		    }
		    highlightT[j] = new THREE.Line(highlightG[j], TRAJECTORY_MATERIAL);
		    energyDemo.scene.add(highlightT[j]);
		}
	    } else if (step === 50) { // we pause 30 frames before moving on
		shadowT.position.set(0, y+BUMP, 0);
		energyDemo.scene.add(shadowT);
	    } else if (80 < step && step < 150) {
		shadowT.position.set(0, (150-step)*(y+BUMP)/70, 0);
	    }
	    updateBall3D();
	    energyDemo.render();
	    if (step < 150) {
		step++;
		myRequestAnimationFrame(play);
	    } else if (j < 3 && step === 150) { // time to increment j
		energyDemo.scene.remove(shadowT);
		step = 0;
		j++;
		myRequestAnimationFrame(play);
	    } else {// we're at the end, j = 3 and step = 150
		energyDemo.scene.remove(plane);
		energyDemo.scene.remove(shadowT);
		callback();
	    }
	}
    });

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "This means we can entirely understand the system's dynamics, just by working with "+
		"cuts through the energy surface");
	for (var j=0; j < trajectories.length; j++) {
	    energyDemo.scene.remove(trajectories[j]);
	}
	energyDemo.scene.remove(trajectory);
	ball.position.y = yScale(0.5*0.8*0.8)+BUMP;
	energyDemo.render();
	callback();
    });

    energyDemo.addMessageSlide("Suppose, for example, that we tighten the potential");
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("We see straight away that the trajectories tighten, so "+
	    "it takes a larger velocity to get the same magnitude of oscillation");
	ball.visible = false;
	energyDemo.scene.remove(ES);
	var step=0;
	narrowing();
	function narrowing() {
	    step++;
	    var p = step/50;
	    ESmesh = parameterizedEnergy(1+2*p, 1);
	    ES = THREE.SceneUtils.createMultiMaterialObject(ESmesh, energySurfaceMaterials);
	    ES.position.set(0, 0, 0);
	    energyDemo.scene.add(ES);
	    for (var j=0; j < 4; j++) {
		highlightG[j] = updateTrajVertices(highlightG[j], 1+2*p, 1, 0.5*Math.pow(0.4+j*0.2,2));
		highlightG[j].vertices.verticesNeedUpdate = true;
	    }
	    // update the potential
	    for (var k=0; k < potential.geometry.vertices.length; k++) {
		potential.geometry.vertices[k].y = yScale(0.5*(1+2*p)*Math.pow(-1+k*0.1, 2));
	    }
	    potential.geometry.verticesNeedUpdate = true;
	    energyDemo.render();
	    if (step < 50) {
		myRequestAnimationFrame(function() {energyDemo.scene.remove(ES); narrowing();});
	    } else {
		callback();
	    }
	}
    }, energyDemo.pass);

    energyDemo.addMessageSlides(
	"Of course, I showed this tightening earlier.  But at that point I was just stating a fact, without any explanation or proof",
	"What I've just shown is an explanation of why this is true, using the energy surface",
	"So we've actually derived the tightening of the trajectories, from the laws of physics",
	"That's a much more powerful level of insight",
	"While I've shown some ways the energy surface leads to insight, "+
	    "it's not yet part of an interface that can be used to explore and generate understanding",
	"Let's take a look at a very rough prototype interface which lets us manipulate the energy surface");
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("Here it is");
	// do the resest
	energyDemo.camera.position.set(0, 0, energyDemo.DISTANCE);
	energyDemo.camera.lookAt(0, 0, 0);
	cameraXYLabel("E");
	energyDemo.scene.remove(potential);
	energyDemo.scene.remove(KE);
	energyDemo.scene.remove(ES);
	for (var j=0; j < highlightT.length; j++) {
	    energyDemo.scene.remove(highlightT[j]);
	}
	// add the new material to the interface
	mouse = new Mouse(energyDemo, 450, 150);
	drawPotentialIcon = new Icon(energyDemo, "draw potential", 600, 0, 120);	
	energySurfaceIcon = new Icon(energyDemo, "energy surface", 600, 32, 120);
	massSlider = new Slider(energyDemo, "&nbsp;&nbsp;mass:", 600, 64, 120, 55, 5, 0, 1, 0.5);
	cutSurfaceIcon = new Icon(energyDemo, "cut surface", 600, 96, 120);
	callback();
    });

    function xScaleThree(x) {
	// Scale up the logical three.js x co-ordinate I'm using to be
	// an enclosing div x co-ordinate.  Assumes 0 maps to 210 and
	// 1.2 maps to 550.
	return 310+x*200;
    }

    function yScaleThree(y) {
	// Scall up the logical three.js y co-ordinate I'm using to be
	// an enclosing div y co-ordinate.  Assumes 0 maps to 252 and
	// 0.7 maps to 42.
	return 252-y*300;
    }

    energyDemo.addSlide(function(callback) {
    	energyDemo.addMessage(
	    "We can sketch out a potential by setting control points");
	var counter = 0;
	mySetTimeout(function() {
	    drawPotentialIcon.clickBy(mouse, firstControlPoint);
	}, 200);
	function firstControlPoint() {
	    var x0 = controlPoints[0][0], y0 = controlPoints[0][1]; // in three.js co-ordinates
	    mouse.move(
		xScaleThree(x0), yScaleThree(y0), function() {
		    controlBalls.push(point(xScale(x0), yScale(y0), zScale(0), 4, CONTROL_COLOR));
		    energyDemo.scene.add(controlBalls[0]);
		    energyDemo.render();
		    addControlPoint(addControlPoint(addControlPoint(addControlPoint(finish))))();
		});
	}
	function addControlPoint(callback) {
	    return function() {
		var x0 = controlPoints[counter][0];
		var y0 = controlPoints[counter][1];
		counter++;
		var x1 = controlPoints[counter][0];
		var y1 = controlPoints[counter][1];
		var k = 0;
		var length = Math.ceil(100*Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0)));
		controlBalls.push(point(xScale(x0), yScale(y0), zScale(0), 4, CONTROL_COLOR));
		energyDemo.scene.add(controlBalls[counter]);
		energyDemo.render();
		interp();
		function interp() {
		    k++;
		    // move the mouse to the interpolated position
		    mouse.x = (1-k/length)*xScaleThree(x0)+(k/length)*xScaleThree(x1);
		    mouse.y = (1-k/length)*yScaleThree(y0)+(k/length)*yScaleThree(y1);
		    mouse.display();
		    controlBalls[counter].position.set(
			xScale((1-k/length)*x0+(k/length)*x1),
			yScale((1-k/length)*y0+(k/length)*y1),
			zScale(0)
		    );
		    if (k > 0) {
			var tempControlPoints = controlPoints.slice(0, counter).concat(
			    [[(1-k/length)*x0+(k/length)*x1, (1-k/length)*y0+(k/length)*y1]]);
			var tempGraph = plotGraph(function(x) {return fit(x, tempControlPoints);}, GHOST_COLOR);
			energyDemo.scene.add(tempGraph);
		    }
		    energyDemo.render();
		    if (k > 0) {
			energyDemo.scene.remove(tempGraph);
		    }
		    if (k < length) {
			myRequestAnimationFrame(interp);
		    } else {
			mySetTimeout(callback, 250);
		    }
		}
	    };
	};
	function finish() {
	    for (var j=0; j < controlBalls.length; j++) {
		energyDemo.scene.remove(controlBalls[j]);
	    }
	    interfacePotential = plotGraph(function(x) {return fit(x, controlPoints);});
	    energyDemo.scene.add(interfacePotential);
	    energyDemo.render();
	    callback();
	};
    });

    energyDemo.addMessageSlide("That's the potential, the green curve");
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("We can see the corresponding energy surface, sweeping out the kinetic energy");
	mySetTimeout(clickEnergySurfaceIcon, 250);
	function clickEnergySurfaceIcon() {
	    energySurfaceIcon.clickBy(mouse, delayedFn(moveToObliqueView));
	}
	function moveToObliqueView() {
	    linearCameraMove(obliqueCameraPosition, 100, energyDemo.pass, function() {
		cameraObliqueLabel("E");
		sweepGeometry(function(x, z) {return fit(x, controlPoints)+0.5*z*z;}, callback);
	    });
	};
    });

    energyDemo.addMessageSlides(
	"Notice that the interface doesn't show the dark red kinetic energy curve, unlike my earlier depiction",
	"That's because it'd always have the same parabolic shape, so it'd just clutter things up");
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "We can, however, adjust the viewing angle and scale, perhaps using keyboard commands, "+
		"to get a better (or worse) view of the energy surface");
	var upPosition = new THREE.Vector3(80, 140, 250);
	var downPosition = new THREE.Vector3(80, 80, 250);
	var inPosition = obliqueCameraPosition.clone().multiplyScalar(0.9);
	var outPosition = obliqueCameraPosition.clone().multiplyScalar(1.1);
	function move(vector, callback) {
	    return function() {
		linearCameraMove(vector, 50, energyDemo.pass, delayedFn(callback));
	    };
	}
	vanishAxisLabels();
	move(downPosition,
	     move(upPosition,
		  move(outPosition,
		       move(inPosition,
			    move(obliqueCameraPosition, reAddLabels)))))();
	function reAddLabels() {
	    cameraObliqueLabel("E");
	    callback();
	}
    });

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "The one way we can change the kinetic energy is by adjusting the mass. "+
		"That rescales the kinetic energy, and so changes the energy surface");
	mySetTimeout(delayedAction, 1500);
	function delayedAction() {
	    massSlider.slideTo(mouse, 0.2, modifyMass, delayedFn(
		function() {massSlider.slideTo(mouse, 0.5, modifyMass, callback);}, 300));
	    function modifyMass(m) {
		energyDemo.scene.remove(ES);
		plotGeometry(function(x, z) {return fit(x, controlPoints)+m*z*z;});
	    }
	}
    });

    energyDemo.addMessageSlide("We can, of course, cut through the energy surface to see a trajectory");
    
    var manyMeshes;
    energyDemo.addSlide(function(callback) {
	cutSurfaceIcon.clickBy(mouse, delayedFn(cutSurface, 800));
	function cutSurface() {
	    energyDemo.scene.add(plane);
	    var E = 0.25;
	    var step = 0;
	    var openTraj;
	    play();
	    function play() {
		plane.position.set(100-4*step, yScale(E)+BUMP, zScale(-1.5));
		if (manyMeshes) {
		    energyDemo.scene.remove(manyMeshes[0]);
		}
		openTraj = (step < 49) ? true : false;
		manyMeshes = energyMeshes(E, function(x) {return fit(x, controlPoints);}, 100-4*step, openTraj);
		energyDemo.scene.add(manyMeshes[0]);
		energyDemo.render();
		if (step < 50) {
		    step++;
		    myRequestAnimationFrame(play);
		} else {
		    energyDemo.scene.remove(plane);
		    cutSurfaceIcon.remove();
		    energySlider = new Slider(energyDemo, "&nbsp;energy:", 600, 96, 120, 68, 5, -0.2, 0.5, E);
		    callback();
		}
	    }
	}
    });

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "And we can change the energy up and down and see how the trajectory changes");
	energySlider.slideTo(mouse, -0.1, modifyEnergy, delayedFn(
	    function() {energySlider.slideTo(mouse, 0.04, modifyEnergy, callback);}, 300));

    });

    function modifyEnergy(E) {
	for (var j=0; j < manyMeshes.length; j++) {
	    energyDemo.scene.remove(manyMeshes[j]);
	}
	manyMeshes = energyMeshes(E, function(x) {return fit(x, controlPoints);});
	for (var j=0; j < manyMeshes.length; j++) {
	    energyDemo.scene.add(manyMeshes[j]);
	}
	energyDemo.render();
    }
    
    energyDemo.addMessageSlide(
	"Notice how, for low energies, there are two separate trajectories for any given energy");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("Here's one trajectory");
	mouseToFirstTrajectory();
	function mouseToFirstTrajectory() {
	    mouse.move(481, 210, delayedFn(highlightFirstTrajectory));
	}
	function highlightFirstTrajectory() {
	    manyMeshes[0].material.color.set(GOLD);
	    energyDemo.render();
	    delayedFn(unhighlightFirstTrajectory, 2000)();
	}
	function unhighlightFirstTrajectory() {
	    manyMeshes[0].material.color.set(TRAJECTORY_COLOR);
	    energyDemo.render();
	    callback();
	}
    });

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage("And here'a disconnected trajectory, over here, with the same energy");
	mouseToSecondTrajectory();
	function mouseToSecondTrajectory() {
	    mouse.move(141, 224, delayedFn(highlightSecondTrajectory));
	}
	function highlightSecondTrajectory() {
	    manyMeshes[1].material.color.set(GOLD);
	    energyDemo.render();
	    delayedFn(unhighlightSecondTrajectory, 2000)();
	}
	function unhighlightSecondTrajectory() {
	    manyMeshes[1].material.color.set(TRAJECTORY_COLOR);
	    energyDemo.render();
	    callback();
	}
    });

    energyDemo.addMessageSlide(
	"These just correspond to two valid but separate solutions for the system's dynamics");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "We can edit the potential, say by moving the second control point, and see how the energy surface and the trajectories change in response");
	mouse.move(142, 179, delayedFn(highlightPotential));
	function highlightPotential() {
	    var k=0, n=100;
	    for (var j=0; j < controlBalls.length; j++) {
		energyDemo.scene.add(controlBalls[j]);
	    }
	    interp();
	    function interp() {
		k++;
		interfacePotential.material.color.set(
		    interpColor("#"+POTENTIAL_COLOR.toString(16), GOLD, k/n));
		ES.children[0].material.opacity = 0.8-(k/n)*0.72;
		manyMeshes[0].material.opacity = 1.0-(k/n)*0.25;
		manyMeshes[1].material.opacity = 1.0-(k/n)*0.25;
		for (var j=0; j < controlBalls.length; j++) {
		    controlBalls[j].material.color = interfacePotential.material.color;
		}
		energyDemo.render();
		if (k < n) {myRequestAnimationFrame(interp);} else {moveToSecondControlPoint();}
	    }
	}
	function moveToSecondControlPoint() {
	    var position = threeToCanvas(controlBalls[1].position, energyDemo);
	    mouse.move(position[0], position[1], moveControlPoint);
	}
	function moveControlPoint() {
	    var k=0, n=60, frac, y0 = controlPoints[1][1], y1=y0-0.18, y;
	    interp();
	    function interp() {
		k++;
		frac = k/n;
		y = (1-frac)*y0+frac*y1;
		// update the position of the control ball
		controlPoints[1][1] = y;
		controlBalls[1].position.y = yScale(y);
		controlBalls[1].__dirtyPosition = true;
		// update the mouse position
		var position = threeToCanvas(controlBalls[1].position, energyDemo);
		mouse.x = position[0];
		mouse.y = position[1];
		mouse.display();
		// update the interface potential
		energyDemo.scene.remove(interfacePotential);
		interfacePotential = plotGraph(function(x) {return fit(x, controlPoints);});
		interfacePotential.material.color.set(GOLD);
		energyDemo.scene.add(interfacePotential);
		// update the trajectories
		var E = 0.04;
		for (var j=0; j < manyMeshes.length; j++) {
		    energyDemo.scene.remove(manyMeshes[j]);
		}
		manyMeshes = energyMeshes(E, function(x) {return fit(x, controlPoints);});
		for (var j=0; j < manyMeshes.length; j++) {
		    manyMeshes[j].material.opacity = 0.75;
		    energyDemo.scene.add(manyMeshes[j]);
		}
		// update the energy surface
		energyDemo.scene.remove(ES);
		plotGeometry(function(x, z) {return fit(x, controlPoints)+0.5*z*z;}, 0.08);
		// render
		//
		// Not necessary: it's done by plotGeometry
		// energyDemo.render();
		if (k < n) {myRequestAnimationFrame(interp);} else {delayedFn(fadeIn)();}
	    }
	}
	function fadeIn() {
	    var k=0, n=100;
	    for (var j=0; j < controlBalls.length; j++) {
		energyDemo.scene.remove(controlBalls[j]);
	    }
	    interp();
	    function interp() {
		k++;
		interfacePotential.material.color.set(
		    interpColor(GOLD, "#"+POTENTIAL_COLOR.toString(16), k/n));
		ES.children[0].material.opacity = 0.08+(k/n)*0.72;
		manyMeshes[0].material.opacity = 0.75+(k/n)*0.25;
		manyMeshes[1].material.opacity = 0.75+(k/n)*0.25;
		energyDemo.render();
		if (k < n) {myRequestAnimationFrame(interp);} else {callback();}
	    }
	}
    });

    energyDemo.addMessageSlides(
	"As we get used to manipulating the energy surface, we start to internalize the way it behaves",
	"It starts to become a new element of cognition",
	"In fact, not just the energy surface, but also the potential, the trajectories, "
	    + "and the associated operations",
	"All become new elements of cognition, new objects and operations we can easily think with and about",
	"To use a programmer's metaphor, they become &ldquo;first-class objects&rdquo; in our thinking",
	"This allows for many insights",
	"We've already seen how these elements let us easily understand how trajectories change "+
	    "when the potential is changed");

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "As another example, after working for a while with energy surfaces, "
		+ "you notice the trajectories always have an interesting symmetry");
	energyDemo.scene.remove(interfacePotential);
	vanishAxisLabels();
	linearCameraMove(
	    aboveCameraPosition, 100, function(k) {
		var oldUp = new THREE.Vector3(0, 300, 0);
		var newUp = new THREE.Vector3(0, 0, -300);
		var intermediate = oldUp.multiplyScalar(1-k/100).add(
			newUp.multiplyScalar(k/100)).normalize();
		energyDemo.camera.up.set(intermediate.x, intermediate.y, intermediate.z);
		energyDemo.camera.lookAt(new THREE.Vector3(0, 0, 0));
		}, cleanup);
	function cleanup() {
	    cameraAboveLabel();
	    callback();
	}
    });
    
    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "In particular, if we look down on the trajectories from above, in the <em>x-v</em> "
		+"plane, we see that the trajectories are mirrored around the <em>x</em> axis");
	mirrorImg = document.createElement("img");
	mirrorImg.setAttribute("src", "assets/mirror_image.png");
	mirrorImg.style["z-index"] = "10";
	mirrorImg.style.position = "absolute";
	mirrorImg.style.left = "24px";
	mirrorImg.style.top = "161px";
	energyDemo.div.appendChild(mirrorImg);
	callback();
    });

    energyDemo.addMessageSlide(
	"To put it another way, you can flip all the velocities from <em>v</em> to <em>-v</em>, and the "
	    +"trajectories aren't changed at all"
    );

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "This symmetry continues to hold even when we change the energy of the system");
	deleteElt(mirrorImg);
	energySlider.slideTo(mouse, -0.11, modifyEnergy, delayedFn(
	    function() {energySlider.slideTo(mouse, 0.04, modifyEnergy, callback);}, 300));
    });

    energyDemo.addMessageSlides(
	"It seems plausible as a general result: trajectories are always symmetric "
	    +"about the <em>x</em> axis",
	"That's actually a very strong constraint on the shape of the trajectories"
    );

    energyDemo.addSlide(function(callback) {
	energyDemo.addMessage(
	    "Having conjectured this symmetry, it's pretty easy to see why it holds."
		+" To understand, let's move back to the oblique view of the energy surface");
	delayedFn(moveBack)();
	function moveBack() {
	    vanishAxisLabels();
	    linearCameraMove(
		obliqueCameraPosition, 100, function(k) {
		var oldUp = new THREE.Vector3(0, 0, -300);
		var newUp = new THREE.Vector3(0, 300, 0);
		var intermediate = oldUp.multiplyScalar(1-k/100).add(
			newUp.multiplyScalar(k/100)).normalize();
		energyDemo.camera.up.set(intermediate.x, intermediate.y, intermediate.z);
		energyDemo.camera.lookAt(new THREE.Vector3(0, 0, 0));
		}, cleanup);
	}
	function cleanup() {
	    cameraObliqueLabel("E");
	    energyDemo.scene.add(interfacePotential);
	    energyDemo.render();
	    callback();
	}
    });

    energyDemo.addMessageSlides(
	"Notice that it's not just the trajectories which are symmetric",
	"Looking closely, it's plausible that the energy surface is symmetric in the same way",
	"Recall, from what I said earlier, that the kinetic energy is symmetric "+
	    "with respect to changes in the sign of the velocity",
	"As a result, when we sweep the symmetric kinetic energy curve over the potential, the resulting "+
	    "energy surface must also be symmetric with respect to changes in the sign of the velocity",
	"And, as a result, the trajectories must be symmetric, just as we guessed!",
	"In the traditional formulation, this kind of observation is quite non-trivial",
	"But in a medium where we have easy, direct access to the energy surface"
	    +" and trajectories, it becomes easy to see"
    );
    
    function threeToCanvas(vector, demo) {
	// Given a threejs vector, return the corresponding array [x,
	// y] of canvas co-ordinates.
	var vectorClone = vector.clone();
	vectorClone.project(demo.camera);
	return [(vectorClone.x+1)*demo.renderer.domElement.width/2,
		(-vectorClone.y+1)*demo.renderer.domElement.height/2];
    }
    
    function interpColor(col0, col1, frac) {
	// Returns a color frac of the way between col0 and col1.
	// col0 and col1 should be in "#******" hex format, frac
	// should be in the range 0 to 1.  The color is returned in
	// the same format
	var col0r = parseInt(col0.slice(1, 3), 16), col0g = parseInt(col0.slice(3, 5), 16), col0b = parseInt(col0.slice(5, 7), 16);
	var col1r = parseInt(col1.slice(1, 3), 16), col1g = parseInt(col1.slice(3, 5), 16), col1b = parseInt(col1.slice(5, 7), 16);
	var r = Math.ceil((1-frac)*col0r+frac*col1r);
	var g = Math.ceil((1-frac)*col0g+frac*col1g);
	var b = Math.ceil((1-frac)*col0b+frac*col1b);
	function makeHex(x) {
	    return (x.toString(16).length === 1) ? "0"+x.toString(16) : x.toString(16);
	}
	return "#"+makeHex(r)+makeHex(g)+makeHex(b);
    }
    
    function delayedFn(callback, delay) {
	// Returns a new callback which executes callback with delay
	// (defaults to 200 millisecond)
	delay = delay || 200;
	return function() {mySetTimeout(function() {callback();}, delay)};
    }
	
    function energyTrajectories(E, U, openTraj) {
	// Return an array of trajectories of energy E, associated to
	// the potential U(x).  Each trajectory is itself an array of
	// pairs [x, z], where [x, z] is a point on the trajectory.
	// The pairs are arranged in linear order (i.e., adjacent to
	// one another), and are guaranteed to be cyclic, so the last
	// element in the trajectory is the same as the first element.
	//
	// openTraj is an optional flag, to indicate whether the trajectory
	// should be closed or left open
	//
	// Note that an array of trajectories is used, because certain
	// potentials may have more than one trajectory for a given
	// energy.
	var z;
	var allTrajectories = [];
	var currentTrajectory = [];
	for (var x=1.0; x >= -1.0; x -= 0.02) {
	    if (U(x) < E) {// a solution exists
		z = Math.sqrt(2 * (E-U(x))/ 1.0);
		// using unshift and push ensures that the vertices
		// are added in the same order we'd like to have lines
		// added
		currentTrajectory.unshift([x, -z]);
		currentTrajectory.push([x, z]);
	    } else if (currentTrajectory.length > 0) {
		// no solution exists, but we've found a trajectory,
		// so that trajectory is complete, and should be
		// pushed onto the array of trajectories
		if (!openTraj) {currentTrajectory.push(currentTrajectory[0]);};
		allTrajectories.push(currentTrajectory);
		currentTrajectory = [];
	    }
	}
	return allTrajectories;
    }

    function energyMeshes(E, U, xLeft, openTraj) {
	// Return an array of meshes correpsonding to the trajectories
	// of energy E, for a potential U(x).  If the optional
	// parameter xLeft is included, only include mesh points with
	// x values > xLeft.  This is to allow partial meshes when
	// cutting the energy surface.  If the optional parameter
	// openTraj is included, it controls whether the trajectory is
	// open or closed
	var trajs = energyTrajectories(E, U, openTraj);
	var traj, trajectoryMesh, trajectoryMeshes = [];
	var trajectoryGeometry;
	for (var j=0; j < trajs.length; j++) {
	    traj = trajs[j];
	    trajectoryGeometry = new THREE.Geometry();
	    for (var k=0; k < traj.length; k++) {
		if ((typeof xLeft === "undefined") || (xScale(traj[k][0]) > xLeft)) {
		    trajectoryGeometry.vertices.push(
			new THREE.Vector3(xScale(traj[k][0]), yScale(E)+BUMP, zScale(traj[k][1])));
		}
	    }
	    trajectoryMesh = new THREE.Line(trajectoryGeometry, TRAJECTORY_MATERIAL.clone());
	    trajectoryMeshes.push(trajectoryMesh);
	}
	return trajectoryMeshes;
    }


    // Main animation loop
    energyDemo.rerun(energyDemo.STARTSLIDE);
    energyDemo.anim();



    function parameterizedEnergy(a, b) {
	return new THREE.ParametricGeometry(function(u, v) {
	    var x = -1+2*u;
	    var z = -0.85+v*1.85;
	    var y = 0.5*a*x*x+0.5*b*z*z;
	    return new THREE.Vector3(xScale(x), yScale(y), zScale(z));
	}, 25, 25);
    }

    function updateTrajVertices(traj, a, b, E) {
	var theta, y;
	for (var k=0; k <=32; k++) {
	    theta = k*2*Math.PI/32;
	    y = traj.vertices[k].y;
	    traj.vertices[k] = new THREE.Vector3(
		xScale(Math.cos(theta)*Math.sqrt(2*E/a)), y, zScale(Math.sin(theta)*Math.sqrt(2*E/b)));
	}
	traj.verticesNeedUpdate = true;
	return traj;
    }

    function interpolate(line, f1, f2, finis, extra) {
	var x, y, steps = 0, lambda = 0;
	function step() {
	    steps++;
	    lambda = steps/100;
	    for (var j=0; j <= 20; j++) {
		x = -1+j*0.1;
		y = (1-lambda)*f1(x)+lambda*f2(x);
		line.geometry.vertices[j].y = yScale(y);
	    }
	    line.geometry.verticesNeedUpdate = true;
	    if (extra) {extra(lambda);};
	    energyDemo.render();
	    if (steps < 100) {myRequestAnimationFrame(step);} else {finis();};
	}
	step();
    }    

    //
    // Interface-specific helper functions
    //
    function updateBallPosition() {
	var t = Date.now()-T;
	ball.position.x = xScale(0.8*Math.sin(t/1000));
    }

    function updateModifiedBallPosition() {
	// Same total energy as updateBallPosition, but obeying the
	// new law of motion
	var t = Date.now()-T;
	ball.position.x = xScale(0.8*Math.sin(2*t/1000))/2;
    }

    function updateBall3D() {
	var t = Date.now()-T;
	ball.position.x = xScale(0.8*Math.sin(t/1000));
	ball.position.z = zScale(0.8*Math.cos(t/1000));
    }

    function updateBallAndProjection() {
	updateBall3D();
	projectedBall.position.x = ball.position.x;
	projectedLine.geometry.vertices[0].x = ball.position.x;
	projectedLine.geometry.vertices[0].z = ball.position.z;
	projectedLine.geometry.vertices[1].x = projectedBall.position.x;
	projectedLine.geometry.verticesNeedUpdate = true;
    }
    
    function updateSecondBall3D() {
	var t = Date.now()-T2;
	ball2.position.x = xScale(0.4*Math.sin(t/1000));
	ball2.position.z = zScale(0.4*Math.cos(t/1000));
    }

    //
    // three.js helper functions
    //

    function point(x, y, z, r, col) {
	var geometry = new THREE.SphereGeometry(r, 8, 8);
	var material = new THREE.MeshBasicMaterial( {color: col} );
	var p = new THREE.Mesh(geometry, material );
	p.position.x = x;
	p.position.y = y;
	p.position.z = z;
	return p;
    }

    function plotGraph(f, color) {
	color = (color) ? color : POTENTIAL_COLOR;	
 	var material = new THREE.LineBasicMaterial({color: color, linewidth: 5});
	var geometry = new THREE.Geometry();
	for (var j=0; j <= 20; j++) {
	    var x = -1+j*0.1;
	    var y = f(x);
	    geometry.vertices.push(new THREE.Vector3(xScale(x), yScale(y), 0));
	}
	geometry.dynamic = true;
	var graph = new THREE.Line(geometry, material);
	return graph;
    }


    function linearCameraMove(finalPosition, N, innerCallback, callback) {
	// Move the camera from its current position to finalPosition (a
	// THREE.Vector3 instance), through N steps, and then execute
	// callback()).
	var steps = 0;
	var initialPosition = new THREE.Vector3().copy(energyDemo.camera.position);
	var interpPosition;
	swing();
	function swing() {
	    steps++;
	    interpPosition = linearCombo((1-steps/N), initialPosition, steps/N, finalPosition);
	    energyDemo.camera.position.set(interpPosition.x, interpPosition.y, interpPosition.z);
	    energyDemo.camera.lookAt(new THREE.Vector3(0, 0, 0));
	    innerCallback(steps);
	    energyDemo.camera.updateProjectionMatrix();
	    energyDemo.render();
	    if (steps < N) {
		myRequestAnimationFrame(swing);
	    } else {
		callback();
	    };
	}
    }
    
    function sweepGeometry(f, callback) {
	function sweptGeometry(g, x1, x2) {
	    return new THREE.ParametricGeometry(function(u, v) {
		var x = x1+u*(x2-x1);
		var z = -0.85+v*1.85;
		var y = g(x, z); 
		return new THREE.Vector3(xScale(x), yScale(y), zScale(z));
	    }, 25, 25);
	}
	var step=0;
	sweep();
	function sweep() {
	    step++;
	    var x1, x2;
	    if (step < 50) {
		x1 = -step/50;
		x2 = 0;
	    } else {
		x1 = -1;
		x2 = (step-50)/50;
	    };
	    ESmesh = sweptGeometry(f, x1, x2);
	    ES = THREE.SceneUtils.createMultiMaterialObject(ESmesh, energySurfaceMaterials);
	    ES.position.set(0, 0, 0);
	    energyDemo.scene.add(ES);
	    updateBall3D();
	    energyDemo.render();
	    if (step < 100) {
		myRequestAnimationFrame(
		    function() {
			energyDemo.scene.remove(ES);
			sweep();
		    });
	    } else {
		callback();
	    }
	}
    }


    function plotGeometry(f, opacity) {
	ESmesh = new THREE.ParametricGeometry(function(u, v) {
	    var x = -1+2*u;
	    var z = -0.85+v*1.85;
	    var y = f(x, z); 
	    return new THREE.Vector3(xScale(x), yScale(y), zScale(z));
	}, 25, 25);
	ES = THREE.SceneUtils.createMultiMaterialObject(ESmesh, energySurfaceMaterials);
	ES.position.set(0, 0, 0);
	if (opacity) {ES.children[0].material.opacity = opacity;}
	energyDemo.scene.add(ES);
	energyDemo.render();
    }


    //
    // General helper functions
    //
    function deleteElt(elt) {
	if (elt) {elt.parentNode.removeChild(elt);};
    }

    function deleteEltById(id) {
	deleteElt(document.getElementById(id));
    }

    function linearCombo(a, v, b, w) {
	// Returns a v + b w, where a and b are Numbers, v and w are THREE.Vector3 instances
	return new THREE.Vector3(a*v.x+b*w.x, a*v.y+b*w.y, a*v.z+b*w.z);
    }
}());


function fit(x, array) {
    // array is an array containing n [x, y] pairs. fit(x, array)
    // returns the value of the (n-1)th degree polynomial p(x) that
    // passes through all those pairs
    var s = 0;
    for (var j=0; j < array.length; j++) {
	s += array[j][1]*lagrange(j, x, array);
    }
    return s;
}

function lagrange(j, x, array) {
    var p = 1;
    for (var k=0; k < array.length; k++) {
	if (k !== j) {p *= (x-array[k][0])/(array[j][0]-array[k][0]);}
    }
    return p;
}
