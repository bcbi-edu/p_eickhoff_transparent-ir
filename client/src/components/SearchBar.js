import React from 'react';
// import Suggestions from './Suggestions';
import {HorizontalBar} from 'react-chartjs-2';
import {getOptions, getHeight, createDataSet, toTitleCase, capitalizeFirstLetter} from './Util';
import axios from 'axios'
import './Styles.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "what is supersonic",
      colors: this.getRandomColor("lucene"),
      submitted: false,
      data: [],
      lastQuery: "",
      isResults: true,
      title: "",
      text: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const val = this.state.value;
    var colors = this.getRandomColor(val)
    axios.get(`http://localhost:8080/search?name=${this.state.value}`)
      .then(res => {
        const data = res.data.data;
        // console.log("DATA", data);
        this.setState({ 
          data: this.updateJson(data),
          value: "",
          submitted: true,
          colors: colors,
          lastQuery: val,
          isResults: true,
          desc: ""
        });
        if (data === {}) {
          this.setState({
            submitted: false
          })
        }
        // console.log("CURR", this.state.data)

      })
    event.preventDefault();
  }


  handleDescription = (text) => (event) => {
    var split = text.split(" . ");
    var title = toTitleCase(split[0].slice(1));
    var description = capitalizeFirstLetter(split.slice(2,-1)).join(". ") + ".";
    this.setState({
      isResults: false,
      title: title,
      text: description,
    })
    event.preventDefault();
  }

  handleBack(event) {
    this.setState({
      isResults: true,
      title: "",
      text: ""
    })
    event.preventDefault();
  }

  renderResults() {
    if (this.state.data.length === 1) {
      return (
      <ul className="search-results">
        <li key={0}>
          <section className="container">
            <div className="noResult">
              <p>{"No results found"}</p>
            </div>
          </section>
        </li>
      </ul>
      )
    }
    if (this.state.isResults){
      return (
        <ul className="search-results">
          {
            this.state.data.map(r => (
                <li key={r.id}>
                <section className="container">
                  {/* <Router> */}
                  <div className="one">
                    <p className="results" onClick={this.handleDescription(r.description)}>{r.description.split(",")[0].slice(1,-3)}</p>
                    {/* <div onClick={this.getRoute(r.description)}>{r.description.split(",")[0].slice(1,-3)}</div> */}
                    {/* <Link to={`/result/${r.description.split(",")[0].slice(1,-3)}`}> {r.description.split(",")[0].slice(1,-3)}</Link> */}
                    {/* <Route path="/about/" component={Welcome} /> */}
                  </div>
                  {/* </Router> */}
                  
                  <div className="two">
                    <HorizontalBar data={createDataSet(this.state.lastQuery, r.weights,this.state.colors)} options={getOptions(r.id, this.state.data)} width={.1} height={getHeight(r.id)}/>

                  </div>
                  <div className="clear"></div>
                </section>   
                </li>
              ))
          }
          </ul>
      )
    } else {
      return(
        <div className="text-container">
          <button onClick={this.handleBack}>
            Back
          </button>
          <h3>{this.state.title}</h3>
          <p>{this.state.text}</p> 
        </div>
      )
    }
  }
  updateJson(data) {
    var oldData = data;
    var newData = [];
    var id = 1;
    var sortable = [];

    for (var key in oldData) {
      var weights = oldData[key];
      var tot = 0.0;
      for (var w in weights) {
        weights[w] = Math.abs(Math.round(100*weights[w])/100)
        tot += weights[w];
      }
      sortable.push([key, tot]);
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    for (var i=0; i<sortable.length; i++) {
      newData.push({
        "id": id++,
        "title": "title " + id,
        "description": sortable[i][0],
        "weights": oldData[sortable[i][0]]
      })
    }
    newData.unshift({
      "id": 0,
        "title": "title " + id,
        "description": "",
        "weights": {}
    })
    // console.log("NEW DATA", newData);
    return newData;
  }
  getRandomColor(query) {
    var dict = {};
    var splitQuery = query.toLowerCase();
    var words = splitQuery.split(" ");
    words = [...new Set(words)]; 
    for(var i = 0; i<words.length; i++) {
      var r = Math.round(Math.random() * 255);
      var g = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);
      dict[words[i]] = 'rgba(' + r + ',' + g + ',' + b + ',1)';
    }
    return dict;
  }

  render() {
    return (
      <div>
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} style={{width: "400px", height: "20px"}}/>
            </label>
            <input type="submit" value="Search" style={{width: "75px", height: "25px", padding: "5px"}}/>
          </form>
        </div>
        {this.state.submitted && this.renderResults()}
      </div>
      
    );
  }
}

export default SearchBar;