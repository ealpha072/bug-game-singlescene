
//preload is used to load resources that will be used in the game. in our case, just images,
function preload(){
  this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
  this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
  this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
  this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
  this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
}

// this records the state of the game, has scores and player
const gameState ={
  score:0
}

//create function is used to create different objects of the game as commented in the code 
function create(){
  gameState.player = this.physics.add.sprite(225,440,'codey').setScale(.5) 
  //this line creates the player in the gameState object
  //we use this.physics to enable effects of gravity on hte codey sprite, meaning that it will free fall
  const platforms = this.physics.add.staticGroup();
  //the platform is the landing point of the sprite , its not affected by physics so its static
  //thats why we use .staticgroup
  //for objects affected by gravity, use .group
  platforms.create(225,510,'platform')// this creates the platform..note, we first add then create..

  gameState.player.setCollideWorldBounds(true); //this is used to make sure that the player object doesnt fall out of the screen..
  this.physics.add.collider(gameState.player,platforms)// defines the fact that our platform and sprite will collide.,.
  gameState.cursors = this.input.keyboard.createCursorKeys(); //creates the cursors for keyboard controlls ,up,down,left,right,shift and space,

  const bugs = this.physics.add.group();// adds a group of enemy bugs that will be affected by gravity...
  function generateBugs(){
    //this function is used to generate the enemies or bugs of the game
    //the create method takes 3 arguments, x and y coord and the key of the bug  
    const xCoord = Math.random()*450;
    bugs.create(xCoord,10,'bug1');
  }
  //the below object loops and generates multiple bugs
  const enemyGenerateLoop = this.time.addEvent({
    callback:generateBugs, //defines the function to be called
    delay:200,//defines the number of ms to wait before creating another bug
    callbackScope:this,// defines that we should call this 
    loop:true //continue creating bugs as long as this is true
  })

  gameState.scoreText = this.add.text(195, 485, 'Score: 0')//score display
  this.physics.add.collider(bugs,platforms, function(bug){
    //we are adding a collider bvetween bugs and the platform
    //when a bug colides with the plartform, we should destroy it hence the destroy method
    //the last two lines just sets the score and updates it 
    bug.destroy()
    gameState.score +=10;
    gameState.scoreText.setText(`Score: ${gameState.score}`)
  })

  this.physics.add.collider(bugs,gameState.player,()=>{
    //we add another collider betwee the bugs and the player sprite
    // wen they collide, we would want to stop generating more buugs hence we destroy the object that generates the bugs
    enemyGenerateLoop.destroy();
    this.physics.pause()//after destroying , we then pause physics and display texts of game over
    this.add.text(100,100, 'Game Over',{fontsize:'15px',fill:'#000000'})
    this.add.text(100, 120 , "Click to restart",{fontsize:'30px',fill:'#000000'})

    this.input.on('pointerup',()=>{
      //this adds an event listener to the game when the game is over,
      // we reset the score and restart the scene
      gameState.score = 0;
      this.scene.restart();
    })
  })

}


function update(){
  // here we listen to keybpard presses of up, down, left, right and set the appropriate velocity when they are pressed
  if(gameState.cursors.left.isDown){
    gameState.player.setVelocityX(-160);
  }else if(gameState.cursors.right.isDown){
    gameState.player.setVelocityX(160)
  }else{
    gameState.player.setVelocityX(0)
  }
}


//the config object defines our whole game,
const config = {
  type: Phaser.AUTO,
  width:450,//sets the game width;
  height:500,//sets game height
  backgroundColor:"b9eaff",
  scene:{
    //scene is an object that generates our scene for us 
    //we call the preload,create and update sfunctions here
    preload,
    create,
    update
  },
  //defines how our physics rules will work
  physics:{
    default:'arcade',//tells phaser to use the arcade plugin
    arcade:{
      gravity:{y:200},//defines hiw fast elemnets affectede by physics will fall
      debug:true
    }
  }
}

const game = new Phaser.Game(config)