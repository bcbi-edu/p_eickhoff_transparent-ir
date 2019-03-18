import React from 'react';
import SearchBar from './components/SearchBar';
import './components/Styles.css';
import axios from 'axios'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.startTime = null;
    this.ref = React.createRef();
    this.id = null;
    this.session = null;
  }

  componentDidMount() {
    var numCorrect = getParameterByName("correct", window.location.href);
    if (numCorrect != null) {
      alert("You got " + numCorrect + " question(s) correct")
    }
  }
  componentWillMount() {
    var startTime = new Date();
    var id = this.getParameterByName('id');
    if (id === null) {
      id = uuidv4()
    }
    var session = this.getParameterByName('session');
    this.setState({
      startTime: startTime,
      id: id,
      session: session
    })
    
  }
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  handleClick(event) {
    if(window.confirm("WARNING: The queries you search for, links you favorite, and time it takes for you to complete the experiment are all recorded. If it appears that you have not made an honest attempt at the experiment, your experiment will be rejected.")) {
      if (window.confirm("Have you starred documents you found relevant?") && window.confirm("Are you finished with the study? (After you hit confirm, you are not allowed to return back to this page)")) {
        var id = this.state.id;
        var currTime = new Date();
        var diff = Math.abs(currTime - this.state.startTime)
        var links = Array.from(this.ref.current.state.links);
        var queries = Array.from(this.ref.current.state.queries)
        var session = this.state.session;
        if (session === null) {
          session = 1;
        }
        var body = {
          id: id,
          links: links,
          session: session,
          queries: queries,
          time: diff
        }
        axios.post(`https://ir-sim.herokuapp.com/links`, body)
        // axios.post(`localhost:9000/links`, body)
        .then(res => {
        
        window.location = `/verify?id=${id}&time=${diff}&session=${session}`;
        })
      }
    }
    
    
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
