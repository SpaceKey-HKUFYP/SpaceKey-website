import React, {Component, Fragment} from 'react';
import {Segment, Menu, Button, Dropdown, Grid, Form} from "semantic-ui-react";

import '../margin.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        const placeOptions= [
          { key: "Causeway Bay", value: "Causeway Bay", text: "Causeway Bay" },
          { key: "Kennedy Town", value: "Kennedy Town", text: "Kennedy Town" },
          { key: "HKU", value: "HKU", text: "HKU" },
          { key: "Sheung Wan", value: "Sheung Wan", text: "Sheung Wan" },
          { key: "Sai Ying Pun", value: "Sai Ying Pun", text: "Sai Ying Pun" },
        ];

        const my = this;
        this.state = {
                data: {
                    options: placeOptions,
                    value: null,
            },
            handler: {
                handleChange: (e, { value }) => {
                  let newState = { ...my.state };
                  newState.data.value = value;
                  my.setState(newState);
              },
            },
        }
    }

    render() {
        const {data, handler} = this.state;
        let where;

        if (data.value === null) {
            where = "Hong Kong";
        } else {
            where = data.value;
        }

        return (
            <Fragment>
                <Menu pointing secondary size='large'>
                    <Dropdown fluid selection multiple={false} search={true}
                        options={data.options}
                        placeholder="Select Area"
                        value={data.value}
                        onChange={handler.handleChange}
                    />
                    <Menu.Item position='right'>
                            <Button>
                                Rent
                            </Button>
                            <Button style={{ marginLeft: '0.5em' }}>
                                Buy
                            </Button>
                    </Menu.Item>
                </Menu>

                <Grid columns='equal' divided padded fluid='true'>
    				<Grid.Row>
                        <Grid.Column>
                            Property for rent in {where}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
    					<Grid.Column>
                            <Dropdown text='Bedrooms' floating labeled className="mr-3">
                                <Dropdown.Menu>
                                    <Dropdown.Header content='number of bedrooms' />
                                    <Dropdown.Divider />
                                    <Dropdown.Header>
                                        Add button to change the number of bedroom
                                    </Dropdown.Header>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown text='Saleable area' floating labeled className="mr-3">
                                <Dropdown.Menu>
                                    <Dropdown.Header content='Saleable area' />
                                        <Dropdown.Divider />
                                    <Dropdown.Header>
                                        Add button to change the saleable area
                                    </Dropdown.Header>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown text='Gross area' floating labeled className="mr-3">
                                <Dropdown.Menu>
                                    <Dropdown.Header content='Gross area' />
                                        <Dropdown.Divider />
                                    <Dropdown.Header>
                                        Add button to change the gross area
                                    </Dropdown.Header>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown text='Price' floating labeled className="mr-3">
                                <Dropdown.Menu>
                                    <Dropdown.Header content='Price' />
                                        <Dropdown.Divider />
                                    <Dropdown.Header>
                                        Add button to change the price
                                    </Dropdown.Header>
                                </Dropdown.Menu>
                            </Dropdown>
    					</Grid.Column>
    				</Grid.Row>
    			</Grid>
            </Fragment>
        );
    }
}

export default SearchBar;
