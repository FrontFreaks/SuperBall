var render = (function() {
	var init = function(){
		console.log("render")
		game.debug.text(game.time.suggestedFps, 32, 32);
		// game.debug.text(game.time.physicsElapsed, 32, 32);
		// game.debug.body(player);
		// game.debug.bodyInfo(player, 16, 24);
	}
	return {
		init: init
	}

})();
