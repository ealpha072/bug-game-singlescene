function preload(){
  this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
  this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
  this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
  this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
  this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
}

const gameState ={
  score:0
}

function create(){
  gameState.player = this.physics.add.sprite(225,440,'codey').setScale(.5)
  const platforms = this.physics.add.staticGroup();
  platforms.create(225,510,'platform')

  gameState.setCollideWorldBounds(true);
  this.physics.add.collider(gameState.player,platforms)
  gameState.cursors = this.input.keyboard.createCursorKeys();

  const bugs = this.physics.add.group();
  function generateBugs(){
    const xCoord = Math.random()*450;
    bugs.create(xCoord,10,'bug1');
  }
  const enemyGenerateLoop = this.time.addEvent({
    callback:generateBugs,
    delay:200,
    callbackScope:this,
    loop:true
  })
  gameScore.scoreText = this.add.text(195, 485, 'Score: 0')
  this.physics.add.collider(bugs,platforms, function(bug){
    bug.destroy()
    gameState.score +=10;
    gameState.scoreText.setText(`Score: ${gameState.score}`)
  })
  this.physics.add.collider(bugs,gameState.player,()=>{
    enemyGenerateLoop.destroy();
    this.physics.pause()
    this.add.text(100,100, 'Game Over',{fontsize:'15px',fill:'#000000'})
  })

}


function update(){
  if(gameState.cursors.left.isDown){
    gameState.player.setVelocityX(-160);
  }else if(gameState.cursors.right.isDown){
    gameState.player.setVelocityX(160)
  }else{
    gameState.player.setVelocityX(0)
  }
}

const config = {
  width:500,
  height:500,
  backgroundColor:blue,
  scene:{
    preload,
    create,
    update
  },
  physics:{
    default:'arcade',
    arcade:{
      gravity:{y:200},
      debug:true
    }
  }
}

const game = new Game.Phaser(config)