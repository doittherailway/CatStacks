# CatStacks

Cat Stacks is a browser based game where the goal is to attempt to stack cats on top of each other, without the top cat toppling off the stack.

Play [CatStacks](http://catstacks.herokuapp.com)

![cat_game](https://i.imgur.com/tz1gdL9.gif)

## Architecture and Technologies

* Javascript
* HTML5 Canvas

## Features

### HTML5 Canvas Animation

Using features of Canvas such as requestAnimationFrame (for optimized browser animation), the game and objects within are constantly being redrawn and re-rendered according to player input and simulated physics.

The following code snippet is an example of how each round begins. The scoreboard is rendered, the cats on the screen are pushed down if there is more than 4 to make room for the next falling cat, a new cat is created with knowledge of the previous cat (for collision checking) and begins moving across the top, and then an event listener is enabled to listen for the user keypress event and step the round forward. 

```javascript
startRound() {
        this.renderScoreboard();
        this.boardCats = this.cats;
            
        if (this.cats.length >= 4 && this.prevCatDidTopple === false) {
            this.boardCats = this.cats.slice(this.cats.length-4, this.cats.length);
            this.pushDownCats();
        }

        let lastCat = this.cats.slice(this.cats.length - 1)[0];    
        let newCat = this.addCat(lastCat);
            
        if (!this.gameOver) {
            if (this.cats.length % 5 === 0) {
                this.topCatSpeedMultiplier *= 1.2;
            }
            newCat.topMove(this.ctx, this.translateOffset, this.topCatSpeedMultiplier);
        } else {
            this.gameOverDisplay();
        }

        window.addEventListener('keydown', (e) => {     
            if (e.preventDefaulted) {
                return;  // do nothing if event is already being processed
            }
            if (!this.roundinProgress && !this.gameOver) {
                this.stepRound();
            }
            e.preventDefault();
        });
    }
```


### Cat Gravity

The cats in the game are falling with simulated gravity calculated purely in Javascript, though some liberties had to be taken to make for a challenging yet engaging game.


## Future features

* Increased speed as score gets higher to increase difficulty
* Background music
* Global leaderboard
* Cat animation
* Cat SFX


## Art Credits

* Pixel Cat [Daniel Scofano](https://www.instagram.com/scofanogd/)
* Fish [Exciteszz](https://opengameart.org/users/exciteszz)
* Sky Background [Paulina Riva](https://www.patreon.com/paulinariva)
* Sad Pixel Cat modified by Sandi Rail
