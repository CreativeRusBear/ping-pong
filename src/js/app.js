//canvas settings
const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
window.onload = function () {
    renderer();
};

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
    // ctx.closePath();
}

//function for render
function renderer(){
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
}

