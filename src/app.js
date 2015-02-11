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

  //listen the client messages
  client.on('msg', function(msg) {
    client.broadcast.emit('msg', { name : client.nick, msg : msg});
    client.emit('msg', { name : client.nick, msg : msg});
  });

  // setup the join method
    client.on('join', function(name) {
      client.nick = name;
      client.emit('msg', {name : name, msg : 'Connected to chat'});
    });
});


server.listen(9090);