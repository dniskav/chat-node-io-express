'use strict';

var app = window.app || {};

app.socket = io.connect('http://localhost:9090'); 

app.procMsg = function(data) {
	console.log(data);
}

app.init = (function() {
	app.socket.on('msg', app.procMsg);
})();