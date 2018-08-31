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
      serverURL: `http://localhost:1337/repos`
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

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

// render app
ReactDOM.render(<App />, document.getElementById('app'));