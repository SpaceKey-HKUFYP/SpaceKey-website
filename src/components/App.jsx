import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Search from "./Search";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import FootBar from "./FootBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
          </div>
        </Router>
        <FootBar />
      </Fragment>
    );
  }
}

export default App;
