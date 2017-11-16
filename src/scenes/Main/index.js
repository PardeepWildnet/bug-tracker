import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './../../store';
import Dashboard from './../Dashboard';
import Quiz from './../Quiz';
import Projects from './../Projects';
import Tasks from './../Tasks';
import Videos from './../Videos';
import Links from './../Links';
import PaginationView from './../Pagination';
import Content from './../Content';
import TimeLogs from './../TimeLog';
import DashboardView from './../Dashboard/components/DashboardView';

class Main extends Component {
	render () {
		return (
            <Provider store={store}>
                <Router>
                    <div>
                        
                        <Links />
                        <Redirect from = '/main' to = '/dashboard' />
                        <Route path = '/contents' component = { Content } />
                        <Route path = '/quiz' component = { Quiz } />
                        <Route path = '/time' component = { TimeLogs } />
                        <Route path = '/pagination' component = { PaginationView } />
                        <Route path = '/projects' component = { Projects } />                
                        <Route path = '/videos' component = { Videos } />                
                        <Route path = '/tasks/:id' component = { Tasks }  />
                        <Route path = '/dashboard' component = { Dashboard } />
                        <Route path = '/dashboard/:receipe' component = { DashboardView } />
                    </div>
                </Router>
            </Provider>
        )
	}
}

export default Main