// This is a quick hack.  I may rewrite it in a future iteration.

(function() {
    // Buffer at the bottom of the visible window.  Elements from this
    // buffer on will be greyed out.  It's set to 10% of window
    // height.
    var bottomBuffer = Math.floor(0.1*window.innerHeight);

    // Grey out elements after the window is loaded
    window.onload = function() {greyOut();}

    function greyOut() {
	// grey out elements from bottomBuffer of the visible window
	// onward
	var elts = document.body.children;
	// find the index of the last element which should be opaque
	var lastOpaqueElement;
	for (var j = 0; j < elts.length; j++) {
	    if (isElementOpaque(elts[j])) {lastOpaqueElement = j;}
	}
	for (var j = 0; j <= lastOpaqueElement; j++) {
	    elts[j].style.opacity = 1.0;
	}
	for (var j = lastOpaqueElement+1; j < elts.length; j++) {
	    elts[j].style.opacity = 0.2;
	}
    }

    function isElementOpaque (elt) {
	// Checks whether elt should be opaque, applying a cutoff
	// bottomBuffer pixels from the bottom of the viewport.  Note
	// that elements near the bottom of the document are also made opaque
	return (elt.getBoundingClientRect().bottom <= window.innerHeight-bottomBuffer  ||
	       elt.getBoundingClientRect().bottom > document.body-20);
    }

    function getOpaqueElements() {
	// Return an array containing all the opaque elements in the document
	return elts = Array.prototype.slice
	    .call(document.body.children)
	    .filter(isElementOpaque);
    }

    function scrollUp() {
	// scroll the visible area up
	var firstElement = getFirstVisibleElement();
	if (firstElement) {
	    var newFirstElement = previousVerticalElement(firstElement);
	    if (newFirstElement) {
		var deltaY = newFirstElement.getBoundingClientRect().top-20;
		smoothScroll(deltaY);
	    }
	}
    }

    function scrollDown() {
	// scroll the visible area down
	var opaqueElements = getOpaqueElements();
	var lastElement = opaqueElements[opaqueElements.length-1];
	console.log(lastElement);
	if (lastElement) {
	    var newLastElement = nextVerticalElement(lastElement);
	    if (newLastElement) {
		var deltaY = newLastElement.getBoundingClientRect().bottom-
		    (window.innerHeight-bottomBuffer)+20;
		console.log(deltaY);
		smoothScroll(deltaY);
		console.log(0);
	    }
	}
    }

    function getFirstVisibleElement() {
	var elts = document.body.children;
	var elt;
	for (var j = 0; j < elts.length; j++) {
	    if (elts[j].getBoundingClientRect().top >= 0) {elt = elts[j]; break;}
	}
	console.log(elt);
	return elt;
    }

    function nextVerticalElement(elt) {
	var nextElt = elt;
	do {nextElt = nextElt.nextElementSibling;}
	while (nextElt &&
	       nextElt.getBoundingClientRect().bottom <= elt.getBoundingClientRect().bottom);
	return nextElt;
    }

    function previousVerticalElement(elt) {
	var prevElt = elt;
	do {prevElt = prevElt.previousElementSibling;}
	while (prevElt &&
	       prevElt.getBoundingClientRect().top >= elt.getBoundingClientRect().top);
	return prevElt;
    }

    function smoothScroll(delta) {
	var sign = Math.sign(delta);
	var delta = Math.ceil(Math.abs(delta));
	var counter = 0;
	function scroll() {
	    if (counter < delta) {
		var diff = (counter < delta-20) ? 20 : delta-counter;
		window.scrollTo(0, window.scrollY+sign*diff);
		counter += diff;
		window.requestAnimationFrame(scroll)
	    };
	}
	scroll();
    }

    document.onkeypress = function(event) {
	// Catch presses of "p" and "n" and scroll up or down, as appropriate
	if (event.charCode === 110) {scrollDown();}
	if (event.charCode === 112) {scrollUp();}
    }

    // Regularly poll to figure out if we've scrolled, and if so redo
    // the greying out.  Polls every 250 ms to figure out if a scroll
    // event has occurred.
    //
    // Based on: http://ejohn.org/blog/learning-from-twitter/
    //
    // Flag to tell us if a scroll event has happened
    var recentScroll = false;
    window.onscroll = function() {recentScroll = true;}
    window.setInterval(function() {
	if (recentScroll) {
	    recentScroll = false;
	    greyOut();
	}
    }, 250);	
}).call(this);
