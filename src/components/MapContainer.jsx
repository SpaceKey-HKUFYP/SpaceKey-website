import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Button,
  Sticky,
  Header,
  Label,
  Popup,
  Menu
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import "../constant";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.zoom = 15;
    this.state = {
      show: null,
      showAddButton: { show: false, lat: 0, lng: 0 }
    };
  }

  mouseEnter(id) {
    this.setState({ show: id });
  }

  mouseLeave(id) {
    this.setState({ show: null });
  }

  render() {
    const { poi, customObjects, data } = this.props;

    var colors = global.projectConstant.colors.slice();
    var poiToColor = {};

    var i;

    for (i = 0; i < poi.length; i++) {
      if (poiToColor[poi[i].searchKey] === undefined) {
        poiToColor[poi[i].searchKey] = colors.pop();
      }
    }

    const listOfPoi = poi.map(poi => {
      return (
        <Button
          compact
          size="tiny"
          style={{ textAlign: "center" }}
          key={poi.id}
          lat={poi.lat}
          lng={poi.lng}
          color={poiToColor[poi.searchKey]}
        >
          {poi.searchKey}
        </Button>
      );
    });

    const listOfHouse = data.map(result => {
      const price_v2 = result.price / 10000;
      const flag_focus = result.id === this.props.status.focus;
      const flag_show = result.id === this.state.show;

      if (!flag_show) {
        return (
          <Button
            compact
            size="tiny"
            style={{ textAlign: "center" }}
            lat={result.lat}
            lng={result.lng}
            key={result.id}
            color={flag_focus ? "red" : "twitter"}
            onMouseEnter={() => this.mouseEnter(result.id)}
            onMouseLeave={() => this.mouseLeave(result.id)}
          >
            ${price_v2}萬
          </Button>
        );
      } else {
        return (
          <Popup
            lat={result.lat}
            lng={result.lng}
            basic
            on="focus"
            trigger={
              <Button
                compact
                size="tiny"
                style={{ textAlign: "center" }}
                key={result.id}
                color={flag_focus ? "red" : "twitter"}
                onMouseEnter={() => this.mouseEnter(result.id)}
                onMouseLeave={() => this.mouseLeave(result.id)}
              >
                ${price_v2}萬
              </Button>
            }
            content="???"
          >
            <Popup.Header> {result.title} </Popup.Header>
            <Popup.Content>
              {result.propertyName}, {result.region} <br />
              <b> Price </b> ${result.price / 10000}萬 <br />
              <b> Gross Area </b> {result.grossArea} sq. ft <br />
              <b> Net Floor Area </b> {result.netFloorArea} sq. ft <br />
              <b> Address </b> {result.address} <br />
              <b> Post date </b> {result.postDate} <br />
              <b> Agency </b> {result.agentName} <br />
            </Popup.Content>
          </Popup>
        );
      }
    });

    var _onClick = ({ x, y, lat, lng, event }) => {
      if (customObjects.status.isAddingCustomObject) {
      }
    };

    return (
      <div id="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc" }}
          center={this.props.mapCenter}
          zoom={this.zoom}
          onClick={_onClick}
        >
          {listOfHouse}
          {listOfPoi}
        </GoogleMapReact>
      </div>
    );
  }
}

class AddCustomObjectButton extends Component {
  render() {
    const displayOption = this.props.show
      ? { display: "block" }
      : { display: "none" };
    return (
      <div style={displayOption}>
        <Button compact size="tiny" style={{ textAlign: "center" }}>
          add custom object
        </Button>
      </div>
    );
  }
}

export default MapContainer;
