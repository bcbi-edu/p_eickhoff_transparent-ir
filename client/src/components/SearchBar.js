import React from 'react';
// import Suggestions from './Suggestions';
import {HorizontalBar} from 'react-chartjs-2';
import {getOptions, getHeight, createDataSet, toTitleCase, capitalizeFirstLetter} from './Util';
import axios from 'axios'
import './Styles.css';
import { Button, Glyphicon } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu'
// import SideBar from './SideBar';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      colors: this.getRandomColor(""),
      submitted: false,
      data: [],
      lastQuery: "",
      isResults: true,
      title: "",
      text: "",
      links: new Map(),
      queries: [],
      bars: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  componentDidMount() {
    var url = window.location.href;
    var res = url.split("/");
    for(var i=0; i<res.length; i++) {
      if (res[i] === 'experiment') {
        this.setState({
          bars: false
        })
      }
    }
    var session = getParameterByName('session') - 1;
    var id = getParameterByName('id');
    if (id !== null) {
      axios.get("https://ir-sim.herokuapp.com/prevLinks",
      {
        "id": id,
        "session": session.toString()
      }).then(res => {
        console.log(res)
        this.setState({
          links: res.links
        })
      })
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const val = this.state.value;
    var queries = this.state.queries;
    queries.push(val);   
    var colors = this.getRandomColor(val)
    axios.get(`https://ir-sim-api.herokuapp.com/search?name=${this.state.value}`)
      .then(res => {
        const data = res.data.data;
        const descriptions = res.data.descriptions
        this.setState({ 
          data: this.updateJson(data, descriptions),
          // value: "",
          submitted: true,
          colors: colors,
          lastQuery: val,
          isResults: true,
          desc: "",
          queries: queries
        });
        if (data === {}) {
          this.setState({
            submitted: false
          })
        }
      })
    event.preventDefault();
  }


  handleDescription = (text) => (event) => {
    var split = text.split(" . ");
    var title = toTitleCase(split[0]);
    // var title = split[0];
    var description = capitalizeFirstLetter(split.slice(2,-1)).join(". ") + ".";
    this.setState({
      isResults: false,
      title: title,
      text: description,
    })
    event.preventDefault();
  }

  //go back to main search results
  handleBack(event) {
    this.setState({
      isResults: true,
      title: "",
      text: ""
    })
    event.preventDefault();
  }

  //add favorite links
  handleFavorites = (title, description) => (event) => {
    var links = this.state.links;
    if (links.has(title)) {
      links.delete(title);
    } else {
      links.set(title, description);
    }
    this.setState({
      links: links
    });
    event.preventDefault();
  }

  getStarStyles(title) {
    var links = this.state.links;
    if (links.has(title)) {
      return 'warning';
    } else { 
      return 'primary';
    }
  }
  
  renderButton(title, description) {
    if (title !== "") {
      return(
        <Button
          onClick={this.handleFavorites(title, description)}
          bsStyle={this.getStarStyles(title)}
          bsSize="xsmall"
        >
          <Glyphicon glyph="star" />
        </Button>
      );
    }
  }

  renderSideBar() {
    var links = this.state.links;
    var newLinks = []
    for (let [k, v] of links) {
      newLinks.push({
        "title": k,
        "description": v
      })
    }

    var j = 0;
    return (
      <div className="sidebar">
        <Menu width={ '75%' }>
        <ul className="search-results">
        <li><b>
        What are the structural and aeroelastic problems associated with flight of high speed aircraft?
        This includes problems with nozzle design, acoustics, and increasing the mach number.
        </b></li><br />
          {
            newLinks.map(r => (
              <li key={j++}>
              {/* <section className="container"> */}
                <div className="star">
                  {this.renderButton(r.title, r.description)}
                </div>
                <div className="one-sidebar">
                  <p className="results" onClick={this.handleDescription(r.description)}>{r.title}</p>
                  <p>{r.description.replace(/(([^\s]+\s\s*){40})(.*)/,"$1…") /* first 50 words*/}</p> 
                </div>
                <div className="clear"></div>
              {/* </section>    */}
              </li>
            ))
          }
          </ul>
        </Menu>
      </div>
    )
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
    if (this.state.isResults && this.state.bars){
      return (
        <ul className="search-results">
          {
            this.state.data.map(r => (
              <li key={r.id}>
              <section className="container">
                <div className="star">
                  {this.renderButton(r.title, r.description)}
                </div>
                <div className="one">
                  <p className="results" onClick={this.handleDescription(r.description)}>{r.title}</p>
                  <p>{r.description.replace(/(([^\s]+\s\s*){40})(.*)/,"$1…") /* first 50 words*/}</p> 
                </div>
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

    } else if (this.state.isResults && !this.state.bars) {
      return (
        <ul className="search-results">
          {
            this.state.data.map(r => (
              <li key={r.id}>
              <section className="container">
                <div className="star">
                  {this.renderButton(r.title, r.description)}
                </div>
                <div className="one">
                  <p className="results" onClick={this.handleDescription(r.description)}>{r.title}</p>
                  <p>{r.description.replace(/(([^\s]+\s\s*){40})(.*)/,"$1…") /* first 50 words*/}</p> 
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
  updateJson(data, descriptions) {
    var oldData = data;
    var newData = [];
    var id = 1;
    var sortable = [];

    //sort based on highest values
    var key_id = 0;
    for (var key in oldData) {
      var weights = oldData[key];
      var tot = 0.0;
      for (var w in weights) {
        weights[w] = Math.abs(Math.round(100*weights[w])/100)
        tot += weights[w];
      }
      sortable.push([key, tot, descriptions[key_id]]);
      key_id++;
    }

    //sort based on weights
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    for (var i=0; i<sortable.length; i++) {
      newData.push({
        "id": id++,
        "title": sortable[i][0],
        "description": sortable[i][2],
        "weights": oldData[sortable[i][0]]
      })
    }
    //insert empty index for first index
    newData.unshift({
      "id": 0,
      "title": "",
      "description": "",
      "weights": {}
    })
    return newData;
  }

  //get random colors for bar graph
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
              <input type="text" value={this.state.value} onChange={this.handleChange} style={{width: "400px", height: "25px"}}/>
            </label>
            <input type="submit" value="Search" style={{width: "75px", height: "25px"}}/>
          </form>
        </div>
        {this.renderSideBar()}
        {this.state.submitted && this.renderResults()}
      </div>
      
    );
  }
}

export default SearchBar;