import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

const ContentDetail = (props) => (
    <h1> {props.match.params.contentDetail} </h1>
)

const Content = () => {
	const id = 1;
  	return (
	    <div>
	        <NavLink to="/contents/sport" activeClassName = 'active'className = 'list-group-item'> Sports  </NavLink>
	        <NavLink to={"/contents/music?id="+ id+"&id="+id} activeClassName = 'active'className = 'list-group-item'> Music  </NavLink>
	        <Route path = '/contents/:contentDetail' component = { ContentDetail } />
	    </div>
  	)
}

export default Content