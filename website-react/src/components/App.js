import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Search from "./Search";
import LoginForm from './LoginForm';

const App = () => (
    <div>
         <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/login" component={LoginForm} />
            </div>
         </Router>
    </div>
);

export default App;
