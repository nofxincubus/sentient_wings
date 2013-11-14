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
buttons = [];

// 0 = adhoc
// 1 = waypoint
// 2 = line
mode = 0;

waypointOffset = 0.035;
waypointOffset1 = 0.01;
waypointOffset2 = 0.005;
waypointOffset3 = 0.009;

function initialize(){

	//Button initialization

	buttons[0] = new SelectableButton(document.getElementById("red_button"));
	buttons[1] = new SelectableButton(document.getElementById("red_one_button"));
	buttons[2] = new SelectableButton(document.getElementById("red_two_button"));
	buttons[3] = new SelectableButton(document.getElementById("red_three_button"));
	buttons[4] = new SelectableButton(document.getElementById("white_button"));
	buttons[5] = new SelectableButton(document.getElementById("white_one_button"));
	buttons[6] = new SelectableButton(document.getElementById("white_two_button"));
	buttons[7] = new SelectableButton(document.getElementById("white_three_button"));
	buttons[8] = new SelectableButton(document.getElementById("blue_button"));
	buttons[9] = new SelectableButton(document.getElementById("blue_one_button"));
	buttons[10] = new SelectableButton(document.getElementById("blue_two_button"));
	buttons[11] = new SelectableButton(document.getElementById("blue_three_button"));
	buttons[12] = new SelectableButton(document.getElementById("all_button"));

	goHomeButton = new SelectableButton(document.getElementById("go_home_button"));
	launchButton = new SelectableButton(document.getElementById("launch_button"));
	adhocButton = new SelectableButton(document.getElementById("adhoc_button"));
	adhocButton.setSelect();
	waypointButton = new SelectableButton(document.getElementById("waypoint_button"));
	//lineButton = new SelectableButton(document.getElementById("line_button"));
	
	


	map = L.map("map").setView([37.468864,-122.204361], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/9e8f098a2ebf41158e0423a8b807ec95/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);

	map.on('click', onMapClick);

	for (i = 0;i < 3;i ++){
		if (i == 0){
			blueUavs[i] = new UAV(new L.LatLng(37.468864 + waypointOffset1,-122.204361), map);
			redUavs[i] = new UAV(new L.LatLng(37.468864 + waypointOffset1,-122.204361), map);
			whiteUavs[i] = new UAV(new L.LatLng(37.468864 + waypointOffset1,-122.204361), map);
		} else if (i == 1){
			blueUavs[i] = new UAV(new L.LatLng(37.468864 - waypointOffset2,-122.204361 - waypointOffset3), map);
			redUavs[i] = new UAV(new L.LatLng(37.468864 - waypointOffset2,-122.204361 - waypointOffset3), map);
			whiteUavs[i] = new UAV(new L.LatLng(37.468864 - waypointOffset2,-122.204361 - waypointOffset3), map);

		} else if (i == 2){
			blueUavs[i] = new UAV(new L.LatLng(37.468864 - waypointOffset2,-122.204361 + waypointOffset3), map);
			redUavs[i] = new UAV(new L.LatLng(37.468864 - waypointOffset2,-122.204361 + waypointOffset3), map);
			whiteUavs[i] = new UAV(new L.LatLng(37.468864 - waypointOffset2,-122.204361 + waypointOffset3), map);
		}
	}

	L.marker(new L.LatLng(37.468864,-122.204361),{icon: greenIcon, zIndexOffset:-100}).addTo(map);

	/*
	for (i = 0;i < 9;i ++){
		L.marker(waypoint[i],{zIndexOffset:-100}).addTo(map);
	}
	*/

	for (i = 0;i < 3;i ++){
		if (i == 0){
			blueUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 + 0.01,-122.204361), {icon: uavIconBlue,iconAngle: 0, zIndexOffset:100}).addTo(map));
			redUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 + 0.01,-122.204361), {icon: uavIconRed,iconAngle: 0, zIndexOffset:100}).addTo(map));
			whiteUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 + 0.01,-122.204361), {icon: uavIconWhite,iconAngle: 0, zIndexOffset:100}).addTo(map));
		} else if (i == 1){
			blueUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 - 0.005,-122.204361 - 0.005), {icon: uavIconBlue,iconAngle: 0, zIndexOffset:100}).addTo(map));
			redUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 - 0.005,-122.204361 - 0.005), {icon: uavIconRed,iconAngle: 0, zIndexOffset:100}).addTo(map));
			whiteUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 - 0.005,-122.204361 - 0.005), {icon: uavIconWhite,iconAngle: 0, zIndexOffset:100}).addTo(map));

		} else if (i == 2){
			blueUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 - 0.005,-122.204361 + 0.005), {icon: uavIconBlue,iconAngle: 0, zIndexOffset:100}).addTo(map));
			redUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 - 0.005,-122.204361 + 0.005), {icon: uavIconRed,iconAngle: 0, zIndexOffset:100}).addTo(map));
			whiteUavs[i].setLeafletMarker(L.marker(new L.LatLng(37.468864 - 0.005,-122.204361 + 0.005), {icon: uavIconWhite,iconAngle: 0, zIndexOffset:100}).addTo(map));
		}
		
	}

	onEF();
}

function selectAll(){
	for (j = 0;j < 13;j++){
		buttons[j].setSelect();
	}
}

function deselectAll(){
	for (x = 0;x < 13;x++){
		buttons[x].deselect();
	}
}

