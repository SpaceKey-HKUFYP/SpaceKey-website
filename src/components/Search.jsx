import React, { Component, Fragment } from "react";
import {
  Segment,
  Menu,
  Button,
  Dropdown,
  Grid,
  Form,
  Container,
  Header
} from "semantic-ui-react";
import { SpmFilter, ScrollFilter } from "./FilterMenu";
import { Range } from "rc-slider";
import NavigationBar from "./NavigationBar";
import HouseList from "./HouseList";

import "../layout.css";
import "rc-slider/assets/index.css";
import "../constant";

const houseData = [
  {
    address: "No.2 Tai Pak Terrace, Kennedy Town",
    img: "images/house1.jpg",
    grossArea: 300,
    saleableArea: 240,
    bedrooms: 1,
    price: 14000,
    url: "#",
    regionName: "Kennedy Town"
  },
  {
    address: "Pokfulam Road",
    img: "images/house2.jpg",
    grossArea: 600,
    saleableArea: 500,
    bedrooms: 3,
    price: 24000,
    url: "#",
    regionName: "Sai Ying Pun"
  },
  {
    address: "Des Voeux Road West 432",
    img: "images/house1.jpg",
    grossArea: 1200,
    saleableArea: 1000,
    bedrooms: 4,
    price: 45000,
    url: "#",
    regionName: "Sai Ying Pun"
  }
];

