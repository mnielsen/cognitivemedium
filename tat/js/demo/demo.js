// demo.js: A system for funning demos in canvas and threejs
//
// By Michael Nielsen, July 2016
//
// MIT License
//
// When setting up slides, don't use setTimeout or
// requestAnimationFrame.  It will cause problems when you move
// backward through the slide deck.  Instead, use demo.setTimeout and
// demo.requestAnimationFrame.
myRequestAnimationFrame = requestAnimationFrame;
mySetTimeout = setTimeout;
var MOUSE_LOG = true;

function Demo(divname, variety, startslide, development) {
    // creates a demo inside the div with id divname.
    //
    // variety is a string that can be either "threejs" or "canvas"
    //
    // startslide is a Number than indexes the starting slide.  The
    // default is 0.
    //
    // development is a Boolean.  If set to true, then development
    // information is printed (e.g., slide numbers are printed in
    // messages).  Default is false.
    this.DIVNAME = divname;
    this.div = document.getElementById(this.DIVNAME);
    this.demoDiv = this.div.parentElement;
    this.demoDiv.setAttribute("tabindex", "0");
    this.WIDTH = parseInt(getComputedStyle(this.div).width);
    this.HEIGHT = parseInt(getComputedStyle(this.div).height);
    this.STARTSLIDE = (startslide) ? startslide : 0;
    this.development = (development) ? development : false;
    this.slide = 0;
    this.slides = [];
    // button control, to signal to anim when it should change slide
    this.changeSlide = false;
    this.previousSlide = false;
    this.variety = variety;
    document.getElementById(this.DIVNAME+"_back").onclick = (
	function() {this.previousSlide = true;}).bind(this);
    document.getElementById(this.DIVNAME+"_forward").onclick = (
	function() {this.changeSlide = true;}).bind(this);
    document.getElementById(this.DIVNAME+"_rerun").onclick = (
	function() {this.rerun(0);}).bind(this);
    this.demoDiv.addEventListener(
	"keydown",
	 (function(e) {
	     if ((e.keyCode === 37) || (e.keyCode === 80)) { // left arrow, p, P
		 this.previousSlide = true;
	     } else if ((e.keyCode === 39) || (e.keyCode === 13) || (e.keyCode === 78)) {
		 // rightarrow, enter, n, N
		 this.changeSlide = true;
	     } else if (e.keyCode === 82) { // r, R
		 this.rerun(0);
	     };
	 }).bind(this));
    mySetTimeout = setTimeout;
    myRequestAnimationFrame = requestAnimationFrame;
    if (development && MOUSE_LOG) {
	this.div.onmousemove = function(e) {console.log("Mouse: ", e.offsetX, e.offsetY);};
    }
    if (variety === "threejs") {
	this.VIEW_ANGLE = 45;
	this.ASPECT = (this.WIDTH-100) / this.HEIGHT;
	this.NEAR = 0.1;
	this.FAR = 10000;
	this.DISTANCE = 300;
	this.renderer = new THREE.WebGLRenderer({alpha: true});
	this.renderer.setClearColor(0xFFFFFF);
	this.renderer.setSize(this.WIDTH-100, this.HEIGHT);
	this.renderer.domElement.style.position = "absolute";
	this.renderer.domElement.style.left = "0px";
	// this.renderer.domElement.
	this.div.appendChild(this.renderer.domElement);
	this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
	this.camera.position.set(0, 0, this.DISTANCE);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.scene = new THREE.Scene();
	this.scene.add(this.camera);
	this.scene.add(new THREE.AmbientLight(0xffffff));
	this.pointLight = new THREE.PointLight(0xFFFFFF);
	this.pointLight.position.set(0, 40, 0);
	this.scene.add(this.pointLight);
    }
    if (variety === "canvas") {
	this.scene = [];
	this.k = 0; // counter to keep track of whereabouts on the
		    // trajectory we are.  This is a hack.
    }
}

Demo.prototype.placeHTML = function(html, x, y, id) {
    var htmlSpan = document.createElement("span");
    htmlSpan.style.position = "absolute";
    htmlSpan.style.left = x+"px";
    htmlSpan.style.top = y+"px";
    htmlSpan.style.color = "#7F7F7F";
    htmlSpan.innerHTML = html;
    if (id) {htmlSpan.id = id;}
    this.div.appendChild(htmlSpan);
    return htmlSpan;
}

