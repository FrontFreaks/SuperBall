"use strict";

$(document).ready(function(){
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'ff-superball', {
		preload: preload,
		create: create,
		update: update
	});
	var player,
	platforms,
	score = 0, scoreText,
	timeLimit = 10, timeText,
	endText,
	sky,
	endGame = false;

	var ball, ball1, ball2,
	bullets,
	resetBullets,
	fireBullet,
	bulletTime = 0,
	fireButton,
	timeCheck = 0,
	fx,
	sum = 0,
	timesUp = '+',
	myCountdownSeconds;

	function preload() {
		game.load.image('carl', 'assets/pj/carl.ico');			//charge pj
		game.load.image('ground', 'assets/background/ground.png');	//charge background
		game.load.image('sky', 'assets/background/cloud.jpg');		//charge background sky

		game.load.image('ball', 'assets/balls/pangball.png'); 	//charge balls
		game.load.audiosprite('sfx', 'assets/audio/fx_mixdown.ogg', null, audioJSON);	//charge sound
	}

	function create() {



		//Add music
		fx = game.add.audioSprite('sfx');

		//  We're going to be using physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		sky = game.add.sprite(0, 0, 'sky');

		//  The platforms group contains the ground and the 2 ledges we can jump on
		platforms = game.add.group();

		//  We will enable physics for any object that is created in this group
		platforms.enableBody = true;

		//  The score
		scoreText = game.add.text(16, 16, 'Score: ' + score, {
			fontSize: '32px',
			fill: '#000'
		});

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


		player = game.add.sprite(200, 0, 'carl');
		player.scale.setTo(2, 2);
		//  We need to enable physics on the player
		game.physics.arcade.enable(player);
		createBall();

		//  Player physics properties. Give the little guy a slight bounce.
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 700;
		player.immovable = true;

		// The Time
		timeText = game.add.text(630, 16, 'Time: ' + timeLimit, {
			fontSize: '32px',
			fill: '#000'
		});

		// Second Count
		game.time.events.loop(Phaser.Timer.SECOND, countDownTimer, this);

	}

	function createBall() {

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

		//ball = game.add.sprite(300, 30, 'ball');
		//ball.body.velocity.setTo(200, 200);

		//  This makes the game world bounce-able
		//ball.body.collideWorldBounds = true;

		//  This sets the image bounce energy for the horizontal
		//  and vertical vectors (as an x,y point). "1" is 100% energy return
		//ball.body.bounce.setTo(1, 1);
	}

	function scoreIncrement() {

		//  Add and update the score
		score += 10;
		scoreText.text = 'Score: ' + score;

	}

	function update() {

		var cursors = game.input.keyboard.createCursorKeys();
		game.physics.arcade.collide(player, platforms);
		player.body.velocity.x = 0;

		//  Enable physics between the knocker and the ball
		game.physics.arcade.collide(player, ball1, collisionHandler, null, this);
		game.physics.arcade.collide(player, ball2, collisionHandler, null, this);
		game.physics.arcade.collide(ball1, ball2);

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
		if (cursors.up.isDown && player.body.touching.down) {
			player.body.velocity.y = -500;
			scoreIncrement(player);
			fx.play('numkey');
		}
	}

	function countDownTimer() {
		if (timeLimit <= 0) {
			// End Game Text
			endText = game.add.text(200, 250, 'Time is over!', {
				fontSize: '64px',
				fill: '#000'
			});
		}
		else if (endGame === false){
			timeLimit--;
			timeText.text = 'Time: ' + timeLimit;
		}
	}

	// End Game
	function collisionHandler (obj1, obj2) {
		if (sum === 0){
			console.log("End Game")
			//ball.body.bounce.setTo(0,0);
			ball1.body.bounce.setTo(0,0);
			ball2.body.bounce.setTo(0,0);
			sky.destroy();
			game.stage.backgroundColor = '#992d2d';
			sum++;
			endText = game.add.text(200, 250, 'Game over!', {
				fontSize: '64px',
				fill: '#000'
			});
			endGame = true;
		}
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




