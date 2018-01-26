var Person = function(rfid, firstJourney) {
	this.rfid = rfid;
	this.dayJourneys = [];
	this.journeys = [ firstJourney ];
};

Person.prototype.toString = function() {
	return "{" +
		"\n\trfid: \"" + this.rfid + "\"," +
		"\n\tdays: [\n\t\t" + this.dayJourneys.join(",\n\t\t") + "\n\t]" +
		"\n}"
};