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

	uavNumber1 = new UAV(37.3868, -122.0678, 100);
	uavNumber2 = new UAV(37.3868, -122.0678, 100);
	uavNumber3 = new UAV(37.3868, -122.0678, 100);
	uavNumber4 = new UAV(37.3868, -122.0678, 100);
	uavNumber5 = new UAV(37.3868, -122.0678, 100);
	uavNumber6 = new UAV(37.3868, -122.0678, 100);
	uavNumber7 = new UAV(37.3868, -122.0678, 100);
	uavNumber8 = new UAV(37.3868, -122.0678, 100);
	uavNumber9 = new UAV(37.3868, -122.0678, 100);

	uavNumber1.setWaypoint(new L.LatLng(37.390, -122.070));
	uavNumber2.setWaypoint(new L.LatLng(37.390, -122.075));
	uavNumber3.setWaypoint(new L.LatLng(37.395, -122.065));
	uavNumber4.setWaypoint(new L.LatLng(37.395, -122.070));
	uavNumber5.setWaypoint(new L.LatLng(37.395, -122.075));
	uavNumber6.setWaypoint(new L.LatLng(37.400, -122.065));
	uavNumber7.setWaypoint(new L.LatLng(37.400, -122.070));
	uavNumber8.setWaypoint(new L.LatLng(37.400, -122.075));
	uavNumber9.setWaypoint(new L.LatLng(37.390, -122.065));

	//Initialize with rotate
	var MARKER1 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER2 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER3 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER4 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER5 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER6 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER7 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER8 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);
	var MARKER9 = L.marker([37.3868, -122.0678], {icon: greenIcon,iconAngle: 0}).addTo(map);

	uavNumber1.setLeafletMarker(MARKER1);
	uavNumber2.setLeafletMarker(MARKER2);
	uavNumber3.setLeafletMarker(MARKER3);
	uavNumber4.setLeafletMarker(MARKER4);
	uavNumber5.setLeafletMarker(MARKER5);
	uavNumber6.setLeafletMarker(MARKER6);
	uavNumber7.setLeafletMarker(MARKER7);
	uavNumber8.setLeafletMarker(MARKER8);
	uavNumber9.setLeafletMarker(MARKER9);

	var MARK1 = L.marker([37.390,-122.070]).addTo(map);
	var MARK2 = L.marker([37.390,-122.075]).addTo(map);
	var MARK3 = L.marker([37.395,-122.065]).addTo(map);
	var MARK4 = L.marker([37.395,-122.070]).addTo(map);
	var MARK5= L.marker([37.395,-122.075]).addTo(map);
	var MARK6 = L.marker([37.400,-122.065]).addTo(map);
	var MARK7 = L.marker([37.400,-122.070]).addTo(map);
	var MARK8 = L.marker([37.400,-122.075]).addTo(map);
	var MARK9 = L.marker([37.390,-122.065]).addTo(map);

	onEF();
}

function onEF()
{
	window.requestAnimFrame(onEF);
	uavNumber1.update();
	uavNumber2.update();
	uavNumber3.update();
	uavNumber4.update();
	uavNumber5.update();
	uavNumber6.update();
	uavNumber7.update();
	uavNumber8.update();
	uavNumber9.update();
}

function onMapClick(e){
	//uavNumberOne.setWaypoint(e.latlng);
}
