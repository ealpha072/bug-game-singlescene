
//this stores the game states
const gameState = {}

/*adds assets to be used inn the game eg  images, has two parameters;
a key and a path to the asset*/
function preload() {
  this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/codey.png');
}

/*creates game items such as sprites, shapes, cursor keys */
function create() {
  gameState.codey = this.add.sprite(150, 200, 'codey')
  // Set cursor keys here!
  gameState.cursors = this.input.keyboard.createCursorKeys();
}

/*updates the games items   */
function update() {
  // Update based on keypress here!
 if(gameState.cursors.right.isDown){
gameState.codey.x +=5
 }
 if(gameState.cursors.left.isDown){
   gameState.codey.x -=5
 }
 if(gameState.cursors.up.isDown){
   gameState.codey.y -=5
 }
 if(gameState.cursors.down.isDown){
   gameState.codey.y +=5
 }
 
}
/*configures the game */
const config = {
	type: Phaser.AUTO,
	width: 400,
	height: 500,
	backgroundColor: "#5f2a55",
	scene: {
    preload,
    create,
    update
	}
}
//creates the whole game
const game = new Phaser.Game(config)
