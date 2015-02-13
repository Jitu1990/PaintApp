/**
 * Created by Jitendra on 2/13/15.
 */
var socket= io.connect('/');
// (1): Send a ping event with
// some data to the server
console.log( "socket: browser says ping (1)" );
socket.emit('ping', "hello i am browser" );

// (4): When the browser receives a pong event
// console log a message and the events data
socket.on('pong', function (data) {
    console.log( 'socket: browser receives pong (4)', data );
});

 //global declaration

var el = document.getElementById('paper');
var ctx = el.getContext('2d');
//var isDrawing;

var prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;
var flag=false,dot_flag=false;
var x="black";


// for selecting color
$('.clr').on('click',function(evt){
    var id= evt.target.id;

    x=$("#"+id).css("background-color");
}) // end choosing color

// handling miuseDown event
el.onmousedown = function(e) {

    findxy('down',e);
};

//handling mousemove event
el.onmousemove = function(e) {

    findxy('move',e);
};

//handling mouseup event
el.onmouseup = function() {
    flag = false;
};

el.onmouseout = function() {
    flag = false;
};

// find real coordinates
function findxy(res,e){
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - el.offsetLeft;
        currY = e.clientY - el.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }

    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - el.offsetLeft;
            currY = e.clientY - el.offsetTop;
            draw();
        }
    }
}

//draw a line
function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}
