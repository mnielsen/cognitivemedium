// Marix to take the SVD of
var M = [[0.70, -0.28], [1.27, 0.86]]
// angle for principal right singular vector
var phi = 0.5*Math.atan(2*(M[0][0]*M[0][1]+M[1][0]*M[1][1])/
			(M[0][0]*M[0][0]+M[1][0]*M[1][0]-M[0][1]*M[0][1]-M[1][1]*M[1][1]));
var s_vec = [Math.cos(phi), Math.sin(phi)];
var t_vec = [-Math.sin(phi), Math.cos(phi)];
var Ms_vec = m_times_v(M, s_vec);
var psi = Math.atan(Ms_vec[1]/Ms_vec[0]);
var Mt_vec = m_times_v(M, t_vec);
var Mt_fake_vec = [-0.15, 0.5];
var radius_vec = [Mt_fake_vec[1], -Mt_fake_vec[0]];
var radius = length_vec(radius_vec);
var radius_angle = Math.atan(radius_vec[1]/radius_vec[0]);
var center_vec = [Ms_vec[0]-radius_vec[0], Ms_vec[1]-radius_vec[1]];

// colors to use to plot the unit vectors, their images, and the axes unit vectors
var UNIT_COLOR = "#5E5"; // for vectors on the unit circle
var UNIT_COLOR_HIGHLIGHTED = "#9E9";
var IMAGE_COLOR = "#FA5"; // for vectors on the image of the unit circle
var AXIS_COLOR = "#777"; // for the x and y axes
var UNIT_AXES_COLOR = "#00F";

function length_vec(v) {
    return Math.sqrt(v.map(function(x) {return x*x}).reduce(function(x, y) {return x+y}));
}

function icon_bar(id) {
    var ctx = document.getElementById(id).getContext("2d");
    ctx.filledRectangle(596, 0, 660, 400, "#ddd", "#ddd", 0);
}

function m_times_v(m, v) {
    // return the product of the matrix m with the vector v
    var answer = Array(m.length);
    var sum;
    for (var j=0; j < m.length; j++) {
	answer[j] = 0;
	for (var k=0; k < v.length; k++) {answer[j] += m[j][k]*v[k];}
    }
    return answer;
}

function xs(x) {
    // returns x scaled to canvas
    return 270+x*80;
}

function ys(y) {
    // returns y scaled to canvas
    return 210-y*80;
}

function plot_partial_image(elt) {
    var ctx = document.getElementById(elt).getContext("2d");
    ctx.beginPath();
    ctx.arc(xs(center_vec[0]), ys(center_vec[1]), xs(radius)-xs(0),
	    -radius_angle-0.9, -radius_angle+0.7);
    ctx.strokeStyle = IMAGE_COLOR;
    ctx.lineWidth = 1;
    ctx.stroke();
}


function plot_longer_vec(elt) {
    var ctx = document.getElementById(elt).getContext("2d");
    var angle = radius_angle+0.6;
    var longer_vec = [center_vec[0]+radius*Math.cos(angle), center_vec[1]+radius*Math.sin(angle)];
    ctx.arrow(xs(0), ys(0), xs(longer_vec[0]), ys(longer_vec[1]), IMAGE_COLOR, 2);
}
    
function plot_axes(elt) {
    // Plot the axes 
    var ctx = document.getElementById(elt).getContext("2d");
    ctx.arrow(xs(-2), ys(0), xs(2), ys(0), AXIS_COLOR, 0.5);
    ctx.arrow(xs(0), ys(-1.55), xs(0), ys(2), AXIS_COLOR, 0.5);
}

function rotated_point(point, theta) {
    return {"x": Math.cos(theta)*point.x-Math.sin(theta)*point.y,
	    "y": Math.sin(theta)*point.x+Math.cos(theta)*point.y}
}

function rescaled_point(point, xscale, yscale) {
    return {"x": xscale*point.x, "y": yscale*point.y}
}

