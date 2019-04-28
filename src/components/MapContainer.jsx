import React, { createRef, Component, Fragment } from "react";
import { Button, Popup } from "semantic-ui-react";
import GoogleMapReact, { Polyline } from "google-map-react";
import "../constant";
import axios from "axios";

class House extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const result = this.props.result;
    const price_v2 =
      result.type === "rent"
        ? result.rent / 1000.0 + "k"
        : result.price / 1000000.0 + "M";

    const houseShow = this.props.pstate.houseShow;
    const houseShowed = this.props.pstate.houseShowed;
    const houseSelect = this.props.pstate.houseSelect;
    const houseSelected = this.props.pstate.houseSelected;

    const flag_focus = this.props.focus;
    const flag_show = houseShow && result.id === houseShowed.id;
    const flag_select = houseSelect && result.id === houseSelected.id;

    if (!houseSelect || (houseSelect && flag_select)) {
      return (
        <Fragment>
          <Popup
            basic
            on="focus"
            open={flag_show}
            trigger={
              <Button
                className="map-object"
                compact
                size="tiny"
                key={result.id}
                color={flag_focus ? "red" : "twitter"}
                onClick={() => this.props.showHouse(result)}
              >
                ${price_v2}
              </Button>
            }
          >
            <Popup.Header> {result.title} </Popup.Header>
            <Popup.Content>
              {result.propertyName}, {result.region} <br />
              <b> Price </b> ${price_v2} <br />
              <b> Gross Area </b> {result.grossArea} sq. ft <br />
              <b> Net Floor Area </b> {result.netFloorArea} sq. ft <br />
              <b> Address </b> {result.address} <br />
              <b> Post date </b> {result.postDate} <br />
              <b> Agency </b> {result.agentName} <br /> <br />
              <Button
                color={flag_select ? "red" : "twitter"}
                onClick={() => this.props.selectHouse(result)}
              >
                {" "}
                Select{" "}
              </Button>
            </Popup.Content>
          </Popup>
        </Fragment>
      );
    } else return null;
  }
}

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.center = { lat: 22.3964, lng: 114.1095 };
    this.zoom = 15;
    this.state = {
      houseShow: false,
      houseShowed: null,
      houseSelect: false,
      houseSelected: null,
      objsSelected: []
    };

    this.showHouse = result => {
      if (this.state.houseShow && this.state.houseShowed.id === result.id)
        this.setState({ houseShow: false, houseShowed: null });
      else this.setState({ houseShow: true, houseShowed: result });
    };

    this.selectHouse = result => {
      if (this.state.houseSelect && this.state.houseSelected.id === result.id)
        this.setState({ houseSelect: false, houseSelected: null });
      else this.setState({ houseSelect: true, houseSelected: result });
    };

    this.toggleRouting = (lat, lng) => {
      console.log(lat, lng);
      if (this.state.houseSelect) {
        for (var obj in this.state.objsSelected) {
          if (obj.lat === lat && obj.lng === lng) {
            obj.display = !obj.display;
            return;
          }
        }
        this.requestRouting(lat, lng);
      }
    };

    this.requestRouting = (lat, lng) => {
      const params = {
        origin:
          String(this.state.houseSelected.lat) +
          "," +
          String(this.state.houseSelected.lng),
        destination: String(lat) + "," + String(lng),
        key: global.projectConstant.googleMapKey
      };
      console.log(params);
      // "https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc&origin=22.2419,114.1529&destination=22.2616,114.1338"
      axios({
        method: "get",
        url: global.projectConstant.googleMapDirectionURL,
        params: params
      }).then(res => {
        var points = res.data.routes[0].legs[0].steps.map(point => {
          return {
            lat: point.start_location.lat,
            lng: point.start_location.lng
          };
        });
        points.push({
          lat: lat,
          lng: lng
        });
        var objsSelected = this.state.objsSelected;
        objsSelected.push({
          lat: lat,
          lng: lng,
          display: true,
          route: points
        });
        this.setState({ objsSelected: objsSelected });
        console.log(this.state.objsSelected);
      });
    };

    this.resetShow = () => {
      this.setState({ houseShow: false, houseShowed: null, objsSelected: [] });
    };

    this.reset = () => {
      this.setState({
        houseShow: false,
        houseShowed: null,
        houseSelect: false,
        houseSelected: null,
        objsSelected: []
      });
    };

    this.setCenter = () => {
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
        if (
          Math.abs(prop.lat - avg_lat / count) > 1 ||
          Math.abs(prop.lng - avg_lng / count) > 1
        ) {
        } else {
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
    };
  }

  render() {
    const { poi, customObjects, data } = this.props;
    var colors = global.projectConstant.colors.slice();
    var poiToColor = {};
    for (var i = 0; i < poi.length; i++) {
      if (poiToColor[poi[i].searchKey] === undefined) {
        poiToColor[poi[i].searchKey] = colors.pop();
      }
    }

    const listOfMapCustomObject = customObjects.map(customObject => {
      return (
        <Button
          className="map-object"
          compact
          size="tiny"
          key={customObject.id}
          color="grey"
          lng={customObject.pos.lng}
          lat={customObject.pos.lat}
          onClick={() =>
            this.toggleRouting(customObject.pos.lat, customObject.pos.lng)
          }
        >
          {customObject.name}
        </Button>
      );
    });

    const listOfPoi = poi.map(poi => {
      return (
        <Button
          className="map-object"
          compact
          size="tiny"
          key={poi.id}
          lat={poi.lat}
          lng={poi.lng}
          color={poiToColor[poi.searchKey]}
          onClick={() => this.toggleRouting(poi.lat, poi.lng)}
        >
          {poi.searchKey}
        </Button>
      );
    });

    const listOfHouse = data.map(result => {
      return (
        <House
          key={result.id}
          lat={result.lat}
          lng={result.lng}
          result={result}
          pstate={this.state}
          focus={result.id === this.props.status.focus}
          showHouse={this.showHouse}
          selectHouse={this.selectHouse}
        />
      );
    });

    const listOfRoute = this.state.objsSelected
      .filter(obj => obj.display)
      .map(obj => {
        return obj.route;
      });

    console.log(listOfRoute);
    var listOfPoint = [];

    if (listOfRoute.length !== 0) {
      var points = listOfRoute[0];
      var size = points.length - 1;
      for (var k = 0; k < size; k++) {
        const pointA = points[k];
        const pointB = points[k + 1];

        var numOfPoints =
          (Math.sqrt(
            Math.pow(pointA.lat - pointB.lat, 2) +
              Math.pow(pointA.lng - pointB.lng, 2)
          ) *
            80000) /
          this.zoom;
        var pointJump = {
          lat: (pointB.lat - pointA.lat) / numOfPoints,
          lng: (pointB.lng - pointA.lng) / numOfPoints
        };

        for (var j = 0; j <= numOfPoints; j++) {
          listOfPoint.push(
            <div
              class="dot"
              lat={pointA.lat + j * pointJump.lat}
              lng={pointA.lng + j * pointJump.lng}
            />
          );
        }
      }
    }

    this.setCenter();
    return (
      <div id="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: global.projectConstant.googleMapKey }}
          center={this.center}
          zoom={this.zoom}
          onDrag={this.resetShow}
          onZoomAnimationStart={this.resetShow}
        >
          {listOfHouse}
          {listOfPoi}
          {listOfMapCustomObject}
          {listOfPoint}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
