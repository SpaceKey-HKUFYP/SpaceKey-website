import React, { Component } from "react";
import {
  Segment,
  Menu,
  Button,
  Dropdown,
  Grid,
  Container,
  Header,
  Rail,
  Sticky,
  Loader,
  Dimmer
} from "semantic-ui-react";
import { SpmFilter, ScrollFilter, CustomObject } from "./FilterMenu";
import NavigationBar from "./NavigationBar";
import HouseList from "./HouseList";
import axios from "axios";

import "../layout.css";
import "rc-slider/assets/index.css";
import "../constant";

// public class Property {
// 	public int id;
// 	public String type;
// 	public int price;
// 	public int rent;
// 	public String roomNum;
// 	public int grossArea;
// 	public int netFloorArea;
// 	public String floor;
// 	public String address;
// 	public long postDate;
// 	public double lat;
// 	public double lng;
// 	public String title;
// 	public String region;
// 	public String propertyName;
// 	public String description;
// 	public String contact;
// 	public String phoneNum;
// 	public String imageURL;
// 	public String pageURL;
// 	public String agentName;
// }

class Search extends Component {
  constructor(props) {
    super(props);
    Array.prototype.diff = function(a) {
      return this.filter(function(i) {
        return a.indexOf(i) < 0;
      });
    };

    const regionOptions = global.projectConstant.regionName;

    const poiOptions = global.projectConstant.poiOptions;

    const filterBasedOnBedrooms = data => {
      if (!this.state.bedrooms.status.isFiltered) return data;
      return data.filter(house => {
        return (
          house.bedrooms >= this.state.bedrooms.data.value[0] &&
          (this.state.bedrooms.data.value[1] === this.state.bedrooms.data.max
            ? true
            : house.bedrooms <= this.state.bedrooms.data.value[1])
        );
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
        filterBasedOnGrossArea(
          filterBasedOnPrice(
            filterBasedOnBedrooms(JSON.parse(JSON.stringify(data)))
          )
        )
      );
    };

    const my = this;
    this.ft2 = "sq.ft.";

    this.state = {
      general: {
        status: {
          navigationBarContext: null,
          filterBarContext: null,
          isLoading: false
        },
        data: {
          queries: [],
          filteredHouse: [],
          sortedHouse: []
        },
        handler: {
          toogleLoading: () => {
            let newState = my.state;
            newState.general.status.isLoading = !newState.general.status
              .isLoading;
            my.setState(newState);
          },

          navigationBarContextHandler: ref => {
            let newState = my.state;
            newState.general.status.navigationBarContext = ref;
            my.setState(newState);
          },

          filterBarContextHandler: ref => {
            let newState = my.state;
            newState.general.status.filterBarContext = ref;
            my.setState(newState);
          },

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

            my.state.sort.updateSorted();
          }
        }
      },

      search: {
        status: {
          activeItem: "sell"
        },
        data: {
          options: regionOptions,
          value: null
        },
        handler: {
          handleChange: (e, { value }) => {
            let newState = { ...my.state };
            newState.search.data.value = value;
            my.setState(newState);
            this.state.search.handler.requestToAPI();
          },
          handleRentOrSell: (e, { name }) => {
            let newState = { ...my.state };
            newState.search.status.activeItem = name;
            my.setState(newState);
            this.state.search.handler.requestToAPI();
          },
          requestToAPI: () => {
            this.state.search.handler.handleRequestProperty();
          },
          handleRequestProperty: () => {
            const params = {
              region:
                this.state.search.data.value === null
                  ? "any"
                  : this.state.search.data.value.replace(/\+/g, "%20"),

              type: this.state.search.status.activeItem
            };
            // const data = new FormData();
            // data.set("wantedObjects", this.state.spm.data.wantedObjects);
            if (this.state.spm.status.isFiltered) {
              this.state.general.handler.toogleLoading();
              const checkDistance = dist => {
                if (dist === 3000) return -1;
                return dist;
              };
              let wantedObjectsParameter = this.state.spm.data.wantedObjects.map(
                wantedObj => {
                  let lower, upper;
                  const distValue = my.state.spm.data.distOption.data.value;
                  if (wantedObj.dist === "any") {
                    lower = 0;
                    upper = -1;
                  } else if (wantedObj.dist === "close") {
                    lower = checkDistance(distValue[0]);
                    upper = checkDistance(distValue[1]);
                  } else if (wantedObj.dist === "medium") {
                    lower = checkDistance(distValue[1]);
                    upper = checkDistance(distValue[2]);
                  } else if (wantedObj.dist === "far") {
                    lower = checkDistance(distValue[2]);
                    upper = checkDistance(distValue[3]);
                  } else {
                    lower = -1;
                    upper = -1;
                  }
                  return {
                    keyword: wantedObj.keyword,
                    dir: wantedObj.dir,
                    lower: lower,
                    upper: upper
                  };
                }
              );
              axios({
                method: "post",
                url: global.projectConstant.apiURL + "/alg/spm_simple",
                params: params,
                data: { wantedObjects: wantedObjectsParameter }
              }).then(res => {
                let newState = { ...my.state };
                newState.general.data.queries = res.data.houseData;
                newState.general.data.filteredHouse = filterHouse(
                  newState.general.data.queries
                );

                newState.spm.data.poiData = res.data.poiData;
                my.setState(newState);
                my.state.sort.updateSorted();
                this.state.general.handler.toogleLoading();
              });
            } else {
              this.state.general.handler.toogleLoading();
              axios({
                method: "get",
                url: global.projectConstant.apiURL + "/data/property/get",
                params: params
              }).then(res => {
                let newState = { ...my.state };
                newState.general.data.queries = res.data.houseData;
                newState.general.data.filteredHouse = filterHouse(
                  newState.general.data.queries
                );
                my.setState(newState);
                my.state.sort.updateSorted();
                this.state.general.handler.toogleLoading();
              });
            }
          },
          handleRequestPoi: () => {
            const data = new FormData();
            data.set("wantedObjects", this.state.spm.data.wantedObjects);
            if (this.state.spm.status.isFiltered) {
              this.state.general.handler.toogleLoading();
              axios
                .post(global.projectConstant.apiURL + "data/poi", {
                  params: {
                    type: this.state.search.status.activeItem,
                    region:
                      this.state.search.data.value === null
                        ? "any"
                        : this.state.search.data.value
                  },
                  data: data
                })
                .then(res => {
                  let newState = { ...my.state };
                  newState.spm.data.poiData = res.data.poiData;
                  my.setState(newState);
                  this.state.general.handler.toogleLoading();
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              let newState = { ...my.state };
              newState.spm.data.poiResult = [];
              my.setState(newState);
            }
          }
        }
      },

      bedrooms: {
        status: {
          open: false,
          isFiltered: false,
          text: "Bedrooms",
          defaultText: "Bedrooms"
        },
        data: {
          min: 0,
          max: 5,
          marks: { 0: "0", 5: "5" },
          step: 1,
          default: [0, 5],
          value: [0, 5],
          unit: ""
        },
        handler: {
          openDropdown: () =>
            this.state.general.handler.openHandler("bedrooms", true),
          closeDropdown: () =>
            this.state.general.handler.openHandler("bedrooms", false),
          rangeValueUpdate: value =>
            this.state.general.handler.rangeValueUpdate("bedrooms", value),
          onAfterValueUpdated: () =>
            this.state.general.handler.onAfterValueUpdated("bedrooms")
        }
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
          isFiltered: false,
          anyChanges: false
        },
        data: {
          poiInput: {
            value: [],
            options: poiOptions
          },
          wantedObjects: [],
          poiData: [],
          distOption: {
            data: {
              default: [0, 150, 300, 500],
              value: [0, 150, 300, 500],
              unit: "m"
            },
            handler: {
              rangeValueUpdate: value => {
                let newState = my.state;
                newState.spm.data.distOption.data.value = value;
                my.setState(newState);
              }
            }
          }
        },
        handler: {
          handleChange: (e, { value }) => {
            const oldValue = my.state.spm.data.poiInput.value;
            let newState = { ...my.state };

            if (oldValue.length < value.length) {
              const diffValue = value.diff(oldValue)[0];
              newState.spm.data.wantedObjects.push({
                keyword: diffValue,
                dir: "any",
                dist: "any"
              });
            } else {
              const diffValue = oldValue.diff(value)[0];
              newState.spm.data.wantedObjects = newState.spm.data.wantedObjects.filter(
                function(obj) {
                  return obj.keyword !== diffValue;
                }
              );
            }
            newState.spm.data.poiInput.value = value;
            if (value.length === 0) {
              newState.spm.status.isFiltered = false;
            } else {
              newState.spm.status.isFiltered = true;
            }
            my.setState(newState);
          },
          wantedObjectChange: (keyword, distOrDir, value) => {
            let newState = { ...my.state };
            my.state.spm.data.wantedObjects.forEach(function(wantedObject) {
              if (wantedObject.keyword === keyword) {
                wantedObject[distOrDir] = value;
              }
            });

            my.setState(newState);
          },
          closeModal: () => {
            this.state.general.handler.openHandler("spm", false);
            this.state.search.handler.requestToAPI();
          },
          onApplyButtonClicked: () => {
            this.state.search.handler.requestToAPI();
            this.state.general.handler.openHandler("spm", false);
          },
          onClearButtonClicked: () => {
            let newState = { ...my.state };
            newState.spm.data.poiInput = {
              value: [],
              options: poiOptions
            };
            newState.spm.data.wantedObjects = [];
            newState.spm.data.poiData = [];
            newState.spm.status.isFiltered = false;
            my.setState(newState);
          }
        }
      },

      custom_obj: {
        status: {
          open: false
        },
        data: {},
        handler: {
          onApplyButtonClicked: () => {
            this.state.search.handler.requestToAPI();
          }
        }
      },

      sort: {
        value: "default",
        options: [
          { key: "default", text: "Default", value: "default" },
          { key: "recent", text: "Recent", value: "recent" },
          { key: "highestPrice", text: "Highest price", value: "highestPrice" },
          { key: "lowestPrice", text: "Lowest price", value: "lowestPrice" },
          {
            key: "largestArea",
            text: "Largest saleable area",
            value: "largestArea"
          },
          {
            key: "smallestArea",
            text: "smallest saleable area",
            value: "smallestArea"
          }
        ],
        handler: {
          onChange: (e, { value }) => {
            let newState = { ...my.state };
            newState.sort.value = value;
            my.setState(newState);
            my.state.sort.updateSorted();
          }
        },
        updateSorted: () => {
          let newState = { ...my.state };
          const method = newState.sort.value;

          newState.general.data.sortedHouse = JSON.parse(
            JSON.stringify(newState.general.data)
          ).filteredHouse;

          let sorted = newState.general.data.sortedHouse;

          if (method === "default") {
          } else if (method === "recent") {
            sorted.sort((a, b) => (a.postDate > b.postDate ? 1 : -1));
          } else if (method === "highestPrice") {
            sorted.sort((a, b) => (a.price < b.price ? 1 : -1));
          } else if (method === "lowestPrice") {
            sorted.sort((a, b) => (a.price > b.price ? 1 : -1));
          } else if (method === "largestArea") {
            sorted.sort((a, b) => (a.saleableArea < b.saleableArea ? 1 : -1));
          } else {
            sorted.sort((a, b) => (a.saleableArea > b.saleableArea ? 1 : -1));
          }

          my.setState(newState);
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
      spm,
      sort,
      custom_obj
    } = this.state;

    let where;
    if (search.data.value === null) {
      where = "Hong Kong";
    } else {
      where = search.data.value;
    }

    let spmButtonColor = "grey";
    if (spm.status.isFiltered) {
      spmButtonColor = "red";
    }

    return (
      <div ref={general.handler.navigationBarContextHandler}>
        <Rail
          internal
          position="left"
          attached
          style={{
            top: "auto",
            height: "auto",
            width: "100%",
            backgroundColor: "white",
            zIndex: 1000
          }}
        >
          <Sticky context={general.status.navigationBarContext}>
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
                clearable
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
                padded
                divided={false}
                fluid="true"
                style={{ height: "100%" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: "1400px" }}>
                  <Segment>
                    <Header as="h3">Property for rent in {where}</Header>
                    <div>
                      <ScrollFilter
                        handler={bedrooms.handler}
                        data={bedrooms.data}
                        status={bedrooms.status}
                      />

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
                        color={spmButtonColor}
                        size="mini"
                      >
                        SPM
                      </Button>
                      <SpmFilter
                        data={spm.data}
                        handler={spm.handler}
                        status={spm.status}
                        size="small"
                      />

                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={() => general.handler.openHandler("spm", true)}
                        size="mini"
                      >
                        Add Custom Object
                      </Button>
                      <CustomObject
                        data={custom_obj.data}
                        handler={custom_obj.handler}
                        status={custom_obj.status}
                        size="small"
                      />

                      <div className="floatRight">
                        sort:&nbsp;
                        <Dropdown
                          options={sort.options}
                          defaultValue={sort.value}
                          onChange={sort.handler.onChange}
                        />
                      </div>
                    </div>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Container>
          </Sticky>
        </Rail>
        <Container style={{ paddingTop: "265.9px" }}>
          <Grid
            columns="equal"
            divided
            padded
            fluid="true"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: "1400px" }}>
              <HouseList
                data={general.data.sortedHouse}
                poi={spm.data.poiData}
              />
            </Grid.Column>
          </Grid>
        </Container>
        <Dimmer active={general.status.isLoading}>
          <Loader
            active={general.status.isLoading}
            inline="centered"
            id="loader"
          >
            Getting properties
          </Loader>
        </Dimmer>
      </div>
    );
  }
}

export default Search;
