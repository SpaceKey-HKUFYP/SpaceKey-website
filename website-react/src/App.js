import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { Container, Divider, Header, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import NavigationBar from './components/NavigationBar';
import FilterBar from './components/FilterBar';

//ReactDOM.render(<App />, document.getElementById('root'));

render(
  <NavigationBar />
  <FilterBar />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
