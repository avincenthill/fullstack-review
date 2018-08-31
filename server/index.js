const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  let msg = `search username ${req.body.username} received by the server\n`;
  const { username } = req.body;
  const gitHubUrl = `https://api.github.com/users/${username}/repos`;

  // TBD take the github username provided (req.body.username) and get the repo information from the github API
  msg = msg + `\nGitHub API was queried by the server and provided data\n`

  // TBD save the repo information in the database
  msg = msg + `\ndata was saved to the database by the server\n`

  let responseData = { msg: msg };


  res.status(201).send(responseData);
});

app.get('/repos', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

