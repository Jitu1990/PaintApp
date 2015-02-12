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
});
console.log("server is running at 3000");