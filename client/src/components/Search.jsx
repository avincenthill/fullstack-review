import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    // TBD fix search nonexistant user problems
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      Enter a github username to add their repos:
      <br></br>
      <input value={this.state.terms} onChange={this.onChange.bind(this)} />
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>)
  }
}

export default Search;