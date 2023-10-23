const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const modal = document.querySelector('.modal')
const text = document.querySelector('.modal__text')
const btn = document.querySelector('.modal__btn')


btn.addEventListener('click', () => {
    modal.classList.toggle('active')
})

const tableImg = new Image();
tableImg.src = "/images/snaketable.png";

const imgFood = new Image();
imgFood.src = "/images/foodimage.png";

const sizeBox = 32;
let score = 0;

let snake = [];
snake[0] = {
    x: 9 * sizeBox,
    y: 10 * sizeBox
}

document.addEventListener("keydown", direction);

let dir;
const left = "l";
const right = "r";
const up = "u";
const down = "d";
const space = "s"

function checkDirection(directionToCheck) {
    return dir === directionToCheck;
}

function direction(e) {
    switch (e.keyCode) {
        case 32:
            start();
            break;
        case 37:
            if (!checkDirection(right)) dir = left;
            break;
        case 38:
            if (!checkDirection(down)) dir = up;
            break;
        case 39:
            if (!checkDirection(left)) dir = right;
            break;
        case 40:
            if (!checkDirection(up)) dir = down;
            break;
    }
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * sizeBox,
    y: Math.floor(Math.random() * 15 + 3) * sizeBox
};

function gameOver() {
    modal.classList.add('active');
    text.textContent += `${score} очков`;
}

function eatBody(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            clearInterval(interval);
            speed = 110;
            gameOver();
        }
    }
}

function draw() {
    context.drawImage(tableImg, 0, 0);
    context.drawImage(imgFood, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, sizeBox, sizeBox)
    }
    context.fillStyle = "white";
    context.font = "35px Arial";
    context.fillText(score, sizeBox * 2.5, sizeBox * 1.58);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score += 1;
        speed += 2;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * sizeBox,
            y: Math.floor(Math.random() * 15 + 3) * sizeBox
        }

    } else {
        snake.pop();
    }
    if (snakeX < sizeBox || snakeX > sizeBox * 17
        || snakeY < 3 * sizeBox || snakeY > sizeBox * 17) {
        clearInterval(interval);
        speed = 110;
    }
    if (dir === left) snakeX -= sizeBox;
    if (dir === right) snakeX += sizeBox;
    if (dir === up) snakeY -= sizeBox;
    if (dir === down) snakeY += sizeBox;

    let newWay = {
        x: snakeX,
        y: snakeY
    };

    eatBody(newWay, snake);

    snake.unshift(newWay);
}

let speed = 110;
let interval = setInterval(draw, speed);

function start() {
    snake.splice(1);
    clearInterval(interval);
    interval = setInterval(draw, speed);
    speed = 110;
    score = 0;
    dir = 0;
    snake[0] = {
        x: 9 * sizeBox,
        y: 10 * sizeBox
    }
    food = {
        x: Math.floor(Math.random() * 17 + 1) * sizeBox,
        y: Math.floor(Math.random() * 15 + 3) * sizeBox
    }
}








