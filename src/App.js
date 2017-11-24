import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import 'react-toastify/dist/ReactToastify.min.css';
import { notification } from 'antd';

import store from './store';
import Login from './scenes/Login';
import Main from './scenes/Main';
import ForgotPassword from './scenes/ForgotPassword';
import ResetPassword from './scenes/ResetPassword';
import SignUp from './scenes/SignUp';
import VerifyEmail from './scenes/VerifyEmail';
import './style.css';

export const openNotificationWithIcon = (type, msg, title) => {
  console.log("msg is ", this.msg);
  notification[type]({
    message: title,
    description: msg,
  });
};

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