import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Button,
  Sticky,
  Header,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.data);
    console.log(this.props.map);

    const listOfHouse = this.props.data.map(result => {
      var price_v2 = result.price / 10000;
      return (
        <Button
          compact
          color="twitter"
          size="tiny"
          style={{ textAlign: "center" }}
          lat={result.lat}
          lng={result.lng}
          key={result.id}
        >
          ${price_v2}萬
        </Button>
      );
    });

    console.log(listOfHouse);
    return (
      <div id="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc" }}
          center={this.props.map.center}
          zoom={this.props.map.zoom}
        >
          {listOfHouse}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
