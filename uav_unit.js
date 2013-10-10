// JavaScript Document


function UAV(lat, lon, alt){

	//Basic Info
	this.latitude = lat;
	this.longitude = lon;
	this.altitude = alt;

	//0 to 360
	this.heading = 45*Math.PI/180;

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

//Assigns marker to the UAV object
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
popupOpened = false;



 
UAV.prototype.update = function(){
	desiredLatitude = 51.52; //desired waypoint latlong
	desiredLongitude = -0.07;
	//Calculate new latitude or other stuff as you want
	var y = desiredLatitude-this.latitude;
	var x = desiredLongitude-this.longitude;
	// maps it to +180 -> -180
	var desiredHeading = Math.atan2(y,x);
	if (this.heading <0)
		{this.heading = this.heading +360;}
	if (desiredHeading > this.heading)
		{this.heading+=.01;}
	else if(desiredHeading < this.heading)
		{this.heading-=.01;}
			
	//this.heading = desiredHeading;
	// New position function of old position, heading and velocity
	this.latitude = this.latitude + this.velocity/100000*Math.sin(this.heading);
	this.longitude = this.longitude + this.velocity/100000*Math.cos(this.heading);
	//Create a new LatLng variable used by Leaflet
	var newLatLon = new L.LatLng(this.latitude, this.longitude);

	//Update the position of the marker with the newLatLon variable you have just created
	this.leafletMarker.setLatLng( newLatLon);
	//this.leafletMarker.setRotate(this.velocity);
	if (!popupOpened){
		this.popup = L.popup()
    	.setContent("heading " + this.heading*180/Math.PI + "<br />desHed " + desiredHeading*180/Math.PI + "<br />lat " + this.latitude + "<br />lon " + this.longitude +"<br /> deslong " + desiredLongitude +"<br /> y " + y + "<br /> x " + x);
		this.leafletMarker.bindPopup(this.popup).openPopup();
		popupOpened = true
	} else {
		this.popup.setContent("heading " + this.heading*180/Math.PI + "<br />desHed " + desiredHeading*180/Math.PI + "<br />lat " + this.latitude + "<br />lon " + this.longitude +"<br /> deslong " + desiredLongitude + "<br /> y " + y + "<br /> x " + x);
	}
	
}





