import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Button,
  Sticky,
  Header,
  Label,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.center = {
      lat: 22.3964,
      lng: 114.1095
    };
    this.zoom = 15;
    this.state = {
      show: null
    };
  }

  setCenter() {
    let min_lat = 500,
      max_lat = 0,
      min_lng = 500,
      max_lng = 0,
      avg_lat = 0,
      avg_lng = 0;
    const houseData = this.props.data;
    houseData.forEach(function(prop) {
      if (prop.lat < min_lat) min_lat = prop.lat;
      if (prop.lat > max_lat) max_lat = prop.lat;
      if (prop.lng < min_lng) min_lng = prop.lng;
      if (prop.lng > max_lng) max_lng = prop.lng;
      avg_lat += prop.lat;
      avg_lng += prop.lng;
    });
    if (houseData.length !== 0) {
      avg_lat /= houseData.length;
      avg_lng /= houseData.length;
    }
    if (avg_lat === 0 && avg_lng === 0)
      this.center = { lat: 22.3964, lng: 114.1095 };
    else this.center = { lat: avg_lat, lng: avg_lng };
  }

  mouseEnter(id) {
    this.setState({ show: id });
    // console.log("MapContainer mouseEnter " + id);
  }

  mouseLeave(id) {
    this.setState({ show: null });
    // console.log("MapContainer mouseLeave " + id);
  }

  render() {
    this.setCenter();
    const listOfHouse = this.props.data.map(result => {
      let price_v2 = result.price / 10000;
      let flag_focus = result.id === this.props.state.focus;
      let flag_show = result.id === this.state.show;

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
              <b> Price </b> ${result.price} <br />
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

    return (
      <div id="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc" }}
          center={this.center}
          zoom={this.zoom}
        >
          {listOfHouse}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
