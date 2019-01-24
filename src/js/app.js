//canvas settings
const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
window.onload = function () {
    console.log(user)
};

//user's rocket
const user = {
    x: 0,
    y: document.documentElement.clientHeight/2-100/2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
},
//computer's rocket
comp = {
    x:document.documentElement.clientWidth-10,
    y: document.documentElement.clientHeight/2-100/2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
},
ball ={
    x: document.documentElement.clientWidth/2,
    y: document.documentElement.clientHeight/2,
    r: 10,
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
    ctx.font='45px century gothic'
    ctx.fillText(text,x,y);
}

//function for render
function renderer(){
    canvas.setAttribute('width', document.documentElement.clientWidth);
    canvas.setAttribute('height', document.documentElement.clientHeight);
    drawRect(0,0, canvas.width, canvas.height,'black');
    drawNet();
    drawText(ctx.width/4,ctx.height/5, user.score, 'white');
}
//settings for canvas's window
canvas.setAttribute('width', document.documentElement.clientWidth);
canvas.setAttribute('height', document.documentElement.clientHeight);
drawRect(0,0, canvas.width, canvas.height,'black');

drawCircle(50,50,10,'white');
drawText(200,300,'Some Text', 'white');


