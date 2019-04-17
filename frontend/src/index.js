import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import Layout from './components/layout';
import CreateEntry from './components/createEntry';
import CreateUser from './components/createUser';
import LogonUser from './components/logonUser';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <Layout>
            <Route exact path="/"  component={App} />
            <Route path="/create"  component={CreateEntry}/>
            <Route path="/newUser"  component={CreateUser}/>
            <Route path='/logon'  component={LogonUser}/>
        </Layout>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
