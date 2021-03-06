import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'
import {createBrowserHistory} from "history";
import { MlProvider } from './context/MlContext';

let history = createBrowserHistory();

ReactDOM.render(<Router history={history}><MlProvider><App /></MlProvider></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
