var game = new Phaser.Game(998, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var PERSON_SPRITE = 'person';
var MAP_IMAGE = 'map';

var people = [];

function preload() {
	game.load.image(MAP_IMAGE, 'Images/A4-SB17-MAP.png');
    game.load.image(PERSON_SPRITE, 'Images/Person_Sprite.png');
}

function create() {
	game.add.sprite(0, 0, MAP_IMAGE);

	for (i = 0; i < 100; i++) {
		people.push(new Person(game, stages[i % 6]));
	}

}

function start() {
	for (i = 0; i < 100; i++) {
		people[i].moveToStage(stages[i % 5], 2000);
	}
}

function update() {
	var graphics = game.add.graphics(0, 0);

	// graphics.lineStyle(2, 0xffd900, 1);
	
	stages.forEach(stage => {
		graphics.beginFill(0x1C961E, 1);
		graphics.drawCircle(stage.x, stage.y, stage.numPeople);		
	});
}