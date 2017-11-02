// Adjust the locations of the marginnotes so they're placed in the
// right spot, and not too wide

var marginNotes = [].slice.call(document.getElementsByClassName("marginnote"));
var bodyStyle = getComputedStyle(document.body);


resize = function() {
    console.log("Hi");
    var bodyRight = parseInt(bodyStyle["margin-left"].replace("px", ""))+
	parseInt(bodyStyle.width.replace("px", ""));
    var possibleWidth = innerWidth-bodyRight-40-20;
    marginNotes.forEach(function(note) {
	note.style.left = (bodyRight+40)+"px";
	note.style.width = Math.min(300, possibleWidth)+"px";
    });
}

window.onresize = resize;
resize();
