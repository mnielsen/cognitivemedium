// memory.js: Graphs of effects associated to memory
//
// By Michael Nielsen, December 2016
//
// MIT License
//
// Written to target Chrome (~55) on OS X.


(function() {
    var AxisColor = "#555";
    forgetting();
    function forgetting() {
	// assumes the canvas element is 600 by 400
	var ctx = document.getElementById("forgetting")
		.getContext("2d");
	function xScale(x) {// want range 0 to 5.2
	    return 50+100*x;
	}
	function yScale(y) {// want range 0 to 1.2
	    return 360-y*240;
	}
	line(ctx, xScale(0), yScale(0), xScale(5.2), yScale(0), AxisColor); // x axis
	line(ctx, xScale(0), yScale(0), xScale(0), yScale(1.1), AxisColor); // y axis
	line(ctx, xScale(-0.05), yScale(1), xScale(0), yScale(1), AxisColor); // check mark
	ctx.font = "21px Georgia";
	ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	ctx.fillText("1", xScale(-0.15), yScale(0.98));
	ctx.fillText("probability of recall", xScale(1.5), yScale(1.1));
	ctx.fillText("time", xScale(4.78), yScale(-0.1));
	//ctx.stroke = "#aaf";
	ctx.beginPath();
	ctx.moveTo(xScale(0), yScale(1));
	function curve0(t) {
	    return Math.pow(2, -t/1.2);
	}
	for (var t=0; t < 5; t += 0.1) {
	    ctx.lineTo(xScale(t), yScale(curve0(t)));
	}
	ctx.stroke();
    }
    function line(ctx, x1, y1, x2, y2, color) {
	if (color) {ctx.strokeStyle = color};
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
    }

})();

