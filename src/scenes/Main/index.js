import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './../../store';
import Dashboard from './../Dashboard';
import Projects from './../Projects';
import Tasks from './../Tasks';
import Login from './../Login';
import Links from './../Links';
import TimeLogs from './../TimeLog';

class Main extends Component {
	render () {
        if(!(localStorage.getItem('userDetail') != null)){
            return( <div>{this.props.history.push('/login')}</div>)
        }
        else{
            return (
                <Provider store={store}>
                    <Router>
                        <div>
                            <Links />
                            <Route path = '/dashboard/time' component = { TimeLogs } />
                            <Route path = '/dashboard/home' component = { Dashboard } />                
                            <Route path = '/dashboard/projects' component = { Projects } />                
                            <Route path = '/dashboard/tasks/:id' component = { Tasks }  />
                        </div>
                    </Router>
                </Provider>
            )
        }
	}
}

export default Main