import React from 'react';
import SearchBar from './components/SearchBar';
import './components/Styles.css';
import Welcome from './components/Welcome.js'
import {Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
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
  }

  componentWillMount() {
    var startTime = new Date();
    console.log("START TIME", startTime);
    this.setState({
      startTime: startTime
    })
  }

  handleClick(event) {
    var id = getParameterByName('id');
    var currTime = new Date();
    var diff = Math.abs(currTime - this.state.startTime)
    window.confirm("Are you finished with the study? (After you hit confirm, you are not allowed to return back to this page)");
    window.location = `/exit-form?id=${id}?time=${diff}`;
    event.preventDefault();
  }
  render() {
    return (
      // <BrowserRouter>
      <div className="app">
        <h1 className="title">Search Engine</h1>
        <button onClick={this.handleClick}>Finished with Study</button>
        <SearchBar />
        {/* <Route path="/simulation/" component={SearchBar} />
        <Route path="/welcome/" component={Welcome} />
        <Route path="/legal/" render={() => {window.location.href="legal.html"}}/>
        <Route path="/instructions/" component={Instructions} /> */}
      </div>
      // </BrowserRouter>

    );
  }
  
}

// ReactDOM.render(<App />, document.querySelector('#app'));

export default App;
