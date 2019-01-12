import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Button, Menu, Image } from "semantic-ui-react";

class NavigationBar extends Component {
  render() {
    return (
      <Menu inverted pointing size="large" attached>
        <Link to="/">
          <Menu.Item header name="SpaceKey">
            <Image
              size="mini"
              src="/images/logo.png"
              style={{ marginRight: "1.5em" }}
            />
            SpaceKey
          </Menu.Item>
        </Link>
        <Menu.Item position="right">
          <Link to="/login">
            <Button inverted>Log in</Button>
          </Link>
          <Link to="/signup">
            <Button inverted style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavigationBar;
