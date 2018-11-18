import React from 'react'
import BarChart from './BarChart';
import './Styles.css'


class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results,
      colors: this.getRandomColor(this.props.query)
    }
    console.log("Suggestions/Query: ", this.props.query)

  }
  static getDerivedStateFromProps(props, state) {
    if (props.results !== state.props) {
      return (
        <ul className="search-results"></ul>
      )
    }
  }
  getRandomColor(query) {
    var dict = {};
    var words = query.split(" ");
    for(var i = 0; i<words.length; i++) {
      var r = Math.random() * 255;
      var g = Math.random() * 255;
      var b = Math.random() * 255;
      dict[words[i]] = 'rgba(' + r + ',' + g + ',' + b + ',0.4)';
    }
    return dict;
  }

  render() {
      return (
        <ul className="search-results">
        {
          this.state.results.map(r => (
              <li key={r.id}>
              <section className="container">
                <div className="one">
                  {/* <h3>{r.title}</h3> */}
                  <p>{r.description}</p>
                </div>
                <div className="two">
                  <BarChart data={r.weights} colors={this.state.colors}/>
                </div>
                <div className="clear"></div>
              </section>   
              </li>
            ))
        }
        </ul>
      );
    }
};

export default Suggestions;