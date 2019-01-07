import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import PropertySearch from './PropertySearch'

class NavigationBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item name='Home' active={false} onClick={this.handleItemClick} />
          <PropertySearch/>
          <Menu.Item
            name='Saved'
            active={false}
            onClick={this.handleItemClick}
            className="right floated"
          />
          <Menu.Item
            name='Messages'
            active={false}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Helps'
            active={false}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Log out'
            active={false}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default NavigationBar;
