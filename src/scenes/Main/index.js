import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './../../store';
import Dashboard from './../Dashboard';
import Projects from './../Projects';
import Teams from './../Teams';
import EditProfile from './../EditProfile';
import Links from './../Links';
import TimeLogs from './../TimeLog';
import Task from './../Tasks';

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
                            <Route exact path = '/dashboard' component = { Dashboard } />
                            <Route path = '/dashboard/edit-profile' component = { EditProfile } />
                            <Route path = '/dashboard/time' component = { TimeLogs } />
                            <Route path = '/dashboard/home' component = { Dashboard } />                
                            <Route path = '/dashboard/projects' component = { Projects } />                
                            <Route path = '/dashboard/teams' component = { Teams } />                
                            <Route path = '/dashboard/task' component = { Task }  />
                        </div>
                    </Router>
                </Provider>
            )
        }
	}
}

export default Main