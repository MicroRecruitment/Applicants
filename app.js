'use strict';
const express = require('express');
const io = require('socket.io');
const http = require('http');


var app = express();
var srv = http.createServer(app);
var socket = io(srv);
const PORT = 8080;

app.use(express.static('./public'));

srv.listen(PORT, function(){
  console.log('Server started on *:' + PORT);
});
