import React, {Fragment} from 'react';
import NavigationBar from "./NavigationBar";
import {Segment} from "semantic-ui-react";

import '../index.css';
import FilterBar from './FilterBar';

const Search = props => (
    <Fragment>
        <Segment inverted>
            <NavigationBar/>
        </Segment>
        <FilterBar />
    </Fragment>
);

export default Search;
