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

blueUavs = [];
redUavs = [];
whiteUavs = [];

blueSelected = false;
whiteSelected = false;
redSelected = false;
allSelected = false;

function initialize(){

	goHomeButton = document.getElementById("go_home_button");
	launchButton = document.getElementById("launch_button");
	redButton = document.getElementById("red_button");
	whiteButton = document.getElementById("white_button");
	blueButton = document.getElementById("blue_button");
	allButton = document.getElementById("all_button");

	map = L.map("map").setView([37.468864,-122.204361], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/9e8f098a2ebf41158e0423a8b807ec95/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);

	map.on('click', onMapClick);

	var initialUavPoint = new L.LatLng(37.468864,-122.204361);

	for (i = 0;i < 3;i ++){
		blueUavs[i] = new UAV(initialUavPoint, map);
	}

	for (i = 0;i < 3;i ++){
		redUavs[i] = new UAV(initialUavPoint, map);
	}

	for (i = 0;i < 3;i ++){
		whiteUavs[i] = new UAV(initialUavPoint, map);
	}

	L.marker(new L.LatLng(37.468864,-122.204361),{icon: greenIcon, zIndexOffset:-100}).addTo(map);

	/*
	for (i = 0;i < 9;i ++){
		L.marker(waypoint[i],{zIndexOffset:-100}).addTo(map);
	}
	*/

	for (i = 0;i < 3;i ++){
		blueUavs[i].setLeafletMarker(L.marker(initialUavPoint, {icon: uavIconBlue,iconAngle: 0, zIndexOffset:100}).addTo(map));
		redUavs[i].setLeafletMarker(L.marker(initialUavPoint, {icon: uavIconRed,iconAngle: 0, zIndexOffset:100}).addTo(map));
		whiteUavs[i].setLeafletMarker(L.marker(initialUavPoint, {icon: uavIconWhite,iconAngle: 0, zIndexOffset:100}).addTo(map));
	}

	onEF();
}

function onMapClick(e){
	 var newWP = e.latlng;
	 if (allSelected){
		for (i = 0;i < 3;i ++){
			blueUavs[i].setWaypoint(newWP);
			whiteUavs[i].setWaypoint(newWP);
			redUavs[i].setWaypoint(newWP);
		}
	 } else if (blueSelected){
	 	for (i = 0;i < 3;i ++){
			blueUavs[i].setWaypoint(newWP);
		}
	 } else if (redSelected){
	 	for (i = 0;i < 3;i ++){
			redUavs[i].setWaypoint(newWP);
		}
	 } else if (whiteSelected){
	 	for (i = 0;i < 3;i ++){
			whiteUavs[i].setWaypoint(newWP);
		}
	 }
}

function onEF()
{
	window.requestAnimFrame(onEF);
	for (i = 0;i < 3;i ++){
		blueUavs[i].update();
		whiteUavs[i].update();
		redUavs[i].update();
	}
}

function launch(){
	for (i = 0;i < 3;i ++){
		blueUavs[i].goToFinal();
		whiteUavs[i].goToFinal();
		redUavs[i].goToFinal();
	}
}

function goHome(){
	for (i = 0;i < 3;i ++){
		blueUavs[i].goToFinal();
		whiteUavs[i].goToFinal();
		redUavs[i].goToFinal();
	}
}

function selectBlue(){
	if (blueSelected){
		blueSelected = false;
	} else {
		blueSelected = true;
		redSelected = false;
		whiteSelected = false;
	}
	updateButtons();
}

function selectRed(){
	if (redSelected){
		redSelected = false;
	} else {
		blueSelected = false;
		redSelected = true;
		whiteSelected = false;
	}
	updateButtons();
}

function selectWhite(){
	if (whiteSelected){
		whiteSelected = false;
	} else {
		blueSelected = false;
		redSelected = false;
		whiteSelected = true;
	}
	updateButtons();
}

function selectAll(){
	if (blueSelected && redSelected && whiteSelected){
		blueSelected = false;
		redSelected = false;
		whiteSelected = false;
	} else {
		blueSelected = true;
		redSelected = true;
		whiteSelected = true;
	}
	updateButtons();
}

function updateButtons(){
	if (blueSelected && redSelected && whiteSelected){
		allButton.style.background="#666666";
		blueButton.style.background="#666666";
		redButton.style.background="#666666";
		whiteButton.style.background="#666666";
		return;
	} else {
		allButton.style.background="#000000";
		blueButton.style.background="#000000";
		redButton.style.background="#000000";
		whiteButton.style.background="#000000";
	}

	if (blueSelected){
		blueButton.style.background="#666666";
	} else {
		blueButton.style.background="#000000";
	}

	if (redSelected){
		redButton.style.background="#666666";
	} else {
		redButton.style.background="#000000";
	}

	if (whiteSelected){
		whiteButton.style.background="#666666";
	} else {
		whiteButton.style.background="#000000";
	}
}