Demo.prototype.addMessage = function(html) {
    var id = this.DIVNAME+"_message";
    var messageDiv = document.getElementById(id);
    if (this.development) {html = this.slide+": "+html}
    messageDiv.innerHTML = html;
}

Demo.prototype.render = function() {
    if (this.variety === "threejs") {
	this.renderer.render(this.scene, this.camera);
    } else if (this.variety === "canvas") {
	// pass
    }
}

Demo.prototype.display = function(k) {
    if (this.ctx) {this.ctx.clear();}
    this.k = (k) ? k : this.k;
    for (var j=0; j < this.scene.length; j++) {
	this.scene[j].display(this.k);
    }
}

Demo.prototype.removeObject = function(obj) {
    this.scene.splice(this.scene.indexOf(obj), 1);
}

Demo.prototype.anim = function f() {
    this.slides[this.slide].holding();
    this.render();
    if (this.previousSlide && (this.slide === 0)) {
       console.log("At the beginning of the available slides");
       this.previousSlide = false;
    }
    if (this.previousSlide && (this.slide > 0)) {
	this.rerun(this.slide-1);
	this.previousSlide = false;
	myRequestAnimationFrame(f.bind(this));
    }
    if (!this.changeSlide) {
	myRequestAnimationFrame(f.bind(this));
    } else if (this.slide === this.slides.length-1) {
	this.changeSlide = false;
	console.log("At the end of the available slides");
	myRequestAnimationFrame(f.bind(this));
    } else {
	this.changeSlide = false;
	this.slide++;
	this.slides[this.slide].transition((function() {
	    this.render();
	    myRequestAnimationFrame(f.bind(this));
	}).bind(this));
    }
}

Demo.prototype.rerun = function(goal) {
    this.rset();
    mySetTimeout = function(callback, delay) {callback();};
    myRequestAnimationFrame = function(callback) {callback();};
    this.slide = 0;
    for (var j=0; j <= goal; j++) {
	this.slide = j;
	this.slides[j].transition((function() {
	    this.slides[j].holding();
	}).bind(this));
    }
    this.render();
    this.slide = goal;
    mySetTimeout = setTimeout;
    myRequestAnimationFrame = requestAnimationFrame;
}

Demo.prototype.rset = function() {
    // Reset everything: set the slide to 0, blank the renderer, clear
    // the parent DOM used for html, and clear the message.
    this.slide = 0;
    this.div.innerHTML = "";
    this.addMessage("");
    if (this.variety === "threejs") {
	this.scene.children = this.scene.children.slice(0, 3);
	this.camera.position.set(0, 0, this.DISTANCE);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.render();
	this.div.appendChild(this.renderer.domElement);
    }
    if (this.variety === "canvas") {
	this.scene = [];
        this.canvas = document.createElement("canvas");
        this.canvas.id = this.DIVNAME+"_canvas";
        this.canvas.setAttribute("width", this.WIDTH);
        this.canvas.setAttribute("height", this.HEIGHT);
        this.div.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }
};

Demo.prototype.addSlide = function(t, h) {
    // Add a slide with transition function t (with a callback
    // parameter), and holding function h.  If h is not supplied then
    // use the previous value for the holding function.  If we're on
    // the first slide, then use the pass method (i.e., do nothing).
    if (!h && this.slides.length === 0) {h = this.pass;}
    if (!h && this.slides.length > 0) {h = this.slides[this.slides.length-1].holding;}
    this.slides.push({transition: t, holding: h});
};

Demo.prototype.pass = function() {
    // do nothing
};

Demo.prototype.addMessageSlide = function(message) {
    // add a slide with a text message, and using the same holding
    // function as before
    this.addSlide(function(callback) {
	this.addMessage(message);
	callback();
    }.bind(this));
};

Demo.prototype.addMessageSlides = function() {
    for (var j=0; j < arguments.length; j++) {
	this.addMessageSlide(arguments[j]);
    }
}

Demo.prototype.checkMouseover = function(mouse) {
    for (var j=0; j < this.scene.length; j++) {
	if (this.scene[j].checkMouseover) {
	    this.scene[j].mouseover = this.scene[j].checkMouseover(mouse);
	}
    }
}

// General helper function
function vectorLength(x, y) {
    return Math.sqrt(x*x+y*y);
}



