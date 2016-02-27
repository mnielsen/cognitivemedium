// prototype.js
//
// To help with building rough-and-ready prototypes.

// Parameters for the width and height of the prototype windows
var WIDTH=660;
var HEIGHT=400;

// rescale delays by this amount, a good baseline is 1 (no slowing or
// speeding), make it say 1.2 if you want to slow things down by 20
// percent
var SCALE_TIME = 1.2;


var prototype_status;  // array to store status of each prototype, using the following status codes
var STATIC = 0;   // prototype is completely static, no need to run it
var UNRUN = 1;    // prototype has never run
var ACTIVE = 2;   // prototype is currently running
var COMPLETE = 3; // prototype has run and is now waiting to be rerun

var restart_signal; // array to store signals telling each prototype
		    // whether to restart or not.  Initially false.


var LOG_POINTER_POSITION = true; // set to true for help debugging positioning information

$(document).ready(
    function() {
	var prototypes = $("prototype");
	var names = $.makeArray(prototypes).map(function(prototype) {return prototype.getAttribute("name");});
	if (names.contains_duplicates()) {console.error("Duplicate name for prototypes")};
	if (names.includes("")) {console.error("Unnamed prototype")};
	function static_or_unrun(prototype) {
	    return prototype.getAttribute("static") === "true" ? STATIC : UNRUN
	}
	prototype_status = range(0, prototypes.length).map(
	    function(j) {return static_or_unrun(prototypes[j]);});
	restart_signal = range(0, prototypes.length).map(function(j) {return false;});
	for (var j=0; j < prototypes.length; j++) {init_prototype(j, prototypes[j]);}
	if (LOG_POINTER_POSITION) {
	    for (var j=0; j < prototypes.length; j++) {
		$("#prototype"+j).mousemove(function(e) {
		    var canvas = $(this).find("canvas")[0];
		    console.log(mousePosition(e, canvas));
		});
	    }
	}
    }
)

function init_prototype(j, prototype) {
    // Replace the prototype element by a div and canvas that we will
    // manipulate
    var title = prototype.getAttribute("text") || "";
    var name = prototype.getAttribute("name");
    var div = document.createElement("div");
    div.id = "prototype"+j;
    div.className = "prototype_div";
    set_style(
	div,
	{"backgroundColor": "#eee",
	 "cursor": "pointer",
	 "opacity": "0.8",
	 "z-index": "100"});
    $(prototype).replaceWith(div);
    div = $("#prototype"+j);
    div.append("<canvas width='"+WIDTH+"' height='"+HEIGHT+"' id='"+name+"'/>");
    if (prototype_status[j] !== STATIC) {
	div.append(
	    title ? "<p class='prototype_title' id='prototype_title_"+j+"'>"+title+"</p>" : "");
	div.append(
	    "<img class='prototype_img' src='play.png' width='128px'>");
	prototype.innerHTML += "\n<ticker><a>Click anywhere to restart</a></ticker><complete></complete>";
    }

    // run prototype immediately if STATIC, otherwise set up the
    // appropriate event handlers to trigger a run
    if (prototype_status[j] === STATIC) {run_prototype(j, prototype)};
    div.click(function() {
	if (prototype_status[j] === UNRUN) {
    	    prototype_status[j] = ACTIVE;
    	    if (!LOG_POINTER_POSITION) {div[0].style.cursor = "none"};
    	    div[0].getElementsByTagName("img")[0].style.display = "none";
    	    $("#prototype_title_"+j).remove();
    	    run_prototype(j, prototype);
	} else if (prototype_status[j] === ACTIVE) {
	    restart_signal[j] = true;
	} else if (prototype_status[j] === COMPLETE) {
	    restart(j, prototype, div, name);
    	    run_prototype(j, prototype);
    	};
    });
}

function restart(j, prototype, div, name) {
    $("#ticker"+j+"_"+(prototype.children.length-2)).remove();
    prototype_status[j] = ACTIVE;
    if (!LOG_POINTER_POSITION) {div[0].style.cursor = "none"};
    var ctx = document.getElementById(name).getContext("2d");
    ctx.clear();
    div.empty();
    div.append("<canvas width='600' height='400' id='"+name+"'/>");
}

