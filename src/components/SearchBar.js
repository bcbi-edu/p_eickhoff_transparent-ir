import React from 'react';
import Suggestions from './Suggestions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: [{"id": 1, "title": "Title", "name": "yo"}, {"id": 3,"title": "title", "name": "hiyo"}]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const results = this.state.results;
    results.push({"id": 3,"title": "title", "name": this.state.value})
    this.setState({
      results: results,
      value: '',
    })
    // console.log({this.state.value});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

export default SearchBar;