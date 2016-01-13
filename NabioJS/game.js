var canvas = document.getElementById("the-game");
var context = canvas.getContext("2d");

/*
============
OGGETTO GAME
============


-SCORE
-STATO DEL GIOCO
-DISPLAY

*/
game = {
    //variabili di gioco
    score: 0,
    fps: 8,
    over: false,
    message: null,

    //allo start azzero tutti i dati
    start: function () {
        game.over = false;
        game.message = null;
        game.score = 0;
        game.fps = 8;
        snake.init();
        food.set();
    },

    stop: function () {
        game.over = true;
        game.message = 'GAME OVER - PRESS SPACE';
    },


    //RETTANGOLO, disegno food, e mrsnake insieme
    drawBox: function (x, y, size, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x - (size / 2), y - (size / 2));
        context.lineTo(x + (size / 2), y - (size / 2));
        context.lineTo(x + (size / 2), y + (size / 2));
        context.lineTo(x - (size / 2), y + (size / 2));
        context.closePath();
        context.fill();
    },

    //Score in alto a sx ALL'INTERNO del canvas
    drawScore: function () {
        context.fillStyle = '#000';
        context.font = 11 + 'px Impact, sans-serif';
        context.fillText("SCORE:" + game.score, 10, 10);
    },

    //Messaggio "centrato" nel canvas. --> per il game over
    drawMessage: function () {
        if (game.message !== null) {
            context.fillStyle = '#00F';
            context.strokeStyle = '#FFF';
            context.font = (canvas.height / 10) + 'px Impact';
            context.textAlign = 'center';
            context.fillText(game.message, canvas.width / 2, canvas.height / 2);
            context.strokeText(game.message, canvas.width / 2, canvas.height / 2);
        }
    },

    //clear func per canvas
    resetCanvas: function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

};

game.drawScore();






/*
============
OGGETTO SNAKE
============


-SIZE : grandezza snake
-x,y per posizione
-COLOR: colore
-NAME: soprannome
-DIRECTION: lo gestisco per singolo snake --> always start on left
-SECTIONS: sezioni (array di cubi)

*/
snake = {

    size: canvas.width / 40,
    x: null,
    y: null,
    color: 'yellow',
    name: 'MrSnake',
    direction: 'left',
    sections: [],

    init: function () {
        snake.sections = [];
        snake.direction = 'left';
        //start in centro del canvas
        snake.x = canvas.width / 2 + snake.size / 2;
        snake.y = canvas.height / 2 + snake.size / 2;
        for (i = snake.x + (5 * snake.size) ; i >= snake.x; i -= snake.size) {
            snake.sections.push(i + ',' + snake.y);
        }
    },

    move: function () {
        switch (snake.direction) {
            case 'up':
                snake.y -= snake.size;
                break;
            case 'down':
                snake.y += snake.size;
                break;
            case 'left':
                snake.x -= snake.size;
                break;
            case 'right':
                snake.x += snake.size;
                break;
        }
        snake.checkCollision();
        snake.checkGrowth();
        snake.sections.push(snake.x + ',' + snake.y);
    },

    draw: function () {
        for (i = 0; i < snake.sections.length; i++) {
            snake.drawSection(snake.sections[i].split(','));
        }
    },

    drawSection: function (section) {
        game.drawBox(parseInt(section[0]), parseInt(section[1]), snake.size, snake.color);
    },

    checkCollision: function () {
        if (snake.isCollision(snake.x, snake.y) === true) {
            game.stop();
        }
    },

    isCollision: function (x, y) {
        if (x < snake.size / 2 ||
            x > canvas.width ||
            y < snake.size / 2 ||
            y > canvas.height ||
            snake.sections.indexOf(x + ',' + y) >= 0) {
            return true;
        }
    },

    checkGrowth: function () {
        if (snake.x == food.x && snake.y == food.y) {
            game.score++;
            if (game.score % 5 == 0 && game.fps < 60) {
                game.fps++;
            }
            food.set();
        } else {
            snake.sections.shift();
        }
    }

};