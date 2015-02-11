'use strict';

var app = window.app || {};

app.socket = io.connect('http://localhost:9090'); 

app.sendMsg = function(msg) {
  app.socket.emit('msg', msg);
}

app.procMsg = function(data) {
	var msg = $('<p></p>').addClass('bg-success').html(data.name + ' : ' + data.msg);
	app.chatContainer.append(msg);
};

app.init = (function() {
	app.chatContainer = $('#msgWindow');
  app.chatform = $('#chatform');
  app.chatBox = $('#chatBox');
	app.socket.on('msg', app.procMsg);

  app.chatform.on('submit', function(e) {
    e.preventDefault();

    var msg = app.chatBox.val();
    app.chatBox.val('')
    app.sendMsg(msg);
  });

  app.socket.on('connect', function() {
    var nick = prompt('write your name');

    app.socket.emit('join', nick);
  });
})();