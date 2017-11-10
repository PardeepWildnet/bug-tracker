import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';

import store from './store';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp';
import Dashboard from './scenes/Dashboard';
import Quiz from './scenes/Quiz';
import Projects from './scenes/Projects';
import Tasks from './scenes/Tasks';
import Videos from './scenes/Videos';
import Links from './scenes/Links';
import PaginationView from './scenes/Pagination';
import Content from './scenes/Content';
import TimeLogs from './scenes/TimeLog';
import DashboardView from './scenes/Dashboard/components/DashboardView';
import './style.css';

/*export const Dummy = () => {
    console.log(" inside dummy component");
    return (
        <h1>This is the dummy component</h1>
    )
}*/

/*const NotFound = () => 
    <h1> Not Found </h1>

*/
/*
const CreateIdeaView = () => {
    <h1> Create Idea View </h1>
}
*/

const App = () => {
  
return (
    <Provider store={store}>
        <Router>
            <div>
                
                <Links />

                <Route exact path = '/' component = { Login } />
                <Route path = '/sign-up' component = { SignUp } />
                <Route path = '/login' component = { Login } />
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

export default App;


/*
<Route path = '/projects' component = { Projects } >
                    <Route path = '/projects/:dummy' component = { Dummy } />
</Route>*/
// <Route path = '/tasks?id:id&email:email' component = { Tasks }  />

/*for applying the bootstrap in our projects

// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">*/
// <Route path = '*' component = { NotFound } />
// <Route name="ideas" path="/:testvalue" handler={CreateIdeaView} />
// <Redirect exact from = '/quiz' to = '/login' />
