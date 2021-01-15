import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const options = {
    scales: {
         xAxes: [{
             stacked: true
         }],
         yAxes: [{
             stacked: true
         }]
     },
    //  maintainAspectRatio: false,
 }
 
 function createDataSet(weights, colors) {
  // weights = weights.toLowerCase();
  // query = query.toLowerCase();
  // console.log("colors query", query)
  // var colors = getRandomColor(query);
  // console.log("COLORS", colors)
  // console.log("WEIGHTS", weights)
  var barData = [];
  for(var key in weights) {
    var lowerKey = key.toLowerCase();
    barData.push({
      // label: key,
      // borderWidth: 1,
      // stack: '2',
      // // borderColor: 'rgba(255,99,132,1)',
      // data: weights[key]
      label: lowerKey,
      backgroundColor: colors[lowerKey],
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      stack: '2',
    //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //   hoverBorderColor: 'rgba(255,99,132,1)',
      data: [weights[key]]
    });
  }
  return {datasets: barData};
}

class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // query: this.props.query,
        data: createDataSet(this.props.data, this.props.colors)
      }
      
      
    }
    
    render() {
        return (
          <div>
            <HorizontalBar data={this.state.data} options={options} width={.000001} height={75}/>
          </div>
        );
      }
};

export default BarChart;
