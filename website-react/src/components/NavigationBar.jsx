import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import PropertySearch from './PropertySearch'

class NavigationBar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const activeItem = this.state.activeItem;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
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
            name='Helps'
            active={activeItem === "Helps"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Log out'
            active={activeItem === "Log out"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default NavigationBar;
