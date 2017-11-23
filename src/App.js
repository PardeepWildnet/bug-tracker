import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';

import store from './store';
import Login from './scenes/Login';
import Main from './scenes/Main';
import ForgotPassword from './scenes/ForgotPassword';
import ResetPassword from './scenes/ResetPassword';
import SignUp from './scenes/SignUp';
import VerifyEmail from './scenes/VerifyEmail';
import './style.css';

class App extends Component {
    render () {
        return (
            <LocaleProvider locale={enUS}> 

            <Provider store={store}>
                 <Router>
                    <Switch>
                        <Route exact path = '/' component = { Login } />
                        <Route path = '/dashboard' component = { Main }  /> 
                        <Route path = '/sign-up' component = { SignUp } />
                        <Route path = '/login' component = { Login } />
                        <Route path = '/forgot-password' component = { ForgotPassword } />
                        <Route path = '/reset-password/:token' component = { ResetPassword } />
                        <Route exact path = '/verifyemail/:id' component = { VerifyEmail } />
                        <Route path = '*' component = { Login } />
                    </Switch>
                </Router>
            </Provider>
            </LocaleProvider>
        )
    }
}
 export default App;