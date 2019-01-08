import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Search from "./Search";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        // const getData = (ev, year, month) => {
        //     axios.get('http://localhost:8080/expense/'+year+'/'+month)
        //       .then(function(response) {
        //         ev.setState({data: response.data});
        //         ev.setState({selectedYear: parseInt(year)});
        //         ev.setState({selectedMonth: month});
        //       });
        // }
    }

    render() {
        return (
            <div>
                 <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/search" component={Search} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/signup" component={SignupForm} />
                    </div>
                 </Router>
            </div>
        );
    }
}

export default App;
