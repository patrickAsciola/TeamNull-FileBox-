var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', express.static('ProjectPrototype'))

/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb", {useNewUrlParser: true});
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var userSchema = new mongoose.Schema({
  UserName: String,
  Password: String,
  Date: Date 
});
var User = mongoose.model("User", userSchema);
*/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/ProjectPrototype/login.html');
  });
  app.get('/signup', function (req, res) {
    fs.readFile('ProjectPrototype/register.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});
app.get('/Account', (req, res) => {
  fs.readFile('ProjectPrototype/account.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});

});
app.get('/Dashboard', (req, res) => {
  fs.readFile('ProjectPrototype/dashboard.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});

});
app.get('/Document', (req, res) => {
  fs.readFile('ProjectPrototype/document.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});

});
app.get('/Friends', (req, res) => {
  fs.readFile('ProjectPrototype/friends.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});

});
app.get('/Friends', (req, res) => {
  fs.readFile('ProjectPrototype/friends.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});

});
app.get('/Groups', (req, res) => {
  fs.readFile('ProjectPrototype/groups.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});

});


/*
app.post("/created", (req, res) => {
  
    let  userName = req.body.userName;
    let  password = req.body.password;
    var sampleObject = {
        UserName: userName,
        Password:password,
        dateMade: new Date(),
    };
 var myData = new User(sampleObject);
  myData.save()
    .then(item => {
      fs.readFile('chatSelect.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
app.post("logIn", (req, res) => {
  
  let  userName = req.body.userName;
  let  password = req.body.password;
  var sampleObject = {
      UserName: userName,
      Password:password,
      dateMade: new Date(),
  };
  res.clearCookie('userName');
  res.cookie("userName", userName)
  
  fs.readFile('chatSelect.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
});
});
*/
//Socket connections

  io.on('connection', function(socket){
   
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    
    console.log('user disconnected');
  });
});
  
http.listen(3000, function(){
  console.log('listening on *:3000');
});

