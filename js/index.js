



const canvas = document.querySelector('canvas')
const scoreBox = document.querySelector('#score')
let score = 0
const ctx = canvas.getContext('2d')

const boxSize = 25
const gameZone = {
    rows: 20,
    cols: 20
}

canvas.width = boxSize * gameZone.cols
canvas.height = boxSize * gameZone.rows

const playerVelocity = 1

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

let lastKey = ''
const moveDelay = 100;
let gameOver = false




class Snake {
    constructor() {
        this.position = {
            x: boxSize * 5,
            y: boxSize * 5
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.size = boxSize
        this.body = [],
            this.playerVelocity = playerVelocity,
            this.speed = 1
    }

    draw() {
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = '#262525'
            ctx.fillRect(this.body[i][0], this.body[i][1], this.size, this.size);
        }
    }

    update() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }
        if (this.body.length) {
            this.body[0] = [this.position.x, this.position.y];
        }


        this.position.x += this.velocity.x * this.size
        this.position.y += this.velocity.y * this.size




        this.draw()

    }
}

function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * gameZone.cols) * boxSize;
    foodY = Math.floor(Math.random() * gameZone.rows) * boxSize;
}

const player = new Snake({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


window.onload = function () {

    window.addEventListener('keydown', ({ keyCode }) => {

        switch (keyCode) {
            case 87:
                keys.w.pressed = true
                lastKey = 'w'
                break
            case 65:
                keys.a.pressed = true
                lastKey = 'a'
                break;
            case 83:
                keys.s.pressed = true
                lastKey = 's'
                break
            case 68:
                keys.d.pressed = true
                lastKey = 'd'
                break;
        }

    })

    window.addEventListener('keyup', ({ keyCode }) => {

        switch (keyCode) {
            case 87:
                keys.w.pressed = false
                break
            case 65:
                keys.a.pressed = false
                break;
            case 83:
                keys.s.pressed = false
                break
            case 68:
                keys.d.pressed = false
                break;
        }

    })

    placeFood()

    setInterval(animate, moveDelay);

}


function animate() {

    if (gameOver) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (player.position.x < 0 || player.position.x > gameZone.cols * boxSize || player.position.y < 0 || player.position.y > gameZone.rows * boxSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < player.body.length; i++) {
        if (player.position.x == player.body[i][0] && player.position.y == player.body[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, boxSize, boxSize);


    if (keys.w.pressed && lastKey === 'w') {
        if (player.velocity.y > 0 && player.body.length > 0) {

        } else {
            player.velocity.x = 0
            player.velocity.y = -player.playerVelocity
        }

        console.log('move up')
    } else if (keys.a.pressed && lastKey === 'a') {
        if (player.velocity.x > 0 && player.body.length > 0) {

        } else {
            player.velocity.x = -player.playerVelocity
            player.velocity.y = 0
        }
        console.log('move left')
    } else if (keys.s.pressed && lastKey === 's') {
        if (player.velocity.y < 0 && player.body.length > 0) {

        } else {
            player.velocity.x = 0
            player.velocity.y = player.playerVelocity
        }
        console.log('move down')
    } else if (keys.d.pressed && lastKey === 'd') {
        if (player.velocity.x < 0 && player.body.length > 0) {

        } else {
            player.velocity.x = player.playerVelocity
            player.velocity.y = 0
        }
        console.log('move right')
    }

    if (player.position.x === foodX && player.position.y === foodY) {
        player.body.push([foodX, foodY])
        score += 10
        scoreBox.innerHTML = score
        placeFood()
    }



    player.update()


}


