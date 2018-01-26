var game = new Phaser.Game(998, 700, Phaser.AUTO, 'gameHolder', { preload: preload, create: create, update: update });

var PERSON_SPRITE = 'person';
var MAP_IMAGE = 'map';

var person, graphics;
var people = [];

var mapGateToStage = function(gate) {
	switch(gate) {
		case "Arena IN":
		case "Arena OUT":
			return "The Arena";
		case "Berghof IN":
		case "Berghof OUT":
			return "The Fun Hous";
		case "Bruck IN":
		case "Bruck OUT":
			return "The Bruck'n Stadl";
		case "Forest 1 IN":
		case "Forest 1 OUT":
		case "Forest 2 IN":
		case "Forest 2 OUT":
			return "The Forest Club";
		case "Racket Main IN":
		case "Racket Main OUT":
		case "Racket VIP IN":
		case "Racket VIP OUT":
			return "The Racket Club";
		case "Street 1 IN":
		case "Street 1 OUT":
		case "Street 2 IN":
		case "Street 2 OUT":
		case "Street 3 IN":
		case "Street 3 OUT":
			return "The Street Party";
	}
};

var mapDateTimeToGameTime = function(dateTime) {
	var date = new Date(dateTime).valueOf();
	for(var i = 0; i < numDays; i++) {
		var day = days[i];
		if(date >= day.start && date <= day.end) {
			return new GameTime(i, (date - day.start) / 60000);
		}
	}
	throw new Error('Unexpected date: ' + dateTime);
};

var convertJourney = function(journey) {
	var startLocation = journey.start_location && mapGateToStage(journey.start_location);
	var endLocation = journey.end_location && mapGateToStage(journey.end_location);
	var startTime = journey.start_location && mapDateTimeToGameTime(journey.start_datetime);
	var endTime = journey.end_location && mapDateTimeToGameTime(journey.end_datetime);
	return new Journey(startLocation, startTime, endLocation, endTime);
};

var reorganisePerson = function(person) {
	person.dayJourneys = [];
	var journeyIndex = 0, day, numJourneys = person.journeys.length, currentJourney;
	for(var i = 0; i < numDays; i++) {
		person.dayJourneys[i] = [];
		currentJourney = person.journeys[journeyIndex];
		day = currentJourney.startTime
				? currentJourney.startTime.day
				: currentJourney.endTime.day;
		while(day == i) {
			person.dayJourneys[i].push(person.journeys[journeyIndex]);
			journeyIndex++;
			if(journeyIndex == numJourneys) {
				break;
			}
			day = person.journeys[journeyIndex].startTime
				? person.journeys[journeyIndex].startTime.day
				: person.journeys[journeyIndex].endTime.day;
		}
		if(journeyIndex == numJourneys) {
			break;
		}
	}
	delete person.journeys;
};

function stuff() {
	var people = [], journeyObject, currentJourney, journey1, journey2, firstJourney = journeys[0], currentPerson;
	journeyObject = convertJourney(firstJourney);
	currentPerson = new Person(firstJourney.RFID_TAG_UID, journeyObject);
	people.push(currentPerson);
	for(var journey = 1; journey < numJourneys; journey++) {
		currentJourney = journeys[journey];
		if(currentPerson.rfid == currentJourney.RFID_TAG_UID) {
			journeyObject = convertJourney(currentJourney);
			if(journeyObject.startTime && journeyObject.startTime.day != journeyObject.endTime.day)
			{
				journey1 = new Journey(journeyObject.startLocation, journeyObject.startTime, null, null);
				journey2 = new Journey(null, null, journeyObject.endLocation, journeyObject.endTime);
				currentPerson.journeys.push(journey1);
				currentPerson.journeys.push(journey2);
			} else {
				currentPerson.journeys.push(journeyObject);
			}
		} else if(currentJourney.end_location) {
			reorganisePerson(currentPerson);
			journeyObject = convertJourney(currentJourney);
			currentPerson = new Person(currentJourney.RFID_TAG_UID, journeyObject)
			people.push(currentPerson);
		}
	}
	reorganisePerson(currentPerson);
}

stuff();

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
		for (i = 0; i < randomPeopleCount; i++) {
			var randomStage = Math.floor((Math.random() * 6));
			people[i].moveToStage(stages[randomStage], Math.random() * 20000);
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
		graphics.drawCircle(stage.x, stage.y, stage.numPeople / 2);	
		graphics.endFill();
	});
}