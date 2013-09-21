// JavaScript Document

requestAnimFrame = (
		function() {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) {
				window.setTimeout(callback, 1000/60);
			};
		})();
		
function el(s)
{
	return document.getElementById(s);
}

function initialize(){
	

	// Init Canvas
	var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	// Create Circle
	ctx.beginPath();
	ctx.arc(300,300,50,0,2*Math.PI);
	ctx.stroke();
	
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	 
	if (document.attachEvent) //if IE (and Opera depending on user setting)
		document.attachEvent("on"+mousewheelevt, createUAV(ctx, 100,100))
	else if (document.addEventListener) //WC3 browsers
		document.addEventListener(mousewheelevt, createUAV(ctx, 100,100), false)
}
		
	
// Create UAV
function createUAV(ctx, x, y)
{
	ctx.moveTo(x,y);
	ctx.lineTo(x-50,y+100);
	ctx.lineTo(x+50,y+100);
	ctx.lineTo(x,y);
	ctx.stroke();
	
	// Create UAV Text
	ctx.font="30px Arial";
	ctx.fillText("UAV", x-50,y+140);
}
		
	