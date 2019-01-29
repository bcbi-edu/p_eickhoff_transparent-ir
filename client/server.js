'use strict';
var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));

//allow CORS
// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

const port = process.env.PORT || 9000;
var url ='mongodb://jeromer241:ILikeFru1ts@ds131954.mlab.com:31954/research';

app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/images', express.static(__dirname + "/images"));

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

app.get('/id', function(req, res) {
  res.send(uuidv4());
});

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// }
// app.get('/', (req, res) => {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// 	res.sendFile(__dirname + '/build/index.html');
// });

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
