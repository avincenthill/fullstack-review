import React from 'react';

// TBD render repos from props repoList
const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;