var trajectoryColor = "#888888";
var GOLD = "#FFe766";
var DARKGOLD = "#f5d31a";
var ICON_HIGHLIGHT = GOLD; // Different to the demo_button:hover
			   // background-color in demo.css

//
// SET UP THE DISPLAYABLE OBJECT CLASSES
//
function Mouse(demo, x, y) {
    // Creates a mouse pointer within demo, at position x and y within
    // demo.div, and with a z-index of 100.
    this.demo = demo;
    this.x = x;
    this.y = y;
    this.img = document.createElement("img");
    this.img.setAttribute("src", "js/demo/mouse.png");
    this.img.style["z-index"] = "100";
    this.img.style.position = "absolute";
    this.img.style.left = x+"px";
    this.img.style.top = y+"px";
    this.demo.div.appendChild(this.img);
}

Mouse.prototype.display = function() {
    this.img.style.left = this.x+"px";
    this.img.style.top = this.y+"px";
};

Mouse.prototype.move = function(x, y, callback) {
    var x0 = this.x, y0 = this.y;
    var j = 0;
    function slowForSmall(n) {// if it's less than 80 steps, slow things down
	function p(n) {return Math.exp(-n/80);}
	return p(n)*50+(1-p(n))*n;
    }
    var n = slowForSmall(Math.ceil(0.3*vectorLength(x-x0, y-y0))+1);
    var interp = (function() {
	j++;
	this.x = x0+(j/n)*(x-x0);
	this.y = y0+(j/n)*(y-y0);
	this.checkMouseover();
	this.display();
	if (j < n) {myRequestAnimationFrame(interp);} else {callback();};
    }).bind(this);
    interp();
};

Mouse.prototype.checkMouseover = function() {
    this.demo.checkMouseover(this);
    this.demo.display();
};

function Ball(demo, r, color, trajectory, xScale, yScale) {
    this.demo = demo;
    this.r = r;
    this.color = color;
    this.trajectory = trajectory;
    this.xScale = xScale;
    this.yScale = yScale;
    this.localDisplacement = 0;
}

Ball.prototype.display = function(j) {
    this.demo.ctx.ball(
	this.xScale(this.trajectory.positions[j+this.localDisplacement].x),
	this.yScale(this.trajectory.positions[j+this.localDisplacement].y),
	this.r, this.color);
};

Ball.prototype.clickBy = function(mouse, callback) {
    var x = this.xScale(this.trajectory.positions[this.demo.k+this.localDisplacement].x);
    var y = this.yScale(this.trajectory.positions[this.demo.k+this.localDisplacement].y);
    mouse.move(x-5, y-5,
	(function() {
	    var oldColor = this.color;
	    this.color = GOLD;
	    mySetTimeout((function() {this.color = oldColor; callback();}).bind(this), 300);
	}).bind(this));
};

function Trajectory(demo, t0, t1, delta, position, xScale, yScale) {
    var t = t0;
    this.demo = demo;
    this.t0 = t0;
    this.t1 = t1;
    this.x0 = position(t0).x;
    this.y0 = position(t0).y;
    this.delta = delta;
    this.positions = [];
    this.xScale = xScale;
    this.yScale = yScale;
    while (t <= this.t1) {this.positions.push(position(t)); t += delta;}
    this.mouseover = false;
}

Trajectory.prototype.display = function() {
    var col = (this.mouseover)? DARKGOLD : trajectoryColor;
    if (this.col) {col = this.col}; // hack override
    this.demo.ctx.lineWidth = 1.2;
    for (var j=0; j < this.positions.length-1; j++) {
	this.demo.ctx.line(
	    this.xScale(this.positions[j].x), this.yScale(this.positions[j].y),
	    this.xScale(this.positions[j+1].x), this.yScale(this.positions[j+1].y),
	    col);
    }
}
Trajectory.prototype.recomputeUnderGravity = function(vx0, vy0) {
    var t=this.t0;
    this.positions = [];
    while (t <= this.t1) {
	this.positions.push(positionUnderGravity(this.x0, this.y0, vx0, vy0, this.t0, t));
	t += this.delta;
    }
}

Trajectory.prototype.checkMouseover = function(mouse) {
    var x = mouse.x+mouse.img.width/2;
    var y = mouse.y+mouse.img.height/2;
    var nearby = (function(pos, x, y) {
	var d = Math.sqrt(Math.pow(this.xScale(pos.x)-x, 2)+Math.pow(this.yScale(pos.y)-y, 2));
	return (d < 15);
    }).bind(this);
    return this.positions.some(function(p) {return nearby(p, x, y);});
} 

function StaticBall(demo, r, color, x, y) {
    this.demo = demo;
    this.r = r;
    this.color = color;
    this.x = x;
    this.y = y;
}

