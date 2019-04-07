import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Button,
  Header,
  Modal,
  Input,
  Form,
  Label,
  Dropdown
} from "semantic-ui-react";
import "../layout.css";
import GoogleMapReact from "google-map-react";

class CustomObject extends Component {
  constructor(props) {
    super(props);

    const regionOptions = global.projectConstant.regionName;
    const my = this;

    this._onClick = ({ x, y, lat, lng, event }) => {
      this.props.handler.updatePosition(lat, lng);
    };

    this.state = {
      search: { options: regionOptions, value: null },
      status: { center: { lat: 22.3964, lng: 114.1095 }, zoom: 15 },
      handler: {
        searchHandler: (e, { value }) => {
          let newState = { ...my.state };
          newState.search.value = value;
          newState.status.center = regionOptions.filter(region => {
            return region.key === value;
          })[0].position;

          my.setState(newState);
        }
      }
    };
  }

  render() {
    const { data, status, handler } = this.props;
    const search = this.state.search;

    const listOfCustomObject = data.customObjects.map(customObject => {
      return (
        <CustomObjectUnit
          lat={customObject.pos.lat}
          lng={customObject.pos.lng}
          name={customObject.name}
          id={customObject.id}
          key={customObject.key}
          removeObject={handler.removeCustomObjectHandler}
          updateSelected={handler.updateSelected}
          color={status.selected === customObject.id ? "linkedin" : "grey"}
        />
      );
    });

    const listOfMapCustomObject = data.customObjects.map(customObject => {
      return (
        <Button
          className="map-object"
          compact
          size="tiny"
          key={customObject.id}
          color={status.selected === customObject.id ? "linkedin" : "grey"}
          lng={customObject.pos.lng}
          lat={customObject.pos.lat}
          onClick={() => handler.updateSelected(customObject.id)}
        >
          {customObject.name}
        </Button>
      );
    });

    return (
      <Grid divided={false} padded={false}>
        <Grid.Row>
          <Dropdown
            fluid
            selection
            multiple={false}
            search={true}
            options={search.options}
            placeholder="Select Area"
            value={search.value}
            onChange={this.state.handler.searchHandler}
          />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Grid.Row>
              <Form>
                <Form.Group>
                  <Form.Input
                    placeholder="Name"
                    value={data.customObjectNameInput}
                    onChange={handler.customObjectNameInputHandler}
                  />
                  <Form.Button
                    content="Add"
                    onClick={() =>
                      handler.addCustomObjectHandler(this.state.status.center)
                    }
                    color="green"
                  />
                </Form.Group>
              </Form>
            </Grid.Row>
            {listOfCustomObject}
          </Grid.Column>
          <Grid.Column width={10}>
            <div style={{ height: "500px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc"
                }}
                center={this.state.status.center}
                zoom={this.state.status.zoom}
                onClick={this._onClick}
              >
                {listOfMapCustomObject}
              </GoogleMapReact>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

class CustomObjectUnit extends Component {
  render() {
    return (
      <Grid.Row>
        <Form>
          <Form.Group>
            <Button
              color={this.props.color}
              style={{ width: "50%" }}
              onClick={() => this.props.updateSelected(this.props.id)}
            >
              {this.props.name}
            </Button>
            <Button
              content="Remove"
              color="red"
              onClick={() => this.props.removeObject(this.props.id)}
            />
          </Form.Group>
        </Form>
      </Grid.Row>
    );
  }
}

export default CustomObject;
