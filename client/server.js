'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var cors = require('cors');
app.use(cors());
// var io = require('socket.io').listen(server);

app.get('/legal', function(req, res) {
    res.sendFile(__dirname + '/legal.html');
  });

app.get('/instructions', function(req, res) {
  res.sendFile(__dirname + '/instructions.html');
});

app.get('/result', function (req, res) {
  console.log("CLICKED");
  res.sendFile (__dirname + '/instructions.html');
  // res.render(__dirname + '/results', { title: 'Hello World!' });
  // res.sendFile();
})

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});