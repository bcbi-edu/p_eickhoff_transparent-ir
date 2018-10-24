import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Welcome from './components/Welcome'
import SearchBar from './components/SearchBar';

function App() {
  return (
    // <body>
    <div>
      <Welcome name="World" />
      <SearchBar />
    </div>
    
    // </body>
  );
}

// ReactDOM.render(<App />, document.querySelector('#app'));

export default App;
