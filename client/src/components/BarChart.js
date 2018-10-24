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
     maintainAspectRatio: false,
 }

 let data ={ 
   datasets:[
    {
      label: 'The',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      stack: '2',
    //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //   hoverBorderColor: 'rgba(255,99,132,1)',
      data: [10]
    },
    {
      label: 'Query',
      backgroundColor: 'rgba(155,49,12,0.4)',
      borderColor: 'rgba(155,49,12,1)',
      borderWidth: 1,
      stack: '2',
    //   hoverBackgroundColor: 'rgba(155,49,12,0.4)',
    //   hoverBorderColor: 'rgba(155,59,12,1)',
      data: [20]
    },
    {
      label: 'Lucene',
      backgroundColor: 'rgba(45,149,102,0.4)',
      borderColor: 'rgba(45,149,102,1)',
      borderWidth: 1,
      stack: '2',
    //   hoverBackgroundColor: 'rgba(155,49,12,0.4)',
      hoverBorderColor: 'rgba(155,59,12,1)',
      data: [20]
    }
  ]
 }

class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.data = data;
    }

    render() {
        return (
          <div>
            <HorizontalBar data={data} options={options} width={10} height={100}/>
          </div>
        );
      }
};

export default BarChart;