function transformed_point(point, theta1, xscale, yscale, theta2) {
    return rotated_point(
	rescaled_point(rotated_point(point, theta1), xscale, yscale),
	theta2)
}

function plot_square(elt, theta1, xscale, yscale, theta2) {
    var ctx = document.getElementById(elt).getContext("2d");
    var point_tr = {"x": 0.8, "y": 0.8};
    var point_br = {"x": 0.8, "y": -0.8};
    var point_bl = {"x": -0.8, "y": -0.8};
    var point_tl = {"x": -0.8, "y": 0.8};
    var point_diag_1 = {"x": 0.27, "y": 0.8};
    var point_diag_2 = {"x": -0.8, "y": -0.27};
    var point_diag_3 = {"x": 0.8, "y": 0.27};
    var point_diag_4 = {"x": -0.27, "y": -0.8};
    var transformed_point_tr = transformed_point(
	point_tr, theta1, xscale, yscale, theta2)
    var transformed_point_br = transformed_point(
	point_br, theta1, xscale, yscale, theta2)
    var transformed_point_bl = transformed_point(
	point_bl, theta1, xscale, yscale, theta2)
    var transformed_point_tl = transformed_point(
	point_tl, theta1, xscale, yscale, theta2)
    var transformed_point_diag_1 = transformed_point(
	point_diag_1, theta1, xscale, yscale, theta2);
    var transformed_point_diag_2 = transformed_point(
	point_diag_2, theta1, xscale, yscale, theta2);
    var transformed_point_diag_3 = transformed_point(
	point_diag_3, theta1, xscale, yscale, theta2);
    var transformed_point_diag_4 = transformed_point(
	point_diag_4, theta1, xscale, yscale, theta2);
    // top right to bottom right
    ctx.line(xs(transformed_point_tr.x), ys(transformed_point_tr.y),
	     xs(transformed_point_br.x), ys(transformed_point_br.y),
	    "#ccc");
    // bottom right to bottom left
    ctx.line(xs(transformed_point_br.x), ys(transformed_point_br.y),
	     xs(transformed_point_bl.x), ys(transformed_point_bl.y),
	    "#ccc");
    // bottom left to top left
    ctx.line(xs(transformed_point_bl.x), ys(transformed_point_bl.y),
	     xs(transformed_point_tl.x), ys(transformed_point_tl.y),
	    "#ccc");
    // top left to top right
    ctx.line(xs(transformed_point_tl.x), ys(transformed_point_tl.y),
	     xs(transformed_point_tr.x), ys(transformed_point_tr.y),
	    "#ccc");
    // top diagonal line
    ctx.line(xs(transformed_point_diag_1.x), ys(transformed_point_diag_1.y),
	     xs(transformed_point_diag_2.x), ys(transformed_point_diag_2.y),
	    "#ccc");
    // lower diagonal line
    ctx.line(xs(transformed_point_diag_3.x), ys(transformed_point_diag_3.y),
	     xs(transformed_point_diag_4.x), ys(transformed_point_diag_4.y),
	    "#ccc");
}
    

function plot_unit_vectors(elt, theta) {
    // plot the unit vectors, rotated by an angle theta
    var ctx = document.getElementById(elt).getContext("2d");
    ctx.arrow(xs(0), ys(0), xs(Math.cos(theta)), ys(Math.sin(theta)),
	      "#2A6EA6", 2);
    ctx.arrow(xs(0), ys(0), xs(-Math.sin(theta)), ys(Math.cos(theta)),
	      "#2A6EA6", 2);
    ctx.line(xs(0.1*Math.cos(theta)), ys(0.1*Math.sin(theta)),
	     xs(0.1*(Math.cos(theta)-Math.sin(theta))),
	     ys(0.1*(Math.sin(theta)+Math.cos(theta))),
	     "#2A6EA6");
    ctx.line(xs(-0.1*Math.sin(theta)), ys(0.1*Math.cos(theta)),
	     xs(0.1*(Math.cos(theta)-Math.sin(theta))),
	     ys(0.1*(Math.sin(theta)+Math.cos(theta))),
	     "#2A6EA6");
}

