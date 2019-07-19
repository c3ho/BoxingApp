// server.js
// where your node app starts

// init project
const MONGO_URI = 'mongodb+srv://test:tester123@cluster0-l5exq.mongodb.net/test?retryWrites=true&w=majority'
const express = require('express');
const bodyParser = require('body-parser');
const HTTP_PORT = 8081;
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

//adds new member
// app.post('/members', (req,res)=>{
//   data.enrollMember(req.body).then((data)=>{
//     res.json({"message": "Member added successfully"});
//   })
//   .catch((err)=>{
//     res.status(500).end();
//   })
// });

//returns all members
app.get('/members', function(req, res){
  data.findAll().then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.status(500).end();
  })
});

//returns member with firstName, lastName
app.get('/members/:firstName&:lastName', function(req, res){
  const firstName = req.params.firstName;
  const lastName = req.params.lastName;
  data.findMember(firstName,lastName).then((data)=>{
    if (data.length > 0)
      res.json(data);
    else
      res.status(404).end();
  })
  .catch((err)=>{
    res.status(500).end();
  })
})

// listen for requests :)
data.connect().then(()=>{
  app.listen(process.env.PORT || HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
  console.log("Unable to start the server: " + err);
  process.exit();
});
