import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Menu, Image } from 'semantic-ui-react'
import PropertySearch from './PropertySearch'

class NavigationBar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const activeItem = this.state.activeItem;

    return (
        <Menu inverted pointing secondary size='large'>
            <Link to="/">
                <Menu.Item
                    as='a' header
                    name='SpaceKey'
                    onClick={this.handleItemClick}>
                  <Image size='mini' src='/images/logo.png' style={{ marginRight: '1.5em' }} />
                  SpaceKey
                </Menu.Item>
             </Link>
            <Menu.Item position='right'>
                <Link to="/login">
                    <Button as='a' inverted onClick={this.handleItemClick}>
                    Log in
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button as='a' inverted onClick={this.handleItemClick} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                    </Button>
                </Link>
            </Menu.Item>
        </Menu>
    )
  }
}

export default NavigationBar;