class Search extends Component {
  constructor(props) {
    super(props);

    Array.prototype.diff = function(a) {
      return this.filter(function(i) {
        return a.indexOf(i) < 0;
      });
    };

    //   [
    //     { key: "Causeway Bay", value: "Causeway Bay", text: "Causeway Bay" },
    //     { key: "Kennedy Town", value: "Kennedy Town", text: "Kennedy Town" },
    //     { key: "HKU", value: "HKU", text: "HKU" },
    //     { key: "Sheung Wan", value: "Sheung Wan", text: "Sheung Wan" },
    //     { key: "Sai Ying Pun", value: "Sai Ying Pun", text: "Sai Ying Pun" }
    // ];

    const placeOptions = global.projectConstant.regionName;

    const poiOptions = [
      { key: "school", value: "school", text: "school" },
      { key: "mtr-station", value: "mtr-station", text: "mtr-station" },
      { key: "university", value: "university", text: "university" },
      { key: "park", value: "park", text: "park" },
      { key: "airport", value: "airport", text: "airport" },
      { key: "cafe", value: "cafe", text: "cafe" }
    ];

    const filterBasedOnBedrooms = data => {
      if (!this.state.bedrooms.status.isFiltered) return data;
      return data.filter(house => {
        return house.bedrooms >= this.state.bedrooms.data.value;
      });
    };

    const filterBasedOnSaleableArea = data => {
      if (!this.state.saleableArea.status.isFiltered) return data;
      return data.filter(house => {
        return (
          house.saleableArea >= this.state.saleableArea.data.value[0] &&
          (this.state.saleableArea.data.value[1] ===
          this.state.saleableArea.data.max
            ? true
            : house.saleableArea <= this.state.saleableArea.data.value[1])
        );
      });
    };

    const filterBasedOnGrossArea = data => {
      if (!this.state.grossArea.status.isFiltered) return data;
      return data.filter(house => {
        return (
          house.grossArea >= this.state.grossArea.data.value[0] &&
          (this.state.grossArea.data.value[1] === this.state.grossArea.data.max
            ? true
            : house.grossArea <= this.state.grossArea.data.value[1])
        );
      });
    };

    const filterBasedOnPrice = data => {
      if (!this.state.price.status.isFiltered) return data;
      return data.filter(house => {
        return (
          house.price >= this.state.price.data.value[0] &&
          (this.state.price.data.value[1] === this.state.price.data.max
            ? true
            : house.price <= this.state.price.data.value[1])
        );
      });
    };

    const filterHouse = data => {
      return filterBasedOnSaleableArea(
        filterBasedOnGrossArea(filterBasedOnPrice(filterBasedOnBedrooms(data)))
      );
    };

    const my = this;
    this.ft2 = "sq.ft.";

    this.state = {
      general: {
        data: {
          queries: houseData,
          filteredHouse: houseData
        },
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
          },
          onAfterValueUpdated: typeButton => {
            let newState = my.state;
            let data = newState[typeButton].data;
            let status = newState[typeButton].status;

            if (data.value[0] === data.min && data.value[1] === data.max) {
              status.isFiltered = false;
              status.text = status.defaultText;
            } else {
              status.isFiltered = true;
              status.text =
                data.value[0] +
                data.unit +
                " - " +
                data.value[1] +
                data.unit +
                (data.value[1] === data.max ? "+" : "");
            }

            newState.general.data.filteredHouse = filterHouse(
              newState.general.data.queries
            );

            my.setState(newState);
          }
        }
      },
      search: {
        status: {
          activeItem: "rent"
        },
        data: {
          options: placeOptions,
          value: null
        },
        handler: {
          handleChange: (e, { value }) => {
            let newState = { ...my.state };
            newState.search.data.value = value;
            my.setState(newState);
          },
          handleRentOrSell: (e, { name }) => {
            let newState = { ...my.state };
            newState.search.status.activeItem = name;
            my.setState(newState);
          }
        }
      },
      bedrooms: {
        status: {
          open: false,
          isFiltered: false
        },
        data: { value: 0 },
        handler: {}
      },
      saleableArea: {
        status: {
          open: false,
          isFiltered: false,
          text: "Saleable Area (" + my.ft2 + ")",
          defaultText: "Saleable Area (" + this.ft2 + ")"
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
            this.state.general.handler.rangeValueUpdate("saleableArea", value),
          onAfterValueUpdated: () =>
            this.state.general.handler.onAfterValueUpdated("saleableArea")
        }
      },
      grossArea: {
        status: {
          open: false,
          isFiltered: false,
          text: "Gross Area (" + my.ft2 + ")",
          defaultText: "Gross Area (" + this.ft2 + ")"
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
            this.state.general.handler.rangeValueUpdate("grossArea", value),
          onAfterValueUpdated: () =>
            this.state.general.handler.onAfterValueUpdated("grossArea")
        }
      },
      price: {
        status: {
          open: false,
          isFiltered: false,
          text: "Price (HKD)",
          defaultText: "Price (HKD)"
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
            this.state.general.handler.rangeValueUpdate("price", value),
          onAfterValueUpdated: () =>
            this.state.general.handler.onAfterValueUpdated("price")
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
        <Segment inverted attached>
          <NavigationBar />
        </Segment>
        <Menu pointing size="large" attached>
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
          <Menu.Item
            position="right"
            name="sell"
            active={search.status.activeItem === "sell"}
            onClick={search.handler.handleRentOrSell}
          >
            For sell
          </Menu.Item>
          <Menu.Item
            position="right"
            name="rent"
            active={search.status.activeItem === "rent"}
            onClick={search.handler.handleRentOrSell}
          >
            For rent
          </Menu.Item>
        </Menu>
        <Container>
          <Grid
            columns="equal"
            divided
            padded
            fluid="true"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 1000 }}>
              <Segment>
                <Header as="h3">Property for rent in {where}</Header>
                <div>
                  <Dropdown
                    text="Bedrooms"
                    floating
                    labeled
                    className="mr-3"
                    open={bedrooms.status.open}
                    onClick={() =>
                      general.handler.openHandler("bedrooms", true)
                    }
                    onBlur={() =>
                      general.handler.openHandler("bedrooms", false)
                    }
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
                    handler={saleableArea.handler}
                    data={saleableArea.data}
                    status={saleableArea.status}
                  />

                  <ScrollFilter
                    handler={grossArea.handler}
                    data={grossArea.data}
                    status={grossArea.status}
                  />

                  <ScrollFilter
                    handler={price.handler}
                    data={price.data}
                    status={price.status}
                  />

                  <Button
                    onClick={() => general.handler.openHandler("spm", true)}
                  >
                    SPM
                  </Button>
                  <SpmFilter
                    data={spm.data}
                    handler={spm.handler}
                    status={spm.status}
                    size="small"
                  />
                </div>
              </Segment>
              <HouseList data={general.data.filteredHouse} />
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default Search;
