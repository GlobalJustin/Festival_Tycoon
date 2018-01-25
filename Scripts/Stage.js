var Stage = function(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.numPeople = 0;
};

Stage.prototype.addPerson = function() {
	this.numPeople++;
}

Stage.prototype.removePerson = function() {
	this.numPeople--;
}