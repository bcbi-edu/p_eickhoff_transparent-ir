import React from 'react'
import BarChart from './BarChart';
import './Styles.css'
const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.id}>
    <section class="container">
      <div class="one">
        <h3>{r.title}</h3>
        <p>{r.name}</p>
      </div>
      <div class="two">
        <BarChart />
      </div>
    </section>   
    </li>
  ))
  return <ul class="search-results">{options}</ul>
}

export default Suggestions;