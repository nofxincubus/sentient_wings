// JavaScript Document


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

    var diff = desiredHeading - this.heading;

    if (diff > Math.PI){
    	diff =- 2*Math.PI;
    } else if (diff < Math.PI){
		diff =+ 2*Math.PI;
    }

    if (diff > 0){
    	this.heading =+0.04;
    } else if (diff < 0){
    	this.heading =-0.04;
    }

/*
    if (this.heading <= -Math.PI){
    	this.heading = this.heading + 2*Math.PI;
    }
    else if (this.heading >= Math.PI){
    	this.heading = this.heading - 2*Math.PI;
    }




    if (desiredHeading < 0){
    	if (this.heading < 0){
    		if (desiredHeading > this.heading){
    			this.heading += 0.04;
    		} else if (desiredHeading < this.heading){
    			this.heading -= 0.04;
    		}
    	} else if (this.heading >= 0){
    		if (desiredHeading + Math.PI + (Math.Pi + this.heading) < (-1) * desiredHeading + this.heading){
    			this.heading += 0.04;
    		} else {
    			this.heading -= 0.04;
    		}
    	} 

    } else if (desiredHeading > 0){
    	if (this.heading < 0){
			if (Math.PI - desiredHeading + (this.heading + Math.pi) < desiredHeading + (-1) * this.heading){
				this.heading -= 0.04;
			} else {
				this.heading += 0.04;
			}
    	} else if (this.heading > 0){
    		if (desiredHeading > this.heading){
    			this.heading += 0.04;
    		} else if (desiredHeading < this.heading){
    			this.heading -= 0.04;
    		}
    	}
    } else {
    	if (this.heading < 0){
    		this.heading += 0.04;
    	} else if (this.heading > 0){
			this.heading -= 0.04;
    	} 
    }
*/
                        
        //this.heading = desiredHeading;
        // New position function of old position, heading and velocity
        this.latitude = this.latitude + this.velocity/40000*Math.sin(this.heading);
        this.longitude = this.longitude + this.velocity/40000*Math.cos(this.heading);

        //Create a new LatLng variable used by Leaflet
        var newLatLon = new L.LatLng(this.latitude, this.longitude);


        //Rotate the uav
        this.leafletMarker.setIconAngle(-this.heading*180/Math.PI);
        
        //Update the position of the marker with the newLatLon variable you have just created
        this.leafletMarker.setLatLng( newLatLon);

        if (!popupOpened){
                this.popup = L.popup()
            .setContent("heading " + this.heading*180/Math.PI 
            	+ "<br />desHed " + desiredHeading*180/Math.PI 
            	+ "<br />lat " + this.latitude 
            	+ "<br />lon " + this.longitude 
            	+"<br /> deslong " + desiredLongitude 
            	+"<br /> y " + y 
            	+ "<br /> x " + x);
                this.leafletMarker.bindPopup(this.popup).openPopup();
                popupOpened = true;
        } else {
                this.popup.setContent("heading " + this.heading*180/Math.PI 
            	+ "<br />desHed " + desiredHeading*180/Math.PI 
            	+ "<br />lat " + this.latitude 
            	+ "<br />lon " + this.longitude 
            	+"<br /> deslong " + desiredLongitude 
            	+"<br /> y " + y 
            	+ "<br /> x " + x);
                this.leafletMarker.bindPopup(this.popup).openPopup();
        }
	
}

UAV.prototype.setWaypoint = function(waypoint){
	this.currentWaypoint = waypoint;
}

UAV.prototype.goToFinal = function(){
	this.currentWaypoint = this.finalPoint;
}

UAV.prototype.launch = function(){

}







