// To display the initial score of the player to be 0
var score = 0;
document.getElementById('score').innerHTML = score;

//To display the initial level of the player to be 1
var level = 1;
document.getElementById('level').innerHTML = level;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (150 * dt);
    }
    else {this.x = -90;}

    // If the player collides with the enemy, his score will be set to 0, and the game will be reset
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        score = 0;
        document.getElementById('score').innerHTML = score;
        level = 1;
        document.getElementById('level').innerHTML = level;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

// Is called every time the player position is updated
Player.prototype.update = function() {
    
    // If the player reaches the water, he wins the game.
    // A popup is displayed to ask the player if he wants to continue playing.
    // If the player decides to continue, his score will keep updating till he keeps playing.
    // If the plays decides to quit, the final score will be displayed along with a thank you message.
    if (this.y < 20) {
    score++;
    document.getElementById('score').innerHTML = score;
    level++;
    document.getElementById('level').innerHTML = level;
    if(confirm("Do you want to continue the game?") == true)
    {
        this.reset();
    }
    else
    {
        //To display a thank you message along with the score
        alert("Thank you for playing!\n Your score is: "+score+"\n You reached level: "+level);
        score = 0;
        document.getElementById('score').innerHTML = score;
        level = 1;
        document.getElementById('level').innerHTML = level;
        this.reset();
    }
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(turn) {
    if(turn == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(turn == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(turn == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(turn == 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 00;
    this.y = 320;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-190, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);


// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});