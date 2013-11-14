function UAV(initialPoint, map){

	this.currentOpacity = 1;
	this.map = map;

	this.currentOpacity = 1;

	//Basic Info
	this.latitude = initialPoint.lat;
	this.longitude = initialPoint.lng;
	this.finalPoint = new L.LatLng(37.468864,-122.204361);

	//0 to 360
	this.heading = 45*Math.PI/180;

	//Velocity
	this.velocity = 10;
	this.vAlt = 0;

	//Fuel
	this.fuelConsumption = 0;
	this.fuelLevel = 0;

	this.waypointList = new Array();
	this.currentWaypoint = initialPoint;

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
	/*
	if (Math.abs(this.latitude - this.finalPoint.lat) < 0.005 && Math.abs(this.longitude - this.finalPoint.lng) < 0.005){
		this.leafletMarker.setOpacity(this.currentOpacity);
		this.currentOpacity = this.currentOpacity - 0.1;
		if (this.currentOpacity == 0){
			return;
		}
	} else {
		this.currentOpacity = 1;
	}
	*/
	

	desiredLatitude = this.currentWaypoint.lat; //desired waypoint latlong
	desiredLongitude = this.currentWaypoint.lng;
	//Calculate new latitude or other stuff as you want
	var y = desiredLatitude-this.latitude;
	var x = desiredLongitude-this.longitude;
	 // maps it to +180 -> -180


    var desiredHeading = Math.atan2(y,x);

    var difference = desiredHeading - this.heading;

    if (difference > Math.PI){
    	difference -= 2*Math.PI;
    } else if (difference < -Math.PI){
		difference += 2*Math.PI;
    }

    if (difference > 0){
    	this.heading += 0.04;
    } else if (difference < 0){
    	this.heading -= 0.04;
    }
        // New position function of old position, heading and velocity
        this.latitude = this.latitude + this.velocity/40000*Math.sin(this.heading);
        this.longitude = this.longitude + this.velocity/40000*Math.cos(this.heading);

        //Create a new LatLng variable used by Leaflet
        var newLatLon = new L.LatLng(this.latitude, this.longitude);


        //Rotate the uav
        this.leafletMarker.setIconAngle(-this.heading*180/Math.PI);
        
        //Update the position of the marker with the newLatLon variable you have just created
        this.leafletMarker.setLatLng( newLatLon);

		/* DEBUG CODE
        if (!popupOpened){
                this.popup = L.popup()
            .setContent("heading " + this.heading*180/Math.PI 
            	+ "<br />desHed " + desiredHeading*180/Math.PI 
            	+"<br /> difference " + difference 
            	+ "<br />lat " + this.latitude 
            	+ "<br />lon " + this.longitude 
            	+"<br /> deslat " + desiredLatitude 
            	+"<br /> deslng " + desiredLongitude);
                this.leafletMarker.bindPopup(this.popup).openPopup();
                popupOpened = true;
        } else {
                this.popup.setContent("heading " + this.heading*180/Math.PI 
            	+ "<br />desHed " + desiredHeading*180/Math.PI 
            	+"<br /> difference " + difference 
            	+ "<br />lat " + this.latitude 
            	+ "<br />lon " + this.longitude 
            	+"<br /> deslat " + desiredLatitude 
            	+"<br /> deslng " + desiredLongitude);
                this.leafletMarker.bindPopup(this.popup).openPopup();
        }
        */
	
}

UAV.prototype.setWaypoint = function(waypoint){
	this.currentWaypoint = waypoint;
}

UAV.prototype.goToFinal = function(){
	this.currentWaypoint = this.finalPoint;
}

UAV.prototype.launch = function(){

}







