var mainstate = {
	preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 
		
		game.load.image('img','fb1.png');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  
		
		game.stage.backgroundColor = '#71c5cf';
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.img = game.add.sprite(100,125,'img');
		
		game.physics.arcade.enable(this.img);
		
		this.img.body.gravity.y = 1000;
		
		var spkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		spkey.onDown.add(this.jump,this);
		
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
		
		if(this.img.y < 0 || this.img.y > 490)
			this.restartgame();
    },
	
	jump: function(){
		this.img.body.velocity.y = -350;
	},
	
	restartgame: function(){
		game.state.start('main');
	}
	
};

var game = new Phaser.Game(400,490);

game.state.add('main',mainstate);

game.state.start('main');