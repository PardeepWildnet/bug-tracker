import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from './../Dashboard';
import Projects from './../Projects';
import Teams from './../Teams';
import EditProfile from './../EditProfile';
import Links from './../Links';
import User from './../User';
import UserDetail from './../User/components/UserDetail';
import ProjectDetail from './../Projects/components/ProjectDetail';
import TaskDetail from './../Tasks/components/TaskDetail';
import SubTask from './../Tasks/components/SubTask';
import TeamDetail from './../Teams/components/TeamDetail';
import TimeLogs from './../TimeLog';
import Task from './../Tasks';

class Main extends Component {
	render () {
        if(localStorage.getItem('userDetail') === null){
            return( <div>{this.props.history.push('/login')}</div>)
        }
        else{
            return (
                <Router>
                    <div>
                        <Links />
                        <Route exact path = '/dashboard' component = { Dashboard } />
                        <Route exact path = '/dashboard/user' component = { User } />
                        <Route exact path = '/dashboard/user/:id' component = { UserDetail } />
                        <Route path = '/dashboard/edit-profile' component = { EditProfile } />
                        <Route path = '/dashboard/time' component = { TimeLogs } />
                        <Route path = '/dashboard/home' component = { Dashboard } />
                        <Route exact path = '/dashboard/projects' component = { Projects } />
                        <Route exact path = '/dashboard/projects/:id' component = { ProjectDetail } />
                        <Route exact path = '/dashboard/teams' component = { Teams } />
                        <Route exact path = '/dashboard/teams/:id' component = { TeamDetail } />
                        <Route exact path = '/dashboard/task' component = { Task }  />
                        <Route exact path = '/dashboard/task/:id' component = { TaskDetail }  />
                        <Route exact path = '/dashboard/task/subtask/:id' component = { SubTask }  />
                    </div>
                </Router>
            )
        }
			}
 }

export default Main
