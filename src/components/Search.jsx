import React, {Fragment} from 'react';
import NavigationBar from "./NavigationBar";
import {Segment} from "semantic-ui-react";

import '../index.css';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';

const Search = props => (
    <Fragment>
        <Segment inverted>
            <NavigationBar/>
        </Segment>
        <SearchBar />
        <FilterBar />
    </Fragment>
);

export default Search;
