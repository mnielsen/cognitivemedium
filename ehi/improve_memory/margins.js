// margins.js: A quick hack to ensure correct spacing if margin notes
// get squished together.  Far from thoroughly tested, but seems to
// work better than nothing.  Occasionally fails for reasons I don't
// understand when the window is resized (the elements sometimes get
// confused about where they should be).
//
// Written by Michael Nielsen, for Chrome 55 on OS X.  MIT License.

function spaceMargins() {
    var eltAbove, eltBelow, eltTop, eltHeight, nextTop;
    var margins = document.getElementsByClassName("marginnote");
    for (var j=0; j < margins.length-1; j++) {
	eltAbove = margins[j];
        eltBelow = margins[j+1];
	eltTop = parseInt(getComputedStyle(eltAbove).top);
	eltHeight = parseInt(getComputedStyle(eltAbove).height);
	nextTop = parseInt(getComputedStyle(eltBelow).top);
	if (nextTop < eltTop+eltHeight+15) {
  	    eltBelow.style.top = (eltTop+eltHeight+15)+"px";
	}	    
    }
}

addEventListener("load", spaceMargins);
addEventListener("resize", spaceMargins);

