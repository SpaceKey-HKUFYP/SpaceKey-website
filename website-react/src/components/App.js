import React from "react";


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Search from "./Search";
import NavigationBar from './NavigationBar';

const App = () => (
    <div>
         <NavigationBar />
         <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/topics" component={Search} />
            </div>
         </Router>
    </div>
);

export default App;
