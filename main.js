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

    iconSize:     [67, 67], // size of the icon
    iconAnchor:   [33, 33], // point of the icon which will correspond to marker's location
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

	var initialUavPoint = new L.LatLng(37.3468, -122.0000)

	uavList = [];
	for (i = 0;i < 9;i ++){
		uavList[i] = new UAV(initialUavPoint);
	}

	waypoint = [];
	waypoint[0] = new L.LatLng(37.400, -122.075);
	waypoint[1] = new L.LatLng(37.400, -122.095);
	waypoint[2] = new L.LatLng(37.420, -122.055);
	waypoint[3] = new L.LatLng(37.420, -122.075);
	waypoint[4] = new L.LatLng(37.420, -122.095);
	waypoint[5] = new L.LatLng(37.440, -122.055);
	waypoint[6] = new L.LatLng(37.440, -122.075);
	waypoint[7] = new L.LatLng(37.440, -122.095);
	waypoint[8] = new L.LatLng(37.400, -122.055);

	for (i = 0;i < 9;i ++){
		uavList[i].setWaypoint(waypoint[i]);
		uavList[i].setLeafletMarker(L.marker(initialUavPoint, {icon: greenIcon,iconAngle: 0}).addTo(map));
		L.marker(waypoint[i]).addTo(map);
	}

	onEF();
}

function onEF()
{
	window.requestAnimFrame(onEF);
	for (i = 0;i < 9;i ++){
		uavList[i].update();
	}
}

function onMapClick(e){
	//uavNumberOne.setWaypoint(e.latlng);
}
