var express = require('express');
var app =  require('express')();

var http=require('http').Server(app);
//var http=require('http');
//var server=http.createServer(app);
//var io= require('socket.io').listen(server);
var server= app.listen(3000);

var io=require('socket.io').listen(server);

app.use(express.static(__dirname + '/public')); // handling static files
//app.listen(process.env.PORT || 3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
   console.log('a user connected ');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });



    // (2): The server recieves a ping event
    // from the browser on this socket
    socket.on('ping', function ( data ) {

        console.log('socket: server recieves ping (2)');

        // (3): Return a pong event to the browser
        // echoing back the data from the ping event
        socket.emit( 'pong', data );

        console.log('socket: server sends pong (3)');

    });


    socket.on( 'draw', function( data, session ) {
        //console.log( "session " + session + " drew:");
        //console.log( data );
        socket.broadcast.emit( 'draw', data );
    })

});
console.log("server is running at 3000");