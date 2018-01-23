import React, { Component } from 'react';
import './style.css';

class Loader extends Component {
  render () {
    return (
    	<div>
        	<img alt="loader" src={require("./../../Assets/loader.gif")} style = {{height : 50, width : 50}}/>
        </div>
    );
  }
}

export default Loader
