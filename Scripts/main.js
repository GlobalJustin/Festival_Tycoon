var game = new Phaser.Game(998, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var PERSON_SPRITE = 'person';
var MAP_IMAGE = 'map';

var person;

function preload() {
	game.load.image(MAP_IMAGE, 'Images/A4-SB17-MAP.png');
    game.load.image(PERSON_SPRITE, 'Images/Person_Sprite.png');
}

function create() {
	game.add.sprite(0, 0, MAP_IMAGE);
	person = game.add.sprite(0, 0, PERSON_SPRITE);
	game.physics.arcade.enable(person);
	person.body.velocity.x = 5;
	person.body.velocity.y = 5;
}

function update() {
}