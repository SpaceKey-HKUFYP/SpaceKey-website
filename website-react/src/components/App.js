import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { Container, Divider, Header, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../index.css';
import NavigationBar from './NavigationBar';
import FilterBar from './FilterBar';

const App = props => (
    <div>
        <NavigationBar />
        <FilterBar />
    </div>
);

export default App;
