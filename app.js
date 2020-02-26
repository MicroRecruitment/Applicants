'use strict';
const express = require('express');
const http = require('http');

const ctrl = require('./controller.js');

var app = express();
var srv = http.createServer(app);
const PORT = Math.round(Math.random() * 40000);

app.use(express.static('./public'));
var controller = new ctrl();

srv.listen(PORT, function() {
  console.log('Server started on *:' + PORT);
});
