import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { Container, Divider, Header, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../index.css';
import FilterBar from './FilterBar';

const Search = props => (
    <div>
        <FilterBar />
    </div>
);

export default Search;
