// canvas.js: Helper functions to make working with the canvas API easier

CanvasRenderingContext2D.prototype.clear = function() {
    // Blank the canvas
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

CanvasRenderingContext2D.prototype.line = function(x1, y1, x2, y2, color) {
    if (color) {this.strokeStyle = color};
    this.beginPath();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
    this.stroke();
}

CanvasRenderingContext2D.prototype.ball = function(x, y, r, color) {
    this.beginPath();
    this.arc(x, y, r, 0, 2*Math.PI, false);
    if (color) {this.fillStyle = color};
    this.fill();
}

CanvasRenderingContext2D.prototype.arrow = function(x0, y0, x1, y1, color, open) {
    // If open is truthy then make it an open arrowhead
    this.line(x0, y0, x1, y1, color);
    // compute the scaled difference.  Note that dx is minus the
    // difference, since that's the direction we want
    var dx = x0-x1, dy = y0-y1;
    var norm = Math.sqrt(dx*dx+dy*dy);
    var scaledDx = 15*dx/norm, scaledDy = 15*dy/norm;
    // Now rotate the scaled difference, to give us the vectors
    // associated to the arrow prongs
    var rotatedDelta1 = rotation(Math.PI/10, {x: scaledDx, y: scaledDy});
    var rotatedDelta2 = rotation(-Math.PI/10, {x: scaledDx, y: scaledDy});
    if (open) {
	this.line(x1, y1, x1+rotatedDelta1.x, y1+rotatedDelta1.y, color);
	this.line(x1, y1, x1+rotatedDelta2.x, y1+rotatedDelta2.y, color);
    } else {
	this.fillStyle = color;
	this.beginPath();
	this.moveTo(x1, y1);
	this.lineTo(x1+rotatedDelta1.x, y1+rotatedDelta1.y, color);
	this.lineTo(x1+rotatedDelta2.x, y1+rotatedDelta2.y, color);
	this.fill();
    }
}

function rotation(theta, vec) {
    return {x: Math.cos(theta)*vec.x - Math.sin(theta)*vec.y,
	    y: Math.sin(theta)*vec.x + Math.cos(theta)*vec.y}
}

