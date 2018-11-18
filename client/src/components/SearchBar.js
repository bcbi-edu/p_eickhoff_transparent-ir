import React from 'react';
import Suggestions from './Suggestions';
import {HorizontalBar} from 'react-chartjs-2';

function getOptions(result) {
  var tot = 0.0;
  for (var key in result) {
    tot += result[key]
  }
  
  return {
    scales: {
      xAxes: [{
        stacked: true,
        // ticks: {beginAtZero:true,max:tot, autoskip: true},
        ticks: {beginAtZero:true,max:tot, display: false},
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
          stacked: true,
      }]
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
        enabled: true,
        mode: 'nearest'
    },
  }
}
function createDataSet(weights, colors) {
  var barData = [];
  for(var key in weights) {
    var lowerKey = key.toLowerCase();
    barData.push({
      label: lowerKey,
      data: [weights[key]],
      backgroundColor: [colors[lowerKey]],
      borderColor: ['rgba(0,0,0,0)',],
      borderWidth: 2,
    })
  }
  return {datasets: barData};
}

var id = 2;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      colors: this.getRandomColor("lorem sed labore"),
      submitted: false,
      data:
        [
            {
              "id": id++,
              "title": "Title 1",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
              "weights": 
                  {
                    "Lorem": 33,
                    "sed": 35,
                    "labore": 400
                  }
            },
            {
              "id": id++,
              "title": "Title 2",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
              "weights": 
                  {
                    "Lorem": 27,
                    "sed": 22,
                    "labore": 1
                  }
            }
        ]
    //}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const val = this.state.value;
    var data = this.state.data;
    var colors = this.getRandomColor(val)
    data.push({
      "id": id++,
      "title": "title",
      "description": this.state.value,
      "weights": 
        {
          "Lorem": 23,
          "sed": 13,
          "labore": 12
        }
  })

    this.setState({
      data: data,
      value: "",
      submitted: true,
      colors: colors
    })
    event.preventDefault();
    this.renderResults(val);
  }

  renderResults() {
    return <Suggestions results={this.state.data} query={this.state.value}/>
  }

  getRandomColor(query) {
    var dict = {};
    var query = query.toLowerCase();
    var words = query.split(" ");
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
        {/* <Suggestions results={this.state.data} query={this.state.value}/> */}
        <ul className="search-results">
        {
          this.state.data.map(r => (
              <li key={r.id}>
              <section className="container">
                <div className="one">
                  {/* <h3>{r.title}</h3> */}
                  <p>{r.description}</p>
                </div>
                <div className="two">
                  {/* <BarChart data={r.weights} colors={this.state.colors}/> */}
                  <HorizontalBar data={createDataSet(r.weights,this.state.colors)} options={getOptions(this.state.data[0].weights)} width={.000001} height={53}/>

                </div>
                <div className="clear"></div>
              </section>   
              </li>
            ))
        }
        </ul>
      </div>
      
    );
  }
}

export default SearchBar;