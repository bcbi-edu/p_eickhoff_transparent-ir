function getOptions(id, results) {
    var maxFound = 0.0;
    for (var i=0; i<results.length; i++) {
        var result = results[i].weights;
        var tot = 0.0;
        for (var key in result) {
          // tot += result[key];
          tot += Math.abs(Math.round(100*result[key])/100)
        }
        if (tot > maxFound) {
        }
        maxFound = Math.max(maxFound, tot);
    }

    
    
    var opts = {
      scales: {
        xAxes: [{
          stacked: true,
          // ticks: {beginAtZero:true,max:tot, autoskip: true},
          ticks: {beginAtZero:true,max:Math.ceil(maxFound), display: false},
        // ticks: {beginAtZero:true,max:20, display: false},
          gridLines: {
            display: false,
            show: false,
            color: 'transparent'
          },
        }],
        yAxes: [{
            stacked: true,
            gridLines: {
                display: false,
                show: false,
                color: 'transparent'
              },
        }]
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
        onClick: (e) => e.stopPropagation()
      },
      tooltips: {
          enabled: true,
          mode: 'nearest'
      },
    }
    if (id === 0) {
        opts.legend.display = true;
    }
    return opts;
  }
  
function getHeight(id, query) {
    if (id === 0) {
      var stripQuery = query.replace(/\b[-.,()&$#?!\]{}"']+\B|\B[-.,()&$#!?\]{}"']+\b/g, "");
      var splitQuery = stripQuery.trim().split(" ");
      splitQuery = [...new Set(splitQuery)];
      // console.log(Math.max(100, 55 + 10* splitQuery.length))
        // return Math.max(100, 55 + 10* splitQuery.length);
        return 155
    } else {
        return 55;
    }
}

function createDataSet(query, weights, colors) {
  var barData = [];
  var stripQuery = query.replace(/\b[-.,()&$#?!\]{}"']+\B|\B[-.,()&$#!?\]{}"']+\b/g, "");
  var splitQuery = stripQuery.trim().split(" ");
  splitQuery = [...new Set(splitQuery)];
  for(var i=0; i<splitQuery.length; i++) {
    if (splitQuery[i] === " " || splitQuery[i] === "") {
      continue;
    }
    // var lowerKey = key.toLowerCase();
    var lowerKey = splitQuery[i].toLowerCase();
    barData.push({
      label: lowerKey,
      data: [Math.abs(Math.round(100.0*weights[lowerKey])/100.0)],
      // data: [weights[splitQuery[i]]],
      backgroundColor: [colors[lowerKey]],
      borderColor: ['rgba(0,0,0,0)',],
      borderWidth: 2,
    })
  }
  // barData.sort((a, b) => a.label > b.label);
  barData.sort( predicateBy("data") );

  return {datasets: barData};
}

//sorts by value
function predicateBy(prop){
  return function(a,b){
     if( a[prop][0] > b[prop][0]){
         return -1;
     }else if( a[prop][0] < b[prop][0] ){
         return 1;
     }
     return 0;
  }
}

function toTitleCase(text) {
  return text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

function capitalizeFirstLetter(strings) {
  var arr = [];
  for (var i=0; i<strings.length; i++) {
    var str = strings[i].trim()
    arr.push(str.charAt(0).toUpperCase() + str.slice(1));
  }
  return arr;
}


export { getOptions, getHeight, createDataSet, toTitleCase , capitalizeFirstLetter}
