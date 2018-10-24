import React from 'react'
import BarChart from './BarChart';

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.id}>
        <h3>{r.title}</h3>
        {r.name}
        <BarChart />
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions;