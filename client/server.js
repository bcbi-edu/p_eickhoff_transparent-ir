'use strict';
var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

const port = process.env.PORT || 9000;
var url ='mongodb://jeromer241:ILikeFru1ts@ds131954.mlab.com:31954/research';

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/simulation', function(req, res) {
  res.sendFile('./build/index.html');
});

app.get('/legal', function(req, res) {
    res.sendFile(__dirname + '/legal.html');
  });

app.get('/instructions', function(req, res) {
  res.sendFile(__dirname + '/instructions.html');
});

app.get('/exit-form', function(req, res){
  res.sendFile(__dirname + '/exit-form.html');
})

app.post('/success', function(req, res){
  // console.log(req.body)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var doc = req.body;
    // insert document to 'users' collection using insertOne
    db.collection("responses").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});
  res.sendFile(__dirname + '/success.html');
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});