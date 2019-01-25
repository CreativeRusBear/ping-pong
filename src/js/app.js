window.onload = function () {
    renderer();
};

//canvas settings
const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

//OBJECTS
//user's rocket
const user = {
    x: 0,
    y: canvas.height/2-200/2,
    width: 20,
    height: 200,
    color: 'white',
    score: 0
},
//computer's rocket
comp = {
    x:canvas.width-20,
    y: canvas.height/2-200/2,
    width: 20,
    height: 200,
    color: 'white',
    score: 0
},
ball ={
    x: canvas.width/2,
    y: canvas.height/2,
    r: 15,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
};

//function for draw elements
function drawRect(x,y,width,height,color) {
    ctx.fillStyle=color;
    ctx.fillRect(x,y,width,height);
}
function drawCircle(x,y,r,color) {
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI,false);
    ctx.fill();
}
function drawText(x,y,text,color) {
    ctx.fillStyle=color;
    ctx.font='45px century gothic';
    ctx.fillText(text,x,y);
}
function drawNet(lineWidth,space,color) {
    ctx.strokeStyle = color;
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.setLineDash([lineWidth,space]);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

//for move rocket
canvas.addEventListener('mousemove', moveRocket);
//function for move user's rocket
function moveRocket(event) {
    let rect =  canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height/2;
}

//collision between the ball and the player’s racket
function collision(ball,player) {
    ball.top = ball.y-ball.r;
    ball.bottom = ball.y+ball.r;
    ball.right =ball.x+ball.r;
    ball.left = ball.x-ball.r;

    player.top = player.y;
    player.bottom = player.y+player.height;
    player.right = player.x+player.width;
    player.left = player.x;

    return ball.right>player.left &&  ball.bottom>player.top && ball.left<player.right && ball.top<player.bottom;
}

//if user's or computer's score is increased
function reset() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed=5;
    ball.velocityX = -ball.velocityX;
}

//function for render
function renderer(){
    //update data
    update();
    //draw field
    drawRect(0,0, canvas.width, canvas.height,'black');
    //draw net
    drawNet(25,10,'white');
    //draw score
    drawText(canvas.width/4,canvas.height/5, user.score, 'white');
    drawText(3*canvas.width/4,canvas.height/5, comp.score, 'white');
    //draw ball
    drawCircle(ball.x, ball.y, ball.r, 'white');
    //draw rockets
    drawRect(user.x, user.y, user.width, user.height, 'white');
    drawRect(comp.x, comp.y, comp.width, comp.height, 'white');
    requestAnimationFrame(renderer)
}

//function for update data
function update() {
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    //ai for computer's rocket
    let compLVL=.1;
    comp.y += (ball.y-(comp.y+comp.height/2))*compLVL;

    // kick the ball against the top or bottom wall
    if (ball.y+ball.r>canvas.height  || ball.y-ball.r<0){
        ball.velocityY=-ball.velocityY;
    }
    let player = (ball.x<canvas.width/2) ? user : comp;
    if(collision(ball,player)){
        //ball hit the player's rocket
        let collidePoint = ball.y-(player.y+player.height/2);

        //normalization
        collidePoint/=player.height/2;

        //calc angle in radian
        let angleRadian =collidePoint*Math.PI/4;

        //x direction of the ball when it's hit
        let direction = (ball.x<canvas.width/2) ? 1 : -1;
        //change ball's velocity
        ball.velocityX=direction * ball.speed*Math.cos(angleRadian);
        ball.velocityY=ball.speed*Math.sin(angleRadian);

        // when the ball hits the racket, than increase ball's speed
        ball.speed+=.6;
    }
    //update score
    if (ball.x- ball.r<0){
        comp.score++;
        reset();
    }else if (ball.x+ball.r>canvas.width){
        user.score++;
        reset();
    }
}

import '../css/style.css';
