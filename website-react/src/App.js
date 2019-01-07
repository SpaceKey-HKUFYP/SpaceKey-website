import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { Container, Divider, Header, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './index.css';
import App from './components/App';
import FilterBar from './components/FilterBar';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

render(
  <FilterBar />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
