import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import store from './store';
import Login from './scenes/Login';
import NotFound from './scenes/NotFound';
import Main from './scenes/Main';
import Tasks from './scenes/Tasks';
import Logout from './scenes/Logout';
import Links from './scenes/Links';
import Dashboard from './scenes/Dashboard';
import DashboardView from './scenes/Dashboard/components/DashboardView';
import Projects from './scenes/Projects';
import ForgotPassword from './scenes/ForgotPassword';
import ResetPassword from './scenes/ResetPassword';
import SignUp from './scenes/SignUp';
import VerifyEmail from './scenes/VerifyEmail';
import './style.css';

const App = () => {
 
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Links />
                        <Route path = '/sign-up' component = { SignUp } />
                        <Route exact path = '/' component = { Login } />
                        <Route path = '/login' component = { Login } />
                        <Route path = '/logout' component = { Logout } />
                        <Route path = '/forgot-password' component = { ForgotPassword } />
                        <Route path = '/reset-password/:token' component = { ResetPassword } />
                        <Route path = '/verifyemail/:id' component = { VerifyEmail } />

                        <Route path = '/main' component = { Main } />
                        {
                            localStorage.getItem('userDetail') != null ?
                                <Route path = '/tasks/:id' component = { Tasks }  /> :
                                <Redirect exact from = '/tasks/:id' to = '/login' />
                        }
                        {
                            localStorage.getItem('userDetail') != null ?
                                <Route path = '/projects' component = { Projects }  /> :
                                <Redirect exact from = '/projects' to = '/login' />
                        }
                        {
                            localStorage.getItem('userDetail') != null ?
                                <Route path = '/dashboard' component = { Dashboard }  /> :
                                <Redirect exact from = '/dashboard' to = '/login' />
                        }
                        {
                            localStorage.getItem('userDetail') != null ?
                                <Route path = '/dashboard/:receipe' component = { DashboardView }  /> :
                                <Redirect exact from = '/dashboard/:receipe' to = '/login' />
                        }
                    </div>
                </Router>
            </Provider>
      )
}
 export default App;

/*___________________________________________________________________
for applying the bootstrap in our projects

                    <Route path = '*' component = { NotFound } />
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
_____________________________________________________________________*/

// <Route path = '*' component = { NotFound } />
