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

	for (i = 0; i < 100; i++) {
		var person = new Person(game, stages[i % 6]);
		person.moveToStage(stages[i % 5], 2000);
	}

	/*
	personSprite = game.add.sprite(stages[1].x, stages[1].y, PERSON_SPRITE);
	game.physics.arcade.enable(person);



	var killTween = game.add.tween(person).to({x: stages[0].x, y: stages[0].y}, 2000, Phaser.Easing.Sinusoidal.InOut)
	.chain(game.add.tween(person).to({ x: stages[0].x, y: stages[0].y }, 2000, Phaser.Easing.Sinusoidal.None))
	.chain(game.add.tween(person).to({ x: stages[3].x, y: stages[3].y }, 3000, Phaser.Easing.Sinusoidal.None)); 
	
	//killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
	killTween.start();
*/

	//person.body.velocity.x = 15;
	//person.body.velocity.y = 15;
}

function update() {
	var graphics = game.add.graphics(0, 0);

	// graphics.lineStyle(2, 0xffd900, 1);
	
	stages.forEach(stage => {
		graphics.beginFill(0x1C961E, 1);
		graphics.drawCircle(stage.x, stage.y, stage.numPeople * 3);		
	});
}