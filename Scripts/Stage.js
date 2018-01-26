var Stage = function(name, dataName, imageName, x, y) {
	this.name = name;
	this.stageX = x;
	this.stageY = y;
	this.x = this.stageX - 16;
	this.y = this.stageY - 16;
	this.numPeople = 0;
	this.personX = this.x - 16;
	this.personY = this.y - 16;
	this.dataName = dataName;
	this.imageName = imageName;
};

Stage.prototype.addPerson = function() {
	this.numPeople++;
}

Stage.prototype.removePerson = function() {
	this.numPeople--;
}