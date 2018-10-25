'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io').listen(server);

app.get('/legal', function(req, res) {
    res.sendFile(__dirname + '/legal.html');
  });

app.get('/instructions', function(req, res) {
  res.sendFile(__dirname + '/instructions.html');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});