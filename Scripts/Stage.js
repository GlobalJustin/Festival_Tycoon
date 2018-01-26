var Stage = function(name, dataName, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.numPeople = 0;
	this.personX = this.x - 16;
	this.personY = this.y - 16;
	this.dataName = dataName;
};

Stage.prototype.addPerson = function() {
	this.numPeople++;
}

Stage.prototype.removePerson = function() {
	this.numPeople--;
}