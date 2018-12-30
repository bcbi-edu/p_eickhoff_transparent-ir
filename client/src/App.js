import React from 'react';
import SearchBar from './components/SearchBar';
import './components/Styles.css';
import axios from 'axios'

// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, '\\$&');
//   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.startTime = null;
    this.ref = React.createRef();
  }

  componentWillMount() {
    var startTime = new Date();
    console.log("START TIME", startTime);
    this.setState({
      startTime: startTime
    })
  }

  handleClick(event) {
    // var id = getParameterByName('id');
    var id = 'none';
    axios.get(`http://localhost:9000/id`)
    .then(res => {
      id = res.data;
      var currTime = new Date();
      var diff = Math.abs(currTime - this.state.startTime)
      var links = Array.from(this.ref.current.state.links);
      var body = {
        id: id,
        links: links
      }
      console.log(links);
      if (window.confirm("Are you finished with the study? (After you hit confirm, you are not allowed to return back to this page)")) {
        console.log(body)
        axios.post(`http://localhost:9000/links`, body)
        .then(res => {
        
        window.location = `/exit-form?id=${id}&time=${diff}`;
        })
      }
    })
    
    event.preventDefault();
  }
  render() {
    return (
      <div className="app">
        <h1 className="title">Search Engine</h1>
        <button onClick={this.handleClick}>Finished with Study</button>
        <SearchBar ref={this.ref}/>
      </div>

    );
  }
  
}

export default App;
