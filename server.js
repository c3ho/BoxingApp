// server.js
// where your node app starts

// init project
const express = require('express');
const HTTP_PORT = 8081;
const app = express();
const cors = require('cors');
const members = require('./src/backend/web/routes/members')

app.use(cors());
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use('/members', members);

// http://expressjs.com/en/starter/basic-routing.html
 app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
data.connect().then(()=>{
  app.listen(process.env.PORT || HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
  console.log("Unable to start the server: " + err);
  process.exit();
});
