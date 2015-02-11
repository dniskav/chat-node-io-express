'use strict';
var express = require('express'),
    views = '/views/',
    app = express(),
    redis = require('redis'),
    client = redis.createClient(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/styles', express.static(__dirname + '/styles'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + views + 'index.html');
});

io.on('connection', function(client) {
  console.log('Client: ', '', 'connected' );

  client.emit('msg', {msg : 'Connected to chat'})
});


server.listen(9090);