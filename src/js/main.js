'use strict';

var app = window.app || {};

app.socket = io.connect('http://localhost:9090'); 

app.sendMsg = function(name, msg) {
  app.socket.emit('msg', {name : name, msg : msg});
}

app.procMsg = function(data) {
	var msg = $('<p></p>').addClass('bg-success').html(data.msg);
	app.chatContainer.append(msg);
};

app.init = (function() {
	app.chatContainer = $('#msgWindow');
  app.chatform = $('#chatform');
  app.chatBox = $('#chatBox');
	app.socket.on('msg', app.procMsg);

  app.chatform.on('submit', function(e) {
    e.preventDefault();

    var name = "dummy name",
        msg = app.chatBox.val();
    app.sendMsg(name, msg);
  });

})();