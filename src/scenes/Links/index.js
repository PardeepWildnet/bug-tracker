import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Links = () => (
    <div className = 'nav'>
        <NavLink activeClassName = 'active' to="/dashboard" className = 'list-group-item'> Dashboard  </NavLink>
        <NavLink to="/login" activeClassName = 'active' className = 'list-group-item'> Login </NavLink>
        <NavLink to="/quiz" activeClassName = 'active' className = 'list-group-item'> Quiz  </NavLink>
        <NavLink to="/projects" activeClassName = 'active' className = 'list-group-item'> Projects  </NavLink>
        <NavLink to="/time" activeClassName = 'active' className = 'list-group-item'> Time Log  </NavLink>
        <NavLink to="/contents" activeClassName = 'active' className = 'list-group-item'> Nested Routing  </NavLink>
    </div>
)

export default Links
// <Link to="ideas" params={{ testvalue: "hello" }}>Create Idea</Link>    