const mongoose = require('mongoose');

const db = {};
mongoose.connect('mongodb://localhost:27017/fetcher');

const repoSchema = mongoose.Schema({
  owner_id: Number,
  owner_name: String,
  repo_id: Number,
  repo_name: String,
  repo_stars: Number,
});

const Repo = mongoose.model('Repo', repoSchema);

db.save = (obj) => {
  const repo = new Repo(obj);
  let msg = '';

  // check if in db already
  Repo.find({ repo_id: obj.repo_id }, (err, dbResult) => {
    if (!dbResult[0]) {
      repo.save((err) => {
        if (err) {
          console.log(err);
        }
        console.log(obj.repo_name, 'added to db');
      });
    } else {
      console.log(obj.repo_name, 'already in db');
    }
  });

  // db.findRepo(obj.repo_id, (null, data) => {
  //   if(data) {
  //     repo.save((err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       msg += obj.repo_name + ' was saved to the database by the server';
  //     });
  //   } else {
  //     msg += obj.repo_name + ' already in db';
  //   }
  //   console.log(msg);
  // });

};

db.findRepo = (repoID, cb) => {
  Repo.find({ repo_id: repoID }, (err, dbResult) => cb(err, dbResult[0]));
};

db.getAllRepos = (cb) => {
  Repo.find(null, (err, dbResult) => cb(err, dbResult));
};

module.exports = db;
