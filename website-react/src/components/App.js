import React from "react";


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Search from "./Search";
import NavigationBar from './NavigationBar';

const App = () => (
    <div>
         <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
            </div>
         </Router>
    </div>
);

export default App;
