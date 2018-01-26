var GameTime = function(day, minutes) {
	this.day = day;
	this.minutes = minutes;
};

GameTime.prototype.toString = function() {
	return "{ day: " + this.day + ", minutes: " + this.minutes + " }";
};