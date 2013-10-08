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

var  greenIcon = L.icon({
    iconUrl: './images/drone-tiny.png',

    iconSize:     [75, 50], // size of the icon
    iconAnchor:   [37, 25], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function initialize(){
	debugForZDiv = el('yayayay');

	var para=document.createElement("p");
	var node=document.createTextNode("WHAT THE FUCKKKKK");
	para.appendChild(node);

	
	debugForZDiv.appendChild(para);

	var map = L.map("map").setView([51.505, -0.09], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/9e8f098a2ebf41158e0423a8b807ec95/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);

	//map.on('click', onMapClick);

	uavNumberOne = new UAV(51.5, -0.09, 100);
	var MARKER = L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
	uavNumberOne.setLeafletMarker(MARKER);

	onEF();

}

function onEF()
{
	window.requestAnimFrame(onEF);
	uavNumberOne.update();
}

function onMapClick(){
	var latlon = x.getLatLng();
	var newLatLon = new L.LatLng(latlon.lat + 0.00001, latlon.lng + 0.00001);
	x.setLatLng( newLatLon);
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
		
	