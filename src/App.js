import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import store from './store';
import Login from './scenes/Login';
import NotFound from './scenes/NotFound';
import Main from './scenes/Main';
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

export default App;

/*___________________________________________________________________
for applying the bootstrap in our projects

                    <Route path = '*' component = { NotFound } />
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
_____________________________________________________________________*/

// <Route path = '*' component = { NotFound } />