StaticBall.prototype.display = function() {
    this.demo.ctx.ball(this.x, this.y, this.r, this.color);
}

function Icon(demo, text, x, y, width, height, img_filename) {
    // img_filename is optional
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height ? height: 32;
    this.span = document.createElement("span");
    this.span.className = "demo_icon";
    this.span.innerHTML = text;
    this.span.style.left = x+"px";
    this.span.style.top = y+"px";
    this.span.style.width = width+"px";
    this.span.style.height = this.height+"px";
    if (img_filename) {
	var img = document.createElement("img");
	img.setAttribute("src", "images/draw_potential_icon.png");
	img.style["z-index"] = "100";
	img.style.position = "absolute";
	img.style.left = x+"px";
	img.style.top = y+"px";
    }
    demo.div.appendChild(this.span);
    if (img) {
	demo.div.appendChild(img);
    }
    this.mouseover = false;
}

Icon.prototype.display = function() {
    if (!this.mouseover) {
	this.span.style["background-color"] = "#EEE";
    } else {
	this.span.style["background-color"] = "#DDD";
    }
}

Icon.prototype.remove = function() {
    removeElement(this.span);
};

Icon.prototype.checkMouseover = function(mouse) {
    // Return true if mouse if over the icon
    return (mouse.x > this.x-mouse.img.width) && (mouse.x < this.x+this.width) &&
	(mouse.y > this.y-mouse.img.height) && (mouse.y < this.y+this.height);
}

Icon.prototype.clickBy = function(mouse, callback) {
    // Move the mouse to the icon, and click
    mouse.move(
	this.x+this.width/2, this.y+this.height/2,
	(function() {
	    //this.span.style["color"] = GOLD;
	    this.span.style["background-color"] = ICON_HIGHLIGHT;
	    mySetTimeout((function() {
		//this.span.style["color"] = "";
		this.span.style["background-color"] = "";
		callback();
	    }).bind(this), 250);
	}).bind(this));
}

function Slider(demo, text, x, y, width, x0bar, x1bar, t0, t1, t, N) {
    Icon.call(this, demo, text, x, y, width);
    this.span.style.textAlign = "left";
    // this.span.style.paddingLeft = "3px";
    this.bar = document.createElement("span");
    this.bar.style.position = "absolute";
    this.bar.style.left = x0bar+"px";
    this.bar.style.right = x1bar+"px";
    this.bar.style.top = "16px";
    this.bar.style.height = "3px";
    this.bar.style.backgroundColor = "#555";
    this.span.appendChild(this.bar);
    this.x0bar = x0bar;
    this.x1bar = x1bar;
    this.t0 = t0;
    this.t1 = t1;
    this.t = t;
    if (N) {this.N = N};
    this.tick = document.createElement("span");
    this.tick.style.position = "absolute";
    var frac = ((t-t0)/(t1-t0)); // fraction of the way the slider is across
    this.tick.style.left = (x0bar+frac*(width-x1bar-x0bar)-1)+"px";
    this.tick.style.top = "13px";
    this.tick.style.width = "2px";
    this.tick.style.height = "8px";
    this.tick.style.backgroundColor = "#555555";
    this.span.appendChild(this.tick);
}

Slider.prototype = Object.create(Icon.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.display = function(k) {
    if (!this.mouseover) {
	this.span.style["background-color"] = "#dddddd";
    } else {
	this.span.style["background-color"] = "#cccccc";
    }
    if (this.N) {var frac = k/this.N;} // fraction of the way the slider is across
    this.tick.style.left = (this.x0bar+frac*(this.width-this.x1bar-this.x0bar)-1)+"px";
};

Slider.prototype.slideTo = function(mouse, val, innerCallback, callback) {
    val = Math.max(val, this.t0); // Make sure val isn't too small
    val = Math.min(val, this.t1); // Make sure val isn't too large
    var val0 = this.t;
    var n = 2*Math.ceil((Math.abs(val-this.t)/(this.t1-this.t0))*(this.width-this.x1bar-this.x0bar-1)); // number of steps
    var k = 0;
    var slide = (function() {
	k++;
	var frac = k/n;
	this.t = val0+frac*(val-val0);
	if (innerCallback) {innerCallback(this.t);};
	var xFrac = (this.t-this.t0)/(this.t1-this.t0);
	var x = (this.x0bar+xFrac*(this.width-this.x1bar-this.x0bar)-1);
	this.tick.style.left = x+"px";
	mouse.x = this.x+x;
	mouse.display();
	if (k < n) {myRequestAnimationFrame(slide);} else {callback();};
    }).bind(this);
    this.moveMouse(mouse, slide);
};

Slider.prototype.moveMouse = function(mouse, callback) {
    mouse.move(parseInt(this.tick.style.left, 10)+this.x, parseInt(this.tick.style.top, 10)+this.y, callback);
};




