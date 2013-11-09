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

var uavIconRed = L.icon({
	    iconUrl: './images/drone-tiny-red.png',

	    iconSize:     [50, 20], // size of the icon
	    iconAnchor:   [25, 10], // point of the icon which will correspond to marker's location
	    shadowAnchor: [25, 10],  // the same for the shadow
	    popupAnchor:  [25, 10] // point from which the popup should open relative to the iconAnchor
	});

var uavIconWhite = L.icon({
	    iconUrl: './images/drone-tiny-white.png',

	    iconSize:     [50, 20], // size of the icon
	    iconAnchor:   [25, 10], // point of the icon which will correspond to marker's location
	    shadowAnchor: [25, 10],  // the same for the shadow
	    popupAnchor:  [25, 10] // point from which the popup should open relative to the iconAnchor
	});

var uavIconBlue = L.icon({
	    iconUrl: './images/drone-tiny-blue.png',

	    iconSize:     [50, 20], // size of the icon
	    iconAnchor:   [25, 10], // point of the icon which will correspond to marker's location
	    shadowAnchor: [25, 10],  // the same for the shadow
	    popupAnchor:  [25, 10] // point from which the popup should open relative to the iconAnchor
	});

var  greenIcon = L.icon({
    iconUrl: './images/home.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 10],  // the same for the shadow
    popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
});

function initialize(){

	button = document.getElementById("go_home_button");

	map = L.map("map").setView([37.3868, -122.0678], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/9e8f098a2ebf41158e0423a8b807ec95/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);

	//map.on('click', onMapClick);

	var initialUavPoint = new L.LatLng(37.3468, -122.0000);

	uavList = [];
	for (i = 0;i < 9;i ++){
		uavList[i] = new UAV(initialUavPoint);
	}

	waypoint = [];
	waypoint[0] = new L.LatLng(37.400, -122.075);
	waypoint[1] = new L.LatLng(37.400, -122.095);
	waypoint[2] = new L.LatLng(37.400, -122.055);
	

	waypoint[3] = new L.LatLng(37.420, -122.055);
	waypoint[4] = new L.LatLng(37.420, -122.075);
	waypoint[5] = new L.LatLng(37.420, -122.095);

	waypoint[6] = new L.LatLng(37.440, -122.055);
	waypoint[7] = new L.LatLng(37.440, -122.075);
	waypoint[8] = new L.LatLng(37.440, -122.095);
	

	L.marker(new L.LatLng(37.468864,-122.204361),{icon: greenIcon, zIndexOffset:-100}).addTo(map);
	

	for (i = 0;i < 9;i ++){
		L.marker(waypoint[i],{zIndexOffset:-100}).addTo(map);
	}

	for (i = 0;i < 3;i ++){
		uavList[i].setWaypoint(waypoint[i]);
		uavList[i].setLeafletMarker(L.marker(initialUavPoint, {icon: uavIconBlue,iconAngle: 0, zIndexOffset:100}).addTo(map));
	}
	for (i = 3;i < 6;i ++){
		uavList[i].setWaypoint(waypoint[i]);
		uavList[i].setLeafletMarker(L.marker(initialUavPoint, {icon: uavIconWhite,iconAngle: 0, zIndexOffset:100}).addTo(map));
	}
	for (i = 6;i < 9;i ++){
		uavList[i].setWaypoint(waypoint[i]);
		uavList[i].setLeafletMarker(L.marker(initialUavPoint, {icon: uavIconRed,iconAngle: 0, zIndexOffset:100}).addTo(map));
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

function goHomeFunction(){
	for (i = 0;i < 9;i ++){
		uavList[i].goToFinal();
	}
}
