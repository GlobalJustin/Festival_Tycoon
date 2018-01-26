var Stage = function(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.numPeople = 0;
	this.personX = this.x - 15;
	this.personY = this.y - 15;
};

Stage.prototype.addPerson = function() {
	this.numPeople++;
}

Stage.prototype.removePerson = function() {
	this.numPeople--;
}