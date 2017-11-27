import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './../Dashboard';
import Projects from './../Projects';
import Teams from './../Teams';
import EditProfile from './../EditProfile';
import Links from './../Links';
import User from './../User';
import UserDetail from './../User/components/UserDetail';
import TimeLogs from './../TimeLog';
import Task from './../Tasks';

class Main extends Component {
	render () {
       /* if(!(localStorage.getItem('userDetail') != null)){
            return( <div>{this.props.history.push('/login')}</div>)
        }
        else{*/
            return (
                <Router>
                    <div>
                        <Links />
                        <Redirect exact from = '/dashboard' to = '/dashboard/home' />
                        <Route exact path = '/dashboard' component = { Dashboard } />
                        <Route exact path = '/dashboard/user' component = { User } />
                        <Route exact path = '/dashboard/user/:id' component = { UserDetail } />
                        <Route path = '/dashboard/edit-profile' component = { EditProfile } />
                        <Route path = '/dashboard/time' component = { TimeLogs } />
                        <Route path = '/dashboard/home' component = { Dashboard } />                
                        <Route path = '/dashboard/projects' component = { Projects } />                
                        <Route path = '/dashboard/teams' component = { Teams } />                
                        <Route path = '/dashboard/task' component = { Task }  />
                    </div>
                </Router>
            )
        // }
	}
}

export default Main