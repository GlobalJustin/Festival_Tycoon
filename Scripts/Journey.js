var Journey = function(startLocation, startTime, endLocation, endTime) {
	this.startLocation = startLocation;
	this.startTime = startTime;
	this.endLocation = endLocation;
	this.endTime = endTime;
};

Journey.prototype.toString = function() {
	return "{ startLocation: " + (this.startLocation ? "\"" + this.startLocation + "\"" : "null") +
		", startTime: " + (this.startTime && this.startTime.toString()) + 
		", endLocation: " + (this.endLocation ? "\"" + this.endLocation + "\"" : "null") +
		", endTime: " + (this.endTime && this.endTime.toString()) + " }";
};