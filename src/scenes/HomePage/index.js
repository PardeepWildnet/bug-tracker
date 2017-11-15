import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './../../store';
import Links from './../Links';

import ForgotPassword from './../ForgotPassword';
import Main from './../Main';
import Projects from './../Projects';
import DashboardView from './../Dashboard/components/DashboardView';
import ResetPassword from './../ResetPassword';
import SignUp from './../SignUp';
import VerifyEmail from './../VerifyEmail';
import Login from './../Login';

class HomePage extends Component {
	render () {
		return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path = '/sign-up' component = { SignUp } />
                    <Route path = '/login' component = { Login } />
                    <Route path = '/main' component = { Main } />
                    <Route path = '/projects' component = { Projects } />
                    <Route path = '/forgot-password' component = { ForgotPassword } />
                    <Route path = '/reset-password/:token' component = { ResetPassword } />
                    <Route path = '/verifyemail/:id' component = { VerifyEmail } />
                    <Route exact path = '/' component = { Login } />
                </div>
            </Router>
        </Provider>
           
        )
	}
}

export default HomePage