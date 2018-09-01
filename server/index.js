const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('https');
const db = require('../database/index');

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  let msg = `search username ${req.body.username} received by the server\n`;

  app.requestAndSaveGitHubData(req.body.username, process.env.GITHUBTOKEN, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //TBD not sure why eslint hates this
      if (data.length > 0) {
        msg += `\nGitHub API was queried by the server for username ${req.body.username} and provided ${data.length} repos\n`;
        data.forEach(repoObject => {
          db.save({
            // construct object to save to database
            owner_id: repoObject.owner.id,
            owner_name: repoObject.owner.login,
            repo_id: repoObject.id,
            repo_name: repoObject.name,
            repo_stars: repoObject.stargazers_count,
          });
        });
      } else {
        msg += `\nGitHub API was queried by the server for username ${req.body.username} and provided no repos\n`;
      }
    }

    // respond to client
    let responseData = { msg: msg };
    res.status(201).send(responseData);
  });
});


app.requestAndSaveGitHubData = (username, token, cb) => {
  const options = {
    method: 'GET',
    hostname: 'api.github.com',
    port: null,
    path: `/users/${username}/repos?oauth_token=${process.env.GITHUBTOKEN}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1535752811&oauth_nonce=3xT4c8&oauth_version=1.0&oauth_signature=krK9al3iY%20INh%20lgsluNNuUAsVY%3D`,
    headers: {
      'cache-control': 'no-cache',
      'User-Agent': 'repo-fetcher',
    },
  };
  const req = http.request(options, (res) => {
    const chunks = [];
    res.on("data", (chunk) => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const body = Buffer.concat(chunks);
      cb(null, JSON.parse(body.toString()));
    });
  });
  req.end();
};

app.get('/repos', (req, res) => {
  db.getAllRepos((err, data) => {
    res.status(202).send(data);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
