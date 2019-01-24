'use strict';
var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));

var id = ['f44d2f86-be82-425f-a3f9-51e952258a83',
  '3008166b-92ed-4ac8-b603-7ea496d874ba',
  '90c80426-a8d3-4172-9338-07c895d726ff',
  '5bb2c0a3-dd98-49b3-b179-1a0b9ddd7e0b',
  'b1e7c790-201f-441e-88d3-ece1adda85c0',
  '57b04eb7-99c7-4767-ac7f-7fa740b08db7',
  '47e1dea0-e29c-4dd3-81ec-57e6f1f09e3f',
  '464f1d83-c832-435c-b774-406cd5e79ea3',
  'a6b2260a-c86e-4075-b5c0-dda6b0aab676',
  'afa0e3cb-cc9e-4a51-b2cd-71d34a171efb',
  'c9e0980b-9163-46ab-98bc-63a822a45a27',
  '25e61d80-8207-4157-a5f8-b89e2817b5a9',
  'e5fd7864-6e53-40f0-9b9e-7ee717c39621',
  '1df6272d-1bb4-491c-83c1-21db55a4beb0',
  '0dbedd93-06fe-46ac-afbf-5c1c482622e4',
  '5ddb6389-1da6-4fec-ba7d-aa98bdec1f34',
  '77ca4ef7-7b4f-4bc2-9337-2d010db1d9eb',
  '70a7cc60-a84b-4e6b-9f1c-dadfdb93c151',
  '92c4d243-e5a3-4737-9ef6-1df04d5063c0',
  '7b8f9eff-8923-4a65-b965-f05f2fd07b93']

var curr = 0;

//allow CORS
// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

const port = process.env.PORT || 9000;
var url ='mongodb://jeromer241:ILikeFru1ts@ds131954.mlab.com:31954/research';

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/images', express.static(__dirname + "/images"));

app.get('/id', function(req, res) {
  res.send(id[curr]);
  curr++;
});

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

app.post('/success/', function(req, res){
  // console.log(req.body)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var doc = req.body;
    // insert document to 'users' collection using insertOne
    db.collection("responses").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log(doc);
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});
  res.redirect('/success/?sid=' + req.body.id);

})

app.get('/success', function(req, res) {
  res.sendFile(__dirname + '/success.html');
})

app.post('/links', function(req, res){
  // console.log(req.body)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var doc = req.body;
    // insert document to 'users' collection using insertOne
    db.collection("links").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log(doc);
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});
  res.sendFile(__dirname + '/exit-form.html');
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