function run_prototype(j, prototype) {
    var div = $("#prototype"+j);
    var x_pointer, y_pointer; // for the mouse pointer
    var icons = {}; // to register details of the icons

    var exe = {
	"CHANGE_MOUSE_POINTER": change_mouse_pointer,
	"COMPLETE": complete,
	"COMMENT": comment,
	"DRAG": drag,
	"ICON": icon,
	"INIT_POINTER": init_pointer,
	"KILL_POINTER": kill_pointer,
	"MOVE_MOUSE": move_mouse,
	"PAUSE": pause,
	"RUN": run,
	"SELECT_ICON": select_icon,
	"TEXT": text,
	"TICKER": ticker
    }

    function execute() {
	var elt = prototype.children[k];
	if (k < prototype.children.length) {
	    if (elt.nodeName) {
		exe[elt.nodeName](elt,function() {k++; execute();});
	    } else {
		console.warning(elt.nodeName+": command not recognized");
	    }
	}
    }

    var k = 0; // counter for step in the prototype
    execute();

    function complete(elt) {
	prototype_status[j] = COMPLETE;
	div[0].style.cursor = "auto";
    }

    function comment(elt, next_step) {
	// Ignores the contents
	next_or_restart(next_step)
    }

    function drag(elt, next_step) {
	var name = elt.getAttribute("name");
	var x = parseInt(elt.getAttribute("x"));
	var y = parseInt(elt.getAttribute("y"));
	move_pointer(
	    icons[name].x+5, icons[name].y+5,
	    function() {
		move_pointer(x, y, next_step);
	    });
    }

    function drag_fast(elt, next_step) {
	var name = elt.getAttribute("name");
	var x = parseInt(elt.getAttribute("x"));
	var y = parseInt(elt.getAttribute("y"));
	move_pointer_fast(
	    icons[name].x+5, icons[name].y+5,
	    function() {
		move_pointer(x, y, next_step);
	    });
    }

    
    function icon(elt, next_step) {
	var x = parseInt(elt.getAttribute("x"));
	var y = parseInt(elt.getAttribute("y"));
	var src = elt.getAttribute("src");
	var name = elt.getAttribute("name");
	div.append(
	    "<img id='icon_"+name+"' style='position: absolute; left: "+x+"px; top: "+y+"px;' src='"+src+"'/>");
	icons[name] = {"x": x, "y": y};
	next_or_restart(next_step);
    }

    function init_pointer(elt, next_step) {
	// Add a mouse pointer at location given by the x and y
	// attributes.  These are assumed to be in pixels.  If a mouse
	// pointer already exists, eliminate it.
	var old_pointer = document.getElementById("pointer"+j);
	if (old_pointer) {old_pointer.remove()}; // remove the old pointer if it exists
	x_pointer = parseInt(elt.getAttribute("x")) || 200;
	y_pointer = parseInt(elt.getAttribute("y")) || 100;
	div.append(
	    "<img id='pointer"+j+"' src='images/cursor.png' style='z-index: 100; position: absolute; left: "+x_pointer+"px; top: "+y_pointer+"px;'/>");
	next_or_restart(next_step);
    }
    
    function kill_pointer(elt, next_step) {
	var old_pointer = document.getElementById("pointer"+j);
	if (old_pointer) {old_pointer.remove()}; // remove the old pointer if it exists
	next_or_restart(next_step);
    }

    function change_mouse_pointer(elt, next_step) {
	var name = elt.getAttribute("name");
	x_pointer = parseInt(elt.getAttribute("x")) || x_pointer;
	y_pointer = parseInt(elt.getAttribute("y")) || y_pointer;
	var img = document.getElementById("pointer"+j);
	img.src = name;
	img.style.left = x_pointer+"px";
	img.style.top = y_pointer+"px";
	img.style["z-index"] = 100;
	next_or_restart(next_step);
    }
    
    function pause(elt, next_step) {
	var delay = elt.getAttribute("delay") || 1000;
	window.setTimeout(
	    function() {next_or_restart(next_step);}, delay*SCALE_TIME);
    }

    function run(elt, next_step) {
	var code = elt.textContent;
	eval(code);
	next_or_restart(next_step);
    }
    
    function select_icon(elt, next_step) {
	var name = elt.getAttribute("name");
	move_pointer(icons[name].x+26, icons[name].y+32,
		     function() {
			 var icon = $("#icon_"+name);
			 icon.css("left", (icons[name].x+6)+"px");
			 icon.css("top", (icons[name].y+6)+"px");
			 icon.attr("width", "52px");
			 window.setTimeout(function() {
			     icon.css("left", icons[name].x+"px");
			     icon.css("top", icons[name].y+"px");
			     icon.attr("width", "64px");
			     next_or_restart(next_step)}, 200);
		     });
    }

    function move_mouse(elt, next_step) {
	move_pointer(parseInt(elt.getAttribute("x")), parseInt(elt.getAttribute("y")),
		     next_step, parseInt(elt.getAttribute("interrupt")), elt.innerHTML);
    }
    
    function move_pointer(x, y, final, interrupt, interrupt_code) {
	var length = Math.sqrt((x-x_pointer)*(x-x_pointer)+(y-y_pointer)*(y-y_pointer));
	var num = parseInt(0.3*length+20*Math.pow(sinc(length*length/40000), 2))+1;
	if (interrupt) {
	    var interrupt_point = Math.floor(interrupt*num/100);
	}
	step(0, x, y, final);
	function step(k, x, y, final) {// k goes from 0 to num
	    if (k === interrupt_point) {eval(interrupt_code)};
	    $("#pointer"+j)
		.css("left", x_pointer+k*(x-x_pointer)/num)
		.css("top", y_pointer+k*(y-y_pointer)/num);
	    if (k < num) {
		window.setTimeout(
		    function() {step(k+1, x, y, final)}, 10);
	    } else {
		x_pointer = x;
		y_pointer = y;
		final();
	    }
	}
    }

    function text(elt, next_step) {
	var x = parseInt(elt.getAttribute("x")) || 0;
	var y = parseInt(elt.getAttribute("y")) || 0;
	var id = elt.getAttribute("id") || "text"+j+"_"+k; 
	var t = elt.innerHTML;
	var name = elt.getAttribute("name");
	div.append("<p class='prototype' id='"+id+"' style=\"display: 'none'; left: "+x+"px; top: "+y+"px;\">"+t+"</p>");
	MathJax.Hub.Typeset($("#"+id)[0]);
	//$("#"+id)[0].style.display = "none";
	//MathJax.Hub.Queue(["Typeset", MathJax.Hub, $("#"+id)[0]]);
	//MathJax.Hub.Queue(function() {$("#"+id)[0].style.display = "inline"});
	if (name !== undefined) {
	    icons[name] = {"x": x, "y": y};
	    }
	next_or_restart(next_step);
    }

    function ticker(elt, next_step) {
	$(div).remove(".ticker");
	var t = elt.innerHTML;
	var id = "ticker"+j+"_"+k;
	$("#"+id).remove();
	div.append("<div id='"+id+"' class='ticker'></div>");
	$("#"+id).append($("<div id='"+id+"text' class='ticker-text'>"));
	$("#"+id+"text").append(t)
	MathJax.Hub.Typeset($("#"+id+"text")[0]);
	//$("#"+id+"text")[0].style.display = "inline"
	//MathJax.Hub.Queue(["Typeset", MathJax.Hub, $("#"+id+"text")[0]])
	//MathJax.Hub.Queue(function() {$("#"+id+"text")[0].style.display = "inline"});
	next_or_restart(next_step);
    }


    function next_or_restart(next_step) {
	if (!restart_signal[j]) {
	    next_step()
	} else {
	    restart_signal[j] = false;
	    restart(j, prototype, div, prototype.getAttribute("name"));
    	    run_prototype(j, prototype);
	}
    }
}


