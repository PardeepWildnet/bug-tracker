import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import Projects from './components';
import { Dummy } from './../../App.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const Project = () => (
	<Projects />
)	

export default Project

	{/*<div>
					-----------
					<Link to="/projects/dummy">  Dummy </Link>
			<div>{this.props.children}</div>
			-----------</div>*/}