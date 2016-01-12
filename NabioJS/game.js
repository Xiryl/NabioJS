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