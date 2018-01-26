var game = new Phaser.Game(998, 700, Phaser.AUTO, 'gameHolder', { preload: preload, create: create, update: update });

var PERSON_SPRITE = 'person',
	MAP_IMAGE = 'map',
	graphics,
	currentDay,
	currentTime,
	currentDayJourneys,
	speed = 2;

var play = 0;
var started = false;

var randomPeopleCount = 500;

function preload() {
	game.load.image(MAP_IMAGE, 'Images/A4-SB17-MAP.png');
    game.load.image(PERSON_SPRITE, 'Images/Person_Sprite.png');
}

function create() {
	game.add.sprite(0, 0, MAP_IMAGE);
	graphics = game.add.graphics(0, 0);
	graphics.inputEnabled = true;
	graphics.input.useHandCursor = true;
	for (i = 0; i < randomPeopleCount; i++) {
		var randomStage = Math.floor((Math.random() * 6));
		// people.push(new Person(game, stages[randomStage]));
	}
	currentDayJourneys = [];
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
		
		currentDay = 0;
		currentTime = 0;
		
		getCurrentDayJourneys();
		
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

var getCurrentDayJourneys = function() {
	currentDayJourneys = [];
	var thisPersonJourneys, numThisPersonJourneys;
	for(var i = 0; i < numPeopleJourneys; i++) {
		thisPersonJourneys = peopleJourneys[i].days.splice(0, 1)[0];
		if(thisPersonJourneys && thisPersonJourneys.length) {
			numThisPersonJourneys = thisPersonJourneys.length;
			for(var j = 0; j < numThisPersonJourneys; j++) {
				currentDayJourneys.push(thisPersonJourneys[j]);
			}
		}
	}
	currentDayJourneys = currentDayJourneys.sort((a, b) => {
		var aTime = a.startTime ? a.startTime.minutes : a.endTime.minutes;
		var bTime = b.startTime ? b.startTime.minutes : b.endTime.minutes;
		if(aTime < bTime) {
			return -1;
		} else if(aTime > bTime) {
			return 1;
		} else {
			return 0;
		}
	});
};

var removePersonFromStage = function(stageName) {
	var stage = getStage(stageName);
	stage.removePerson();
	return stage;
};

var getStage = function(stageName) {
	for(var i = 0; i < stages.length; i++) {
		if(stages[i].name == stageName) {
			return stages[i];
		}
	}
};

var addToStage = function(stage, personSprite) {
	personSprite.destroy();
	stage.addPerson();
};

function update() {
	graphics.clear();

	// graphics.lineStyle(2, 0xffd900, 1);
	currentTime += speed;
	var done = false, currentJourney, currentJourneyTime;
	while(!done && currentDayJourneys.length) {
		currentJourney = currentDayJourneys[0];
		currentJourneyTime = currentJourney.startTime
								? currentJourney.startTime.minutes
								: currentJourney.endTime.minutes;
		if(currentJourneyTime > currentTime) {
			done = true;
		} else if(currentJourney.startTime) {
			if(currentJourney.endTime) {
				var startLocation = removePersonFromStage(currentJourney.startLocation);
				var personSprite = game.add.sprite(startLocation.x, startLocation.y, PERSON_SPRITE);
				var endLocation = getStage(currentJourney.endLocation);
				var duration = (currentJourney.endTime.minutes - currentJourney.startTime.minutes) / speed * 20;
				var delay = (currentJourney.startTime.minutes - currentTime - speed) / speed * 20;
				var stageTween = game.add.tween(personSprite).to({x: endLocation.x, y: endLocation.y}, duration, Phaser.Easing.Sinusoidal.InOut, true, delay);	
				stageTween.onComplete.add(function() {addToStage(endLocation, personSprite);}, this);
				stageTween.start();
			} else {
				removePersonFromStage(currentJourney.startLocation);
			}
		} else {
			getStage(currentJourney.endLocation).addPerson();
		}
		if(!done) {
			currentDayJourneys.splice(0, 1);
		}
	}
	
	stages.forEach(stage => {
		graphics.beginFill(0x1C961E, 1);
		graphics.drawCircle(stage.stageX, stage.stageY, stage.numPeople / 4);	
		graphics.endFill();
	});
	
	if(!currentDayJourneys.length) {
		stages.forEach(stage => {
			stage.numPeople = 0;
		});
		currentDay++;
		if(currentDay < numDays) {
			currentTime = 0;
			getCurrentDayJourneys();
		}
	}
}