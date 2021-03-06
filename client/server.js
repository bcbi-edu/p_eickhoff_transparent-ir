'use strict';
var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var cors = require('cors')

app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
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

//CORS
// app.use(function(req, res, next) {
//   var allowedOrigins = ['http://www.localhost:9000'];
//   var origin = req.headers.origin;
//   if(allowedOrigins.indexOf(origin) > -1){
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

app.use(express.static(path.join(__dirname, 'build')));

app.get('/id', function(req, res) {
  res.send(uuidv4());
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//B testing
app.get('/experiment/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/legal', function(req, res) {
    res.sendFile(__dirname + '/legal.html');
  });

//B testing
app.get('/experiment/legal', function(req, res) {
    res.sendFile(__dirname + '/legal2.html');
  });

app.get('/instructions', function(req, res) {
  res.sendFile(__dirname + '/instructions.html');
});

//B testing
app.get('/experiment/instructions', function(req, res) {
  res.sendFile(__dirname + '/instructions2.html');
});

app.get('/verify', function(req, res){
  res.sendFile(__dirname + '/verify.html');
})

app.get('/experiment/verify', function(req, res){
  res.sendFile(__dirname + '/verify.html');
})

app.get('/exit-form', function(req, res){
  res.sendFile(__dirname + '/exit-form.html');
})

app.get('/experiment/exit-form', function(req, res){
  res.sendFile(__dirname + '/exit-form.html');
})

//from verify to exit form
app.post('/success/', function(req, res){
  console.log(req.body)
  var countCorrect = 0;
  if (req.body["Question 1 goes here"] ==  'answer-1') {
    countCorrect++;
  }
  if (req.body["Question 2 goes here"] ==  'answer-4') {
    countCorrect++;
  }
  if (req.body["Question 3 goes here"] ==  'answer-2') {
    countCorrect++;
  }
  if (req.body["Question 4 goes here"] ==  'answer-2') {
    countCorrect++;
  }
  // if (req.body["Question 5 goes here"] ==  'answer-1') {
  //   countCorrect++;
  // }
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var doc = req.body;
    doc["numCorrect"] = countCorrect;
    // insert document to 'users' collection using insertOne
    db.collection("verify").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log(doc);
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });
  });
  if (countCorrect >= 3) {
    
    res.redirect('/exit-form/?id=' + req.body.id);
  }
  else if (countCorrect < 3 && req.body.session >= 4) {
    res.sendFile(__dirname + '/failure.html')
  }
  else {
    var newSession = (Number(req.body.session) + 1).toString();
    res.redirect('experiment/?id=' + req.body.id + '&session=' + newSession + '&correct=' + countCorrect);
  }

})

app.post('/code', function(req, res){
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
  res.redirect('/success/?sid='+req.body.id);
})

app.get('/success', function(req, res) {
  res.sendFile(__dirname + '/success.html');
})

app.get('/experiment/success', function(req, res) {
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
res.sendFile(__dirname + '/failure.html');
})

app.get('/prevLinks', function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // db.collection("links").find({"session": req.query.session, "id": req.query.id})
    db.collection("links").find({"id": req.query.id, "session": parseInt(req.query.session)})
    .toArray(function(err, result) {
      console.log({"session": parseInt(req.query.session), "id": req.query.id})
      console.log(result)
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
  
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
