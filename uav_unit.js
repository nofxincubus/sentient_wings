// JavaScript Document


function UAV(lat, lon, alt){
	//Basic Info
	this.latitude = lat;
	this.longitude = lon;
	this.altitude = alt;

	//0 to 360
	this.heading = 0;

	//Velocity
	this.velocity = 10;
	this.vAlt = 0;

	//Fuel
	this.fuelConsumption = 0;
	this.fuelLevel = 0;

	this.waypointList = new Array();
	this.currentWaypoint = null;

	this.uavIcon = L.icon({
	    iconUrl: './images/drone-tiny.png',

	    iconSize:     [75, 50], // size of the icon
	    iconAnchor:   [37, 25], // point of the icon which will correspond to marker's location
	    shadowAnchor: [4, 62],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
}

UAV.prototype.setLeafletMarker = function(marker){
	this.leafletMarker = marker;
}

UAV.prototype.setVelocity = function(velocity){
	this.velocity = velocity;
}

UAV.prototype.setNextWaypoint = function(newWayPoint) {
	this.waypointList[this.waypointList.length] = newWaypoint;
	if (this.currentWaypoint == null){
		this.currentWaypoint = this.waypointList[this.waypointList.length];
	}
};

UAV.prototype.update = function(){
	this.latitude = this.latitude + this.velocity/100000;
	var newLatLon = new L.LatLng(this.latitude, this.longitude);
	this.leafletMarker.setLatLng( newLatLon);
}





