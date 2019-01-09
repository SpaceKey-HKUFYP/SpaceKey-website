import React, { Component, Fragment } from "react";
import { Segment, Menu, Button, Dropdown, Grid, Form } from "semantic-ui-react";
import { SpmFilter, ScrollFilter } from "./FilterMenu";
import { Range } from "rc-slider";

import "../margin.css";
import "rc-slider/assets/index.css";

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
    this.ft2 = "ft2";
    // const ft2 = () => {
    //   return (
    //     <span>
    //       ft<sup>2</sup>
    //     </span>
    //   );
    // };

    this.state = {
      general: {
        handler: {
          openHandler: (typeButton, isOpen) => {
            let newState = my.state;
            newState[typeButton].status.open = isOpen;
            my.setState(newState);
          },
          rangeValueUpdate: (typeButton, value) => {
            let newState = my.state;
            newState[typeButton].data.value = value;
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
            newState.search.data.value = value;
            my.setState(newState);
          }
        }
      },
      bedrooms: {
        status: {
          open: false,
          isFiltered: false
        },
        data: {},
        handler: {}
      },
      saleableArea: {
        status: {
          open: false,
          isFiltered: false
        },
        data: {
          min: 0,
          max: 5000,
          marks: { 0: "0", 5000: "5000" },
          step: 100,
          default: [0, 5000],
          value: [0, 5000],
          unit: this.ft2
        },
        handler: {
          openDropdown: () =>
            this.state.general.handler.openHandler("saleableArea", true),
          closeDropdown: () =>
            this.state.general.handler.openHandler("saleableArea", false),
          rangeValueUpdate: value =>
            this.state.general.handler.rangeValueUpdate("saleableArea", value)
        }
      },
      grossArea: {
        status: {
          open: false,
          isFiltered: false
        },
        data: {
          min: 0,
          max: 5000,
          marks: { 0: "0", 5000: "5000" },
          step: 100,
          default: [0, 5000],
          value: [0, 5000],
          unit: this.ft2
        },
        handler: {
          openDropdown: () =>
            this.state.general.handler.openHandler("grossArea", true),
          closeDropdown: () =>
            this.state.general.handler.openHandler("grossArea", false),
          rangeValueUpdate: value =>
            this.state.general.handler.rangeValueUpdate("grossArea", value)
        }
      },
      price: {
        status: {
          open: false,
          isFiltered: false
        },
        data: {
          min: 0,
          max: 100000,
          marks: { 0: "0", 100000: "100000" },
          step: 1000,
          default: [0, 100000],
          value: [0, 100000],
          unit: "HKD"
        },
        handler: {
          openDropdown: () =>
            this.state.general.handler.openHandler("price", true),
          closeDropdown: () =>
            this.state.general.handler.openHandler("price", false),
          rangeValueUpdate: value =>
            this.state.general.handler.rangeValueUpdate("price", value)
        }
      },
      spm: {
        status: {
          open: false,
          isFiltered: false
        },
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
          closeModal: () => this.state.general.handler.openHandler("spm", false)
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
                open={bedrooms.status.open}
                onClick={() => general.handler.openHandler("bedrooms", true)}
                onBlur={() => general.handler.openHandler("bedrooms", false)}
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="number of bedrooms" />
                  <Dropdown.Divider />
                  <Dropdown.Header>
                    Add button to change the number of bedroom
                  </Dropdown.Header>
                </Dropdown.Menu>
              </Dropdown>

              <ScrollFilter
                text={"Saleable Area (" + this.ft2 + ")"}
                handler={saleableArea.handler}
                data={saleableArea.data}
                status={saleableArea.status}
              />

              <ScrollFilter
                text={"Gross Area (" + this.ft2 + ")"}
                handler={grossArea.handler}
                data={grossArea.data}
                status={grossArea.status}
              />

              <ScrollFilter
                text="Price (HKD)"
                handler={price.handler}
                data={price.data}
                status={price.status}
              />

              <Button onClick={() => general.handler.openHandler("spm", true)}>
                SPM
              </Button>
              <SpmFilter
                data={spm.data}
                handler={spm.handler}
                status={spm.status}
                size="small"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <VolumeSlider />
      </Fragment>
    );
  }
}

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: [0, 100],
      def: [0, 100]
    };
  }

  render() {
    const my = this;
    const handleOnChange = value => {
      console.log(value);
      my.setState({
        value: value
      });
    };
    let { value, def } = this.state;
    return (
      <Fragment>
        <Range value={value} default={def} onChange={handleOnChange} />
        <Fragment>{JSON.stringify(this.state)}</Fragment>
      </Fragment>
    );
  }
}

export default SearchBar;
