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

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.center = { lat: 22.3964, lng: 114.1095 };
    this.zoom = 15;
    this.state = {
      show: null,
      showAddButton: { show: false, lat: 0, lng: 0 }
    };
    console.log("constructed with state id" + this.state.show)
  }

  mouseEnter(id) {
    this.setState({ show: id });
  }

  mouseLeave(id) {
    this.setState({ show: null });
  }

  setCenter() {
    let min_lat = 500,
      max_lat = 0,
      min_lng = 500,
      max_lng = 0,
      avg_lat = 0.0,
      avg_lng = 0.0,
      count = 0;
    const houseData = this.props.data;

    houseData.forEach(function(prop) {
      if (prop.lat < min_lat) min_lat = prop.lat;
      if (prop.lat > max_lat) max_lat = prop.lat;
      if (prop.lng < min_lng) min_lng = prop.lng;
      if (prop.lng > max_lng) max_lng = prop.lng;

      if(Math.abs(prop.lat - avg_lat/count) > 1 || Math.abs(prop.lng - avg_lng/count) > 1){
        //console.log("!!!!!!!")
        //console.log(prop)
      }
      else {
        avg_lat += prop.lat;
        avg_lng += prop.lng;
        count += 1;
      }
    });
    if (count !== 0) {
      avg_lat /= count;
      avg_lng /= count;
    }

    if (avg_lat === 0 && avg_lng === 0)
      this.center = { lat: 22.3964, lng: 114.1095 };
    else this.center = { lat: avg_lat, lng: avg_lng };
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
      const price_v2 = result.type === "rent"
        ? result.rent/1000.0 + "k"
          :result.price / 1000000.0 + "M";
      const flag_focus = result.id === this.props.status.focus;
      const flag_show = result.id === this.state.show;
      if(result.id === this.state.show) console.log("!!!!!!!!!!!")

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

          >
            ${price_v2}
          </Button>
        );
      } else {
        console.log("display popup")
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
                onMouseLeave={() => this.mouseLeave(result.id)}
              >
                ${price_v2}
              </Button>
            }
            content="???"
          >
            <Popup.Header> {result.title} </Popup.Header>
            <Popup.Content>
              {result.propertyName}, {result.region} <br />
              <b> Price </b> ${price_v2} <br />
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

    this.setCenter();
    var _onClick = ({ x, y, lat, lng, event }) => {};

    // const listOfCustomObject = customObjects.map(customObject => {
    //   return (
    //     <Button
    //       compact
    //       size="tiny"
    //       style={{ textAlign: "center" }}
    //       key={customObject.name}
    //       lat={customObject.pos.lat}
    //       lng={customObject.pos.lng}
    //     >
    //       {customObject.name}
    //     </Button>
    //   );
    // });

    return (
      <div id="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc" }}
          center={this.center}
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
