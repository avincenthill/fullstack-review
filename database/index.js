const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = mongoose.Schema({
  owner_id: Number,
  owner_name: String,
  repo_name: String,
  repo_stars: Number,
  // repo_data: Array, //TBD insert all GitHub data
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
};

module.exports.save = save;
