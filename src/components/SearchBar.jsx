import React, { Component, Fragment } from "react";
import { Segment, Menu, Button, Dropdown, Grid, Form } from "semantic-ui-react";
import { SpmFilter } from "./FilterMenu";

import "../margin.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    Array.prototype.diff = function(a) {
      return this.filter(function(i) {
        return a.indexOf(i) < 0;
      });
    };

    const placeOptions = [
      { key: "Causeway Bay", value: "Causeway Bay", text: "Causeway Bay" },
      { key: "Kennedy Town", value: "Kennedy Town", text: "Kennedy Town" },
      { key: "HKU", value: "HKU", text: "HKU" },
      { key: "Sheung Wan", value: "Sheung Wan", text: "Sheung Wan" },
      { key: "Sai Ying Pun", value: "Sai Ying Pun", text: "Sai Ying Pun" }
    ];

    const poiOptions = [
      { key: "school", value: "school", text: "school" },
      { key: "mtr-station", value: "mtr-station", text: "mtr-station" },
      { key: "university", value: "university", text: "university" },
      { key: "park", value: "park", text: "park" },
      { key: "airport", value: "airport", text: "airport" },
      { key: "cafe", value: "cafe", text: "cafe" }
    ];

    const my = this;

    this.state = {
      general: {
        handler: {
          modalHandler: (typeButton, isOpen) => {
            let newState = my.state;
            newState[typeButton].open = isOpen;
            my.setState(newState);
          }
        }
      },
      search: {
        data: {
          options: placeOptions,
          value: null
        },
        handler: {
          handleChange: (e, { value }) => {
            let newState = { ...my.state };
            newState.data.value = value;
            my.setState(newState);
          }
        }
      },
      bedrooms: {
        open: false,
        isFiltered: false,
        data: {},
        handler: {}
      },
      saleableArea: {
        isFiltered: false,
        data: {},
        handler: {}
      },
      grossArea: {
        isFiltered: false,
        data: {},
        handler: {}
      },
      price: {
        isFiltered: false,
        data: {
          minValue: 0,
          maxValue: 50000000,
          value: {
            min: 0,
            max: 50000000
          }
        },
        handler: {}
      },
      spm: {
        isFiltered: false,
        open: false,
        data: {
          poi: {
            value: [],
            options: poiOptions
          },
          wantedObjects: []
        },
        handler: {
          handleChange: (e, { value }) => {
            const oldValue = my.state.spm.data.poi.value;
            let newState = { ...my.state };

            if (oldValue.length < value.length) {
              const diffValue = value.diff(oldValue)[0];
              newState.spm.data.wantedObjects.push({
                id: diffValue,
                dir: "any",
                dist: "any"
              });
            } else {
              const diffValue = oldValue.diff(value)[0];
              newState.spm.data.wantedObjects = newState.spm.data.wantedObjects.filter(
                function(obj) {
                  return obj.id !== diffValue;
                }
              );
            }

            newState.spm.data.poi.value = value;
            my.setState(newState);
          },
          wantedObjectChange: (id, distOrDir, value) => {
            let newState = { ...my.state };

            my.state.spm.data.wantedObjects.forEach(function(wantedObject) {
              if (wantedObject.id === id) {
                wantedObject[distOrDir] = value;
              }
            });

            my.setState(newState);
          },
          onClose: () => this.state.general.handler.modalHandler("spm", false)
        }
      }
    };
  }

  render() {
    const {
      general,
      search,
      bedrooms,
      saleableArea,
      grossArea,
      price,
      spm
    } = this.state;
    let where;

    if (search.data.value === null) {
      where = "Hong Kong";
    } else {
      where = search.data.value;
    }

    return (
      <Fragment>
        <Menu pointing secondary size="large">
          <Dropdown
            fluid
            selection
            multiple={false}
            search={true}
            options={search.data.options}
            placeholder="Select Area"
            value={search.data.value}
            onChange={search.handler.handleChange}
          />
          <Menu.Item position="right">
            <Button>Rent</Button>
            <Button style={{ marginLeft: "0.5em" }}>Buy</Button>
          </Menu.Item>
        </Menu>

        <Grid columns="equal" divided padded fluid="true">
          <Grid.Row>
            <Grid.Column>Property for rent in {where}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Dropdown
                text="Bedrooms"
                floating
                labeled
                className="mr-3"
                open={bedrooms.open}
                onClick={() => general.handler.modalHandler("bedrooms", true)}
                onBlur={() => general.handler.modalHandler("bedrooms", false)}
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="number of bedrooms" />
                  <Dropdown.Divider />
                  <Dropdown.Header>
                    Add button to change the number of bedroom
                  </Dropdown.Header>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                text="Saleable area"
                floating
                labeled
                className="mr-3"
                open={saleableArea.open}
                onClick={() =>
                  general.handler.modalHandler("saleableArea", true)
                }
                onBlur={() =>
                  general.handler.modalHandler("saleableArea", false)
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="Saleable area" />
                  <Dropdown.Divider />
                  <Dropdown.Header>
                    Add button to change the saleable area
                  </Dropdown.Header>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                text="Gross area"
                floating
                labeled
                className="mr-3"
                open={grossArea.open}
                onClick={() => general.handler.modalHandler("grossArea", true)}
                onBlur={() => general.handler.modalHandler("grossArea", false)}
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="Gross area" />
                  <Dropdown.Divider />
                  <Dropdown.Header>
                    Add button to change the gross area
                  </Dropdown.Header>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                text="Price"
                floating
                labeled
                className="mr-3"
                open={price.open}
                onClick={() => general.handler.modalHandler("price", true)}
                onBlur={() => general.handler.modalHandler("price", false)}
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="Price" />
                  <Dropdown.Divider />
                  <Dropdown.Header>
                    Add button to change the price
                  </Dropdown.Header>
                </Dropdown.Menu>
              </Dropdown>
              <Button onClick={() => general.handler.modalHandler("spm", true)}>
                SPM
              </Button>
              <SpmFilter
                data={spm.data}
                handler={spm.handler}
                open={spm.open}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default SearchBar;