function image(filename, x, y) {
    // Returns an image object with the appropriate filename, x and y
    // values
    var img = new Image();
    img.src = filename;
    set_style(img, {"position": "absolute", "display": "block",
		    "left": x+"px", "top": y+"px"});
    return img;
}

function animate_frames(j, image_filenames, delays, x, y, old_img) {
    var img = image(image_filenames.shift(), x, y);
    if (old_img) {old_img.style.display = "none";}
    document.getElementById("prototype"+j).appendChild(img);
    var delay = delays.shift();
    if (delays.length > 0) {
	window.setTimeout(function() {
	    animate_frames(j, image_filenames, delays, x, y, img);
	}, delay);
    }
}


// Miscellaneous functions

function isAlpha(s) {
    // Checks whether the string s contains alphabetical characters only
    return /^[a-zA-Z]+$/.test(s);
}

function selfOrDefault(x, deflt) {
    // Return x if x is not undefined, otherwise return the default
    return (typeof x !== "undefined") ? x : deflt;
}

function parseArgs(args, deflt) {
    // For each key in the associative array deflt, set args to that key,
    // if the key isn't in args.  Then return args.
    args = selfOrDefault(args, {});
    for (var index in deflt) {
	args[index] = selfOrDefault(args[index], deflt[index]);
    }
    return args;
}

function range(start, end, step) {
    // Return the Array [start, start+step, start+2*step, ...] up to,
    // but not including end.  If step is undefined, it defaults to 1.
    step = selfOrDefault(step, 1);
    var l = [];
    for (var x = start; x < end; x += step) {l.push(x);}
    return l;
}

Number.prototype.limit = function(a, b) {
    // Assumes a < b.  Returns the number if it's within the range a
    // to b, otherwise returns the smaller or larger endpoint, as
    // appropriate.  Idea from Mootools.
    if (this.valueOf() < a) {return a}
    if (this.valueOf() > b) {return b}
    return this.valueOf();
}

Number.prototype.sign = function() {
    return this >= 0 ? 1 : -1;
}

function sinc(x) {
    return x === 0 ? 1 : Math.sin(x)/x;
}

Array.prototype.contains_duplicates = function() {
    // Return true if this contains duplicated elements.  Note that
    // this requires ES6.
    return (new Set(this)).size !== this.length;
}

Array.prototype.includes = function(x) {
    return (this.indexOf(x) > -1)
}

function mousePosition(e, canvas) {
    // Return an associative array whose elements are the x and y
    // co-ordinates with respect to canvas
    var rect = canvas.getBoundingClientRect();
    return {"x": Math.floor(e.clientX-rect.left), "y": Math.floor(e.clientY-rect.top)};
}

function set_style(elt, properties) {
    // Run through the keys in properties and set the CSS style for
    // elt to the corresponding value
    for (var p in properties) {elt.style[p] = properties[p];}
}

function deleteElement(elt) {
    elt.parentNode.removeChild(elt);
}
