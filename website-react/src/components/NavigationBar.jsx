import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import PropertySearch from './PropertySearch'

class NavigationBar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const activeItem = this.state.activeItem;

    return (
        <Menu inverted pointing secondary size='large'>
          <Menu.Item
            name='Home'
            active={activeItem === "Home"}
            onClick={this.handleItemClick}
          />
          <PropertySearch/>
          <Menu.Item
            name='Saved'
            active={activeItem === "Saved"}
            onClick={this.handleItemClick}
            className="right floated"
          />
          <Menu.Item
            name='Messages'
            active={activeItem === "Messages"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Help'
            active={activeItem === "Help"}
            onClick={this.handleItemClick}
          />
          <Button
            as='a'
            onClick={this.handleItemClick}>
            Log in
          </Button>
          <Button
            as='a'
            style={{ marginLeft: '0.5em' }}
            onClick={this.handleItemClick}>
            Sign Up
          </Button>
        </Menu>
    )
  }
}

export default NavigationBar;