function clickWaypoint(newWP){
	if (buttons[12].isSelected()){
			for (i = 0;i < 3;i ++){
				if (i == 0){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat,newWP.lng));
				} else if (i == 1){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng ));
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat, newWP.lng ));
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat, newWP.lng ));
				} else if (i == 2){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng ));
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat, newWP.lng ));
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng ));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		}
		//red 
		else if (buttons[0].isSelected()){
			for (i = 0;i < 3;i ++){
				if (i == 0){
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset1,newWP.lng));
				} else if (i == 1){
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng ));
				} else if (i == 2){
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng ));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		}
		//white 
		else if (buttons[4].isSelected()){
			for (i = 0;i < 3;i ++){
				if (i == 0){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
				} else if (i == 1){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat,newWP.lng));
				} else if (i == 2){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat,newWP.lng));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		} 
		//blue
		else if (buttons[8].isSelected()){
			for (i = 0;i < 3;i ++){
		 		if (i == 0){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset1,newWP.lng));
				} else if (i == 1){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng - waypointOffset3));
				} else if (i == 2){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng + waypointOffset3));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		} else if (buttons[1].isSelected()){ 
			redUavs[0].setWaypoint(new L.LatLng(newWP.lat,newWP.lng));
		} else if (buttons[2].isSelected()){
			redUavs[1].setWaypoint(new L.LatLng(newWP.lat,newWP.lng));
		} else if (buttons[3].isSelected()){
			redUavs[2].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		} else if (buttons[5].isSelected()){
			whiteUavs[0].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		} else if (buttons[6].isSelected()){
			whiteUavs[1].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		} else if (buttons[7].isSelected()){
			whiteUavs[2].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		} else if (buttons[9].isSelected()){
			blueUavs[0].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		} else if (buttons[10].isSelected()){
			blueUavs[1].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		} else if (buttons[11].isSelected()){
			blueUavs[2].setWaypoint(new L.LatLng(newWP.lat ,newWP.lng));
		}
}

function clickAdhoc(newWP){
	if (buttons[12].isSelected()){
			for (i = 0;i < 3;i ++){
				if (i == 0){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset,newWP.lng));
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset,newWP.lng));
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat,newWP.lng));
				} else if (i == 1){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset,newWP.lng - waypointOffset));
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat,newWP.lng - waypointOffset));
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset,newWP.lng - waypointOffset));
				} else if (i == 2){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset,newWP.lng + waypointOffset));
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat,newWP.lng + waypointOffset));
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset,newWP.lng + waypointOffset));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		}
		//red 
		else if (buttons[0].isSelected()){
			for (i = 0;i < 3;i ++){
				if (i == 0){
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset1,newWP.lng));
				} else if (i == 1){
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng - waypointOffset3));
				} else if (i == 2){
					redUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng + waypointOffset3));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		}
		//white 
		else if (buttons[4].isSelected()){
			for (i = 0;i < 3;i ++){
				if (i == 0){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset1,newWP.lng));
				} else if (i == 1){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng - waypointOffset3));
				} else if (i == 2){
					whiteUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng + waypointOffset3));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		} 
		//blue
		else if (buttons[8].isSelected()){
			for (i = 0;i < 3;i ++){
		 		if (i == 0){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat + waypointOffset1,newWP.lng));
				} else if (i == 1){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng - waypointOffset3));
				} else if (i == 2){
					blueUavs[i].setWaypoint(new L.LatLng(newWP.lat - waypointOffset2,newWP.lng + waypointOffset3));
				}
			}
			L.marker(newWP,{zIndexOffset:-100}).addTo(map);
		}
}


function onMapClick(e){
	var newWP = e.latlng;
	//Adhoc mode
	if (mode == 0){
		clickAdhoc(newWP);
	} 
	//Waypoint mode
	else if (mode == 1){
		clickWaypoint(newWP);
	} else if (mode == 2){
		//Nothing for now
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

function adhoc(){
	unmode();
	adhocButton.setSelect();
	mode = 0;
}

function waypoint(){
	unmode();
	waypointButton.setSelect();
	mode = 1;
}

function line(){
	unmode();
	waypointButton.setSelect();
	mode = 2;
}

function selectBlue(){
	deselectAll();
	for (i = 8;i <= 11;i ++){
		buttons[i].setSelect();
	}
}

function selectBlueOne(){
	deselectAll();
	buttons[9].setSelect();
}

function selectBlueTwo(){
	deselectAll();
	buttons[10].setSelect();
}

function selectBlueThree(){
	deselectAll();
	buttons[11].setSelect();
}

function selectRed(){
	deselectAll();
	for (i = 0;i <= 3;i ++){
		buttons[i].setSelect();
	}
}

function selectRedOne(){
	deselectAll();
	buttons[1].setSelect();
}

function selectRedTwo(){
	deselectAll();
	buttons[2].setSelect();
}

function selectRedThree(){
	deselectAll();
	buttons[3].setSelect();
}

function selectWhite(){
	deselectAll();
	for (i = 4;i <= 7;i ++){
		buttons[i].setSelect();
	}
}
function selectWhiteOne(){
	deselectAll();
	buttons[5].setSelect();
}

function selectWhiteTwo(){
	deselectAll();
	buttons[6].setSelect();
}

function selectWhiteThree(){
	deselectAll();
	buttons[7].setSelect();
}

function unmode(){
	adhocButton.deselect();
	waypointButton.deselect();
}



