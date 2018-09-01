import React from 'react';

// TBD render repos from props repoList
class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllRepos();
  }

  //TBD learn to render adjacent JSX components
  render() {
    return (
      <div>
        {this.props.repos.map((repo, index) => {
          return (
            <a href={`https://github.com/${repo.owner_name}/${repo.repo_name}`} key={index}>{repo.repo_stars + '*s for ' + repo.repo_name + ' by ' + repo.owner_name}<br /></a>
          )
        })}
        <br></br>
        There are {this.props.repos.length} repos.
      </div>
    )
  }
}

export default RepoList;