var mainstate = {
	preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 
		
		game.load.image('img','fb1.png');
		game.load.image('pipe','pipe.png');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  
		
		game.stage.backgroundColor = '#71c5cf';
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.img = game.add.sprite(100,125,'img');
		
		game.physics.arcade.enable(this.img);
		
		this.img.body.gravity.y = 1000;
		
		var spkey = game.input.keyboard.addKey(Phaser.KeyBoard.SPACEBAR);
		
		spkey.onDown.add(this.jump,this);
		
		this.pipes = game.add.group();
		
		this.timer = game.time.events.loop(2000,this.addRowOfPipes,this);
		
		this.score = 0;
		
		this.labelScore = game.add.text(20,20,"0" ,{font: "40px Consolas"; fill: "#fffff"});
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
		
		if(this.img.y < 0 || this.img.y > 490)
			this.restartgame();
		
		game.physics.arcade.overlap(this.img,this.pipes,this.hitpipe,null,this);
		
		if(this.img.angle < 20)
			this.img.angle+=1;
    },
	
	jump: function(){
		this.img.body.velocity.y = -350;
		
		var animation = game.add.tween(this.img);
		animation.to({angle:-20},100);
		animation.start();
		
		this.img.anchor.setTo(-0.2,0.5);
	},
	
	restartgame: function(){
		game.state.start('main');
	},
	
	addOnePipe: function(){
		var pipe = game.add.sprite(x,y,'pipe');
		
		this.pipes.add(pipe);
		
		game.physics.arcade.enable(pipe);
		
		pipe.body.velocity.x = -200;
		
		pipe.checkWorldBounds = true;
		
		pipe.outOfBoundsKill = true;
	},
	
	addRowOfPipes: function(){
		
		var hole = Math.floor(Math.random()*5)+1;
		
		this.score+=1;
		this.labelScore = this.score;
		
		for(var i=0;i<8;i++)
			if(i!=hole && i!=hole+1)
				this.addOnePipe(400,i*60+10);

	},
	
	hitpipe: function(){
		if(this.img.alive == false)
			return;
		
		this.img.alive = false;
		
		game.time.events.remove(this.timer);
		
		this.pipes.forEach(function(p){
			p.body.velocity.x = 0;
		},this);
	}
	
}; 	

var game = new Phaser.Game(400,490);

game.state.add('main',mainstate);

game.state.start('main');