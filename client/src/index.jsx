import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      serverURL: `https://avh-fullstack-review.herokuapp.com:${process.env.PORT}/repos`
      // TBD fix this hardcoded server address
    }
  }

  search(term) {
    if (term === '') {
      term = 'default';
    };
    console.log(`${term} was searched by the client`);

    $.ajax({
      method: 'POST',
      url: this.state.serverURL,
      data: { username: term },
      success: (res) => {
        console.log(res.msg);
      }
    });
  }

  //TBD make sorting happen in the database not client
  sortRepos(repoArray) {
    const compareRepos = (a, b) => {
      if (a.repo_stars > b.repo_stars) {
        return -1;
      }
      if (a.repo_stars < b.repo_stars) {
        return 1;
      }
      return 0;
    }

    return repoArray.sort(compareRepos).slice(0, 25);
  }

  getAllRepos() {
    return $.ajax({
      method: 'GET',
      url: this.state.serverURL,
      success: (res) => {
        return this.setState({ repos: this.sortRepos(res) })
        console.log(`client got all repos`);
      }
    });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList getAllRepos={this.getAllRepos.bind(this)} repos={this.state.repos} />
    </div>)
  }
}

// render app
ReactDOM.render(<App />, document.getElementById('app'));