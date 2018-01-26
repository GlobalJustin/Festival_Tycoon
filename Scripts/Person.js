var Person = function(game, initialStage) {
    this.game = game;
    this.personSprite = game.add.sprite(initialStage.x, initialStage.y, PERSON_SPRITE);
    game.physics.arcade.enable(this.personSprite);
    this.stage = initialStage;
    this.stage.addPerson();
};

Person.prototype.moveToStage = function(stage, duration) {
    this.stage.removePerson();
    var stageTween = game.add.tween(this.personSprite).to({x: stage.x, y: stage.y}, duration, Phaser.Easing.Sinusoidal.InOut);	
    stageTween.onComplete.add(addToStage, this);
    stageTween.start();
    
    function addToStage() {
        stage.addPerson();
    }
}