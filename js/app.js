class Utility {
    // Using pythag to find the distance between 2 points
    static Distance(a, b){
        let xDist = b.x - a.x;
        let yDist = b.y - a.y;
        let distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        return distance;
    }
}

class Entity{
    constructor(spriteList, position){
        this.sprite = spriteList[Math.floor(Math.random() * spriteList.length)];
        this.x = position[0];
        this.y = position[1];
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
class Enemy extends Entity{
    constructor(spriteList, position){
        super(spriteList, position);
        allEnemies.push(this);
        // Setting the speed to a random number between 25 and 200;
        this.speed = Math.floor(Math.random() * (200 - 25 + 1) + 25);
        this.currentDirection = 'right';
    }
    update(dt){
        // Apply movement based on direction
        // If they reach out of bounds reset the pos.
        this.x = this.x > 505 ? -101 : this.x + (this.speed * dt);
        let distance = Utility.Distance(this, player);
        if(distance < 60){
            // Game over
            player.x = 202.5;
            player.y = 404;
        }
    }
}
class Player extends Entity{
    constructor(spriteList, position){
        super(spriteList, position);
        this.hitWater = false;
    }
    handleInput(keyPressed){
        if(!this.hitWater){
            switch(keyPressed){
                case 'up':
                    this.y = this.y > 0 ? this.y - 86 : this.y;
                    break;
                case 'down':
                    this.y = this.y < 348 ? this.y + 86 : this.y;
                    break;
                case 'left':
                    this.x = this.x > 101 ? this.x - 101 : this.x;
                    break;
                case 'right':
                    this.x = this.x < 404 ? this.x + 101 : this.x;
                    break;
                default:
                    break;
            }
        }
        else{

            // TODO : clean this up, some sort of way of resetting the player.
            if(keyPressed == 'enter'){
                this.x = 202.5;
                this.y = 404;
                this.hitWater = false;
            }
        }
    }
    update(){
        if(this.y < 0){
            this.hitWater = true;
        }
    }
    render(){
        super.render();
        if(this.hitWater){
            ctx.globalAlpha = 0.4;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = '#222';
            ctx.fillRect(ctx.canvas.width / 2  - 125, ctx.canvas.height / 2 - 100, 250, 200);
            ctx.font = '50px Impact';
            ctx.fillStyle = '#FFF';
            ctx.textAlign = 'center';
            ctx.fillText('You Won!', ctx.canvas.width/2, ctx.canvas.height/2);

            ctx.font = '20px Arial';
            ctx.fillText('Press Enter To Try Again', ctx.canvas.width/2, ctx.canvas.height/2 + 50);
        }
    }
}

// TODO: Create a item class that then a player collides with it, you pick the item up.


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let enemySprites = [
    'images/enemy-bug.png'
];

let playerSprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

// Temp Variables
// Implement level/score system to create more enemys?
enemy1 = new Enemy(enemySprites, [x = -83, y = 55.5]);
enemy2 = new Enemy(enemySprites, [x = 83, y = 55.5]);
enemy4 = new Enemy(enemySprites, [x = 166, y = 55.5]);
enemy5 = new Enemy(enemySprites, [x = 0, y = 138.5]);
enemy6 = new Enemy(enemySprites, [x = 166, y = 138.5]);
enemy7 = new Enemy(enemySprites, [x = -83, y = 221.75]);
enemy8 = new Enemy(enemySprites, [x = 166, y = 221.75]);

// TODO: let the player choose it's own sprite.
player = new Player(playerSprites, [x = 202.5, y = 404]);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
