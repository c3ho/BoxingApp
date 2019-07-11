// server.js
// where your node app starts

// init project
const MONGO_URI = 'mongodb+srv://test:tester123@cluster0-l5exq.mongodb.net/test?retryWrites=true&w=majority'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dataService = require("./data-service.js");
const data = dataService(MONGO_URI);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//returns all members
app.get('/members', function(req, res){
  res.send(findMembers())
})
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
