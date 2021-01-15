import React from 'react';
import './Styles.css';
import { slide as Menu } from 'react-burger-menu'

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Menu width={ '80%' }>
          <ul className="search-results">
            {
              ["one", "two"].map(function(title) {
                // [...this.props.links].map(function(title) {
                  console.log("Title", title)
                return (
                <div>
                    <li className="star">
                    {title}
                    <br/>
                  </li>
                </div>
                  
                  )
              })
            }
            </ul>
            {/* <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
          </Menu>
    );
  }
  
}

export default SideBar;
