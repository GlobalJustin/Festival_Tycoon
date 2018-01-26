var game = new Phaser.Game(998, 700, Phaser.AUTO, 'gameHolder', { preload: preload, create: create, update: update });

var PERSON_SPRITE = 'person';
var MAP_IMAGE = 'map';

var people = [];
var graphics;

var play = 0;
var started = false;

function preload() {
	game.load.image(MAP_IMAGE, 'Images/A4-SB17-MAP.png');
    game.load.image(PERSON_SPRITE, 'Images/Person_Sprite.png');
}

function create() {
	game.add.sprite(0, 0, MAP_IMAGE);
	graphics = game.add.graphics(0, 0);
	graphics.inputEnabled = true;
	graphics.input.useHandCursor = true;
	for (i = 0; i < 100; i++) {
		var randomStage = Math.floor((Math.random() * 6));
		people.push(new Person(game, stages[randomStage]));
	}

	stages.forEach(stage => {
		//define you region
		var stageRect = new Phaser.Rectangle(stage.x - 25, stage.y - 25, 50, 50);
		game.input.on
		//listen for pointers
		game.input.onDown.add(handlePointerDown)
		//handle a touch/click
		function handlePointerDown(pointer){    
			//this is the test, contains test for a point belonging to a rect definition    
			var inside = stageRect.contains(pointer.x,pointer.y)    
			//do whatever with the result    
			if (inside) {
				$("#stage").text(stage.name);
				$("#stage").append("<img class='stageImage' src='Images/" + stage.imageName + "'/>");
			
				var stagePerformances = performances.filter(function (item) {
					return item.PERFORMANCE_LOCATION == stage.dataName;
				});

				stagePerformances.sort(function (a, b) {
					if (a.DATE < b.DATE) {
						return -1;
					} 
					if (a.DATE > b.DATE) {
						return 1;
					} 

					var nameA = a.ShowStartTime.toUpperCase(); // ignore upper and lowercase
					var nameB = b.ShowStartTime.toUpperCase(); // ignore upper and lowercase
					if (nameA < nameB) {
					  return -1;
					}
					if (nameA > nameB) {
					  return 1;
					}
				  
					// names must be equal
					return 0;
				});
				$("#performances").text("");
				$.each(stagePerformances, function(index, value){
					
					$("#performances").append("Day " + DateToDay(value.DATE) + " " + value.ShowStartTime.substring(0, 5) + " " + value.PERFORMANCE + '<br>');
				});

				function DateToDay(date) {
					return date.substring(0,2);					
				}

				// $("#performances").text(names);
				
			}
		}
	});


}

function start() {
	if (started == false) {
		started = true;
		play = 1;
		if (play == 0);
		for (i = 0; i < 100; i++) {
			var randomStage = Math.floor((Math.random() * 6));
			people[i].moveToStage(stages[randomStage], Math.random() * 10000);
		}
		$("#playButton").attr("src","Images/Pause_Sprite.png");
	} else {
		if (play == 0) {
			game.paused = false;
			play = 1;
			$("#playButton").attr("src","Images/Pause_Sprite.png");
		} else {
			game.paused = true;
			play = 0;
			$("#playButton").attr("src","Images/Play_Sprite.png");
		}
	}
}

function update() {
	graphics.clear();
	stages.forEach(stage => {
		graphics.beginFill(0x1C961E, 1);
		graphics.drawCircle(stage.x, stage.y, stage.numPeople);	
		graphics.endFill();
	});
}