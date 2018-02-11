/*var togglePause = function(game){
	var pauseText;
	game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
	if (game.physics.arcade.isPaused===true){
		// The message text
		pauseText = game.add.text(200, 250, 'Paused!', {
			fontSize: '64px',
			fill: '#000'
		});
	}
	else{
		pauseText.remove();
	}
};*/

// var render = (function() {
// 		console.log("render");
// 		weapon.fire();
// 		game.debug.text(game.time.suggestedFps, 32, 32);
// 		// game.debug.text(game.time.physicsElapsed, 32, 32);
// 		// game.debug.body(player);
// 		// game.debug.bodyInfo(player, 16, 24);
//
// })();

"use strict";

$(document).ready(function(){
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'ff-superball', {
		preload: preload,
		create: create,
		update: update,
		render: render
	});
	var player,
	platforms,
	score = 0, scoreText,
	timeLimit = 15, timeText,
	endText,
	sky,
	endGame = false,
	pauseKey,
	pauseText,
	sprite,
	weapon;

	var balls, ball1, ball2,
	bullets,
	fireButton,
	timeCheck = 0,
	fx,
	sum = 0,
	timesUp = '+',
	myCountdownSeconds,
	cursors,
	bulletTime = 0,
	bullet;

	function preload() {
		game.load.image('carl', 'assets/pj/carl.ico');			//charge pj
		game.load.image('ground', 'assets/background/ground.png');	//charge background
		game.load.image('sky', 'assets/background/cloud.jpg');		//charge background sky
		game.load.image('ball', 'assets/balls/pangball.png'); 	//charge balls
		game.load.image('simplebullet', 'assets/bullets/bullet.png');
		game.load.image('doublebullet', 'assets/bullets/bullet0.png');
		game.load.audiosprite('sfx', 'assets/audio/fx_mixdown.ogg', null, audioJSON);	//charge sound
	}

	function create() {
		cursors = this.input.keyboard.createCursorKeys();

		game.physics.startSystem(Phaser.Physics.ARCADE);
		_createMusic();

		_createWorld();


		_createPlayer();

		_createBall();



		// Second Count
		game.time.events.loop(Phaser.Timer.SECOND, countDownTimer, this);


		// Pause
		pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.P);
		pauseKey.onDown.add(togglePause, this);

		_createWeapon();

		_createScore();

		_createTime();
	}

	function update() {

		//  As we don't need to exchange any velocities or motion we can the 'overlap' check instead of 'collide'
		// game.physics.arcade.overlap(bullets, ball1, ball2, collisionBullet, null, this);

		game.physics.arcade.collide(player, platforms);
		player.body.velocity.x = 0;

		//  Enable physics between the knocker and the ball
		game.physics.arcade.collide(player, ball1, collisionHandler, null, this);
		game.physics.arcade.collide(player, ball2, collisionHandler, null, this);
		game.physics.arcade.collide(ball1, ball2);
		game.physics.arcade.overlap(bullets, [ball1, ball2], collisionBullet, null, this);

		if (cursors.left.isDown) {
			//  Move to the left
			player.body.velocity.x = -300;

			player.animations.play('left');
		}
		else if (cursors.right.isDown) {
			//  Move to the right
			player.body.velocity.x = 300;

			player.animations.play('right');

		}
		else {
			//  Stand still
			player.animations.stop();
			player.frame = 10;
		}

		//  Allow the player to jump if they are touching the ground.
		if (cursors.up.isDown && player.body.touching.down && game.physics.arcade.isPaused === false) {
			player.body.velocity.y = -500;
			scoreIncrement(player);
			fx.play('numkey');
		}

		if (fireButton.isDown) {
			// fireBullet();
			weapon.fire();
		}
	}

	function render(){
		weapon.debug();
		// game.debug.text(game.time.suggestedFps, 32, 32);
		// game.debug.text(game.time.physicsElapsed, 32, 32);
		game.debug.body(ball1);
		game.debug.body(ball2);
		game.debug.body(player);
		game.debug.body(weapon);
		// game.debug.bodyInfo(player, 16, 24);

	}

	function _createPlayer(){

		player = game.add.sprite(200, 0, 'carl');
		player.scale.setTo(2, 2);
		//  We need to enable physics on the player
		game.physics.arcade.enable(player);
		//  Player physics properties. Give the little guy a slight bounce.
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 700;
		player.immovable = true;

	}

	function _createBalls(){
		balls = game.add.group();
		balls.enableBody = true;
		balls.physicsBodyType = Phaser.Physics.ARCADE;
	}

	function _createWeapon(){

		//  Creates 3 single bullet, using the 'bullet' graphic
		weapon = game.add.weapon(3, 'simplebullet');

		bullets = weapon.bullets;
		//  The bullet will be automatically killed when it leaves the world bounds
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

		//  Because our bullet is drawn facing up, we need to offset its rotation:
		weapon.bulletAngleOffset = 90;

		//  The speed at which the bullet is fired
		weapon.bulletSpeed = 400;


		//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
		weapon.trackSprite(player, 32, 0);

		fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	}


	function _createBall() {

		ball1 = game.add.sprite(100, 240, 'ball');
		ball2 = game.add.sprite(600, 240, 'ball');

		ball1.scale.setTo(2.5, 2.5);
		ball2.scale.setTo(2.5, 2.5);
		//  A bouncey ball sprite just to visually see what's going on.
		//generate random ball --> ball = game.add.sprite(game.world.randomX, 0, 'ball');


		game.physics.enable([ball1,ball2]);

		ball1.body.setCircle(16);
		ball2.body.setCircle(16);

		ball1.body.collideWorldBounds = true;
		ball2.body.collideWorldBounds = true;

		ball1.body.bounce.set(1);
		ball2.body.bounce.set(1);

		ball1.body.gravity.y = 100;
		ball2.body.gravity.y = 100;

		ball1.body.velocity.set(150);
		ball2.body.velocity.set(-200, 60);

	}



	function scoreIncrement() {
		//  Add and update the score
		score += 10;
		scoreText.text = 'Score: ' + score;
	}

	function countDownTimer() {
		if (timeLimit <= 0) {
			// End Game Text
			endText = game.add.text(200, 250, 'Time is over!', {
				fontSize: '64px',
				fill: '#000'
			});
			sky.destroy();
			game.stage.backgroundColor = '#992d2d';
			game.physics.arcade.isPaused = true;
			sum++;
		}
		else if (endGame === false && game.physics.arcade.isPaused === false){
			timeLimit--;
			timeText.text = 'Time: ' + timeLimit;
		}
	}

	function togglePause() {
		game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
		if (game.physics.arcade.isPaused===true){
			// The message text
			pauseText = game.add.text(270, 250, 'Paused!', {
				fontSize: '64px',
				fill: '#000'
			});
		}
		else{
			pauseText.destroy();
		}
	}


	// End Game
	function collisionHandler (obj1, obj2) {
		if (sum === 0){
			console.log("End Game");
			sky.destroy();
			game.stage.backgroundColor = '#992d2d';
			endText = game.add.text(200, 250, 'Game over!', {
				fontSize: '64px',
				fill: '#000'
			});
			endGame = true;
			game.physics.arcade.isPaused = true;
			sum++;
		}
	}
	
	//  Called if the bullet hits one of the veg sprites
	function collisionBullet (bullet, ball1) {
console.log(bullet)
		bullet.kill();
		ball1.kill();

	}
	function _createScore(){
		//  The score text
		scoreText = game.add.text(16, 16, 'Score: ' + score, {
			fontSize: '32px',
			fill: '#000'
		});
	}
	function _createTime(){
		// The Time
		timeText = game.add.text(630, 16, 'Time: ' + timeLimit, {
			fontSize: '32px',
			fill: '#000'
		});
	}
	function _createMusic(){
		//Add music
		fx = game.add.audioSprite('sfx');
	}
	function _createWorld(){
		//  We're going to be using physics, so enable the Arcade Physics system
		sky = game.add.sprite(0, 0, 'sky');

		//  The platforms group contains the ground and the 2 ledges we can jump on
		platforms = game.add.group();

		//  We will enable physics for any object that is created in this group
		platforms.enableBody = true;


		// Here we create the ground.
		var ground = platforms.add(game.add.tileSprite(0, game.world.height - 55, game.world.width, 55, "ground"));
		ground.body.immovable = true; //  This stops it from falling away when you jump on it

		var groundTop = platforms.add(game.add.tileSprite(0, -49, game.world.width, 55, "ground"));
		groundTop.body.immovable = true; //  This stops it from falling away when you jump on it

		var platform = platforms.add(game.add.tileSprite(400, game.world.height - 200, 110, 55, "ground"));
		platform.body.immovable = true;

		var laterals1 = platforms.add(game.add.tileSprite(-103, 0, 110, game.world.height, "ground"));
		laterals1.body.immovable = true;

		var laterals2 = platforms.add(game.add.tileSprite(game.world.width - 7, 0, 110, game.world.height, "ground"));
		laterals2.body.immovable = true;
	}

});

var audioJSON = {
	spritemap: {
		'alien death': {
			start: 1,
			end: 2,
			loop: false
		},
		'boss hit': {
			start: 3,
			end: 3.5,
			loop: false
		},
		'escape': {
			start: 4,
			end: 7.2,
			loop: false
		},
		'meow': {
			start: 8,
			end: 8.5,
			loop: false
		},
		'numkey': {
			start: 9,
			end: 9.1,
			loop: false
		},
		'ping': {
			start: 10,
			end: 11,
			loop: false
		},
		'death': {
			start: 12,
			end: 16.2,
			loop: false
		},
		'shot': {
			start: 17,
			end: 18,
			loop: false
		},
		'squit': {
			start: 19,
			end: 19.3,
			loop: false
		}
	}
};




