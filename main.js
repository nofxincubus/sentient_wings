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
	
	map = L.map("map").setView([37.3868, -122.0678], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/9e8f098a2ebf41158e0423a8b807ec95/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);

	map.on('click', onMapClick);

	uavNumberOne = new UAV(37.3868, -122.0678, 100);
	//Initialize with rotate
	var MARKER = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	uavNumberOne.setLeafletMarker(MARKER);

	onEF();

}

function onEF()
{
	window.requestAnimFrame(onEF);
	uavNumberOne.update();
}

function onMapClick(e){
	uavNumberOne.setWaypoint(e.latlng);
	
	MARKER = L.marker(e.latlng).addTo(map);

}
