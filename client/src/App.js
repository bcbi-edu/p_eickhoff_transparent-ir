import React from 'react';
import Welcome from './components/Welcome'
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
          <Link to="/">Home</Link>  
          </li>
          <li>
            <Link to="/search">Go to Search</Link>
          </li>
        </ul>
        <hr />
        <Welcome name="World" />
        <SearchBar></SearchBar>
        <Route exact path="/" component={Welcome} />
        <Route path="/about" component={SearchBar} />
      </div>
    </Router>
    
    
    // </body>
  );
}

// ReactDOM.render(<App />, document.querySelector('#app'));

export default App;