function plot_rescaled_axes(elt, xscale, yscale) {
    var ctx = document.getElementById(elt).getContext("2d");
    ctx.arrow(xs(0), ys(0), xs(xscale), ys(0), "#2A6EA6", 2);
    ctx.arrow(xs(0), ys(0), xs(0), ys(yscale), "#2A6EA6", 2);
}

function plot_image(elt, line_width) {
    line_width = selfOrDefault(line_width, 2);
    var ctx = document.getElementById(elt).getContext("2d");
    var theta;
    ctx.beginPath();
    var start_point = m_times_v(M, [1, 0]);
    ctx.moveTo(xs(start_point[0]), ys(start_point[1]));
    for (var j=0; j < 60; j++) {
	theta = j*2*Math.PI/60;
	var next_point = m_times_v(M, [Math.cos(theta), Math.sin(theta)]);
	ctx.lineTo(xs(next_point[0]), ys(next_point[1]));
    }
    ctx.closePath();
    ctx.lineWidth = line_width;
    ctx.strokeStyle = IMAGE_COLOR;
    ctx.stroke();
}

function length(v) {
    return Math.sqrt(v[0]*v[0]+v[1]*v[1])
}

function vector_image_partial(tangent, p, theta) {
    var tangent_perp = [tangent[1], -tangent[0]];
    var normalized_tangent_perp = [tangent_perp[0]/length(tangent_perp),
				   tangent_perp[1]/length(tangent_perp)];
    var rescaled_tangent_perp = [normalized_tangent_perp[0]*length(Ms_vec),
				 normalized_tangent_perp[1]*length(Ms_vec)];
    var control = [0.5*p*rescaled_tangent_perp[0]+(1-0.5*p)*Ms_vec[0],
		   0.5*p*rescaled_tangent_perp[1]+(1-0.5*p)*Ms_vec[1]];
    return [Ms_vec[0]+theta*tangent[0]-(1-p/2)*0.5*theta*theta*control[0],
	    Ms_vec[1]+theta*tangent[1]-(1-p/2)*0.5*theta*theta*control[1]];
}
    
function plot_image_partial(elt, tangent, p) {
    // p is the interpolation parameter, ranging from 0 (at the start)
    // to 1 at the end.
    //
    // The method of interpolation was found by trial and error, and
    // so is directly applicable in all situations; finding a
    // generally applicable approach is an interesting problem.
    var range = 0.7;
    var ctx = document.getElementById(elt).getContext("2d");
    ctx.beginPath();
    var start_point = vector_image_partial(tangent, p, -range);
    ctx.moveTo(xs(start_point[0]), ys(start_point[1]));
    for (var theta=-range; theta <= range; theta += 0.01) {
	ctx.lineTo(xs(vector_image_partial(tangent, p, theta)[0]),
		   ys(vector_image_partial(tangent, p, theta)[1]));
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = IMAGE_COLOR;
    ctx.stroke();
}

function plot_st_rangle(elt) {
    // plot the right angle between s and t
    var ctx = document.getElementById(elt).getContext("2d");
    var scale = 0.2;
    var s_short_vec = [scale*Math.cos(phi), scale*Math.sin(phi)];
    var t_short_vec = [-scale*Math.sin(phi), scale*Math.cos(phi)];
    var mid_vec = [scale*(Math.cos(phi)-Math.sin(phi)), scale*(Math.sin(phi)+Math.cos(phi))];
    ctx.line(xs(s_short_vec[0]), ys(s_short_vec[1]), xs(mid_vec[0]), ys(mid_vec[1]), UNIT_COLOR, 1.0);
    ctx.line(xs(t_short_vec[0]), ys(t_short_vec[1]), xs(mid_vec[0]), ys(mid_vec[1]), UNIT_COLOR, 1.0);
}
