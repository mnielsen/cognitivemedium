// memory.js: Graphs of effects associated to memory
//
// By Michael Nielsen, December 2016
//
// MIT License
//
// Written to target Chrome (~55) on OS X.


(function() {
    "use strict;"
    var AxisColor = "#555";
    forgetting();
    forgettingRepeated();
    function forgetting() {
	// assumes the canvas element is 600 by 400
	var ctx = document.getElementById("forgetting")
		.getContext("2d");
	function xScale(x) {// want range 0 to 5.4
	    return 40+100*x;
	}
	function yScale(y) {// want range 0 to 1.2
	    return 370-y*300;
	}
	forgettingCurveAxesAndLabels(ctx, xScale, yScale);
	// plot the forgetting curve
	ctx.beginPath();
	ctx.moveTo(xScale(0), yScale(1));
	var h = 1.4; // half-life
	function curve0(t) {
	    return Math.pow(2, -t/1.4);
	}
	for (var t=0; t < 5; t += 0.1) {
	    ctx.lineTo(xScale(t), yScale(curve0(t)));
	}
	ctx.stroke();
	
    }
    function forgettingRepeated() {
	// assumes the canvas element is 600 by 400
	var ctx = document.getElementById("forgetting_repeated")
		.getContext("2d");
	function xScale(x) {// want range 0 to 5.4
	    return 40+100*x;
	}
	function yScale(y) {// want range 0 to 1.2
	    return 370-y*300;
	}
	forgettingCurveAxesAndLabels(ctx, xScale, yScale);
	// plot the forgetting curve
	ctx.beginPath();
	ctx.moveTo(xScale(0), yScale(1));
	function curve0(t) {
	    if (t < 1.4) {
		return Math.pow(2, -t/1.4);
	    } else if (t < 3.9) {
		return Math.pow(2, -(t-1.4)/3.2);
	    } else {
		return Math.pow(2, -(t-3.9)/7.5);
	    }
	}
	for (var t=0; t < 5.4; t += 0.02) {
	    ctx.lineTo(xScale(t), yScale(curve0(t)));
	}
	ctx.stroke();
    }
    
    function forgettingCurveAxesAndLabels(ctx, xScale, yScale) {
	line(ctx, xScale(0), yScale(0), xScale(5.4), yScale(0), AxisColor); // x axis
	line(ctx, xScale(0), yScale(0), xScale(0), yScale(1.1), AxisColor); // y axis
	ctx.font = "18px Georgia";
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillText("1", xScale(-0.15), yScale(0.98)); // label for check mark on y axis
	line(ctx, xScale(-0.05), yScale(1), xScale(0), yScale(1), AxisColor); // check mark on y axis
	for (var t=1; t < 5; t++) {
	    line(ctx, xScale(t), yScale(0), xScale(t), yScale(-0.02), AxisColor); // day check marks
	    ctx.fillText(t, xScale(t-0.05), yScale(-0.08));
	}
	ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	ctx.fillText("time (days)", xScale(4.5), yScale(-0.08));
	ctx.fillText("probability of later recall", xScale(1.5), yScale(1.05));
    };
    function line(ctx, x1, y1, x2, y2, color) {
	if (color) {ctx.strokeStyle = color};
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
    }

})();

