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
    this.onClick = ({ x, y, lat, lng, event }) => {
      this.props.handler.updatePosition(lat, lng);
    };
    this.onChange = ({ center, zoom, bounds, marginBounds }) => {
      this.props.handler.updateMap(center, zoom);
    };
  }

  render() {
    const { data, status, handler } = this.props;
    const search = status.search;

    const listOfCustomObject = data.customObjects.map(customObject => {
      return (
        <CustomObjectUnit
          lat={customObject.pos.lat}
          lng={customObject.pos.lng}
          name={customObject.name}
          key={customObject.key}
          removeObject={handler.removeCustomObjectHandler}
          updateSelected={handler.updateSelected}
          color={status.selected === customObject.name ? "linkedin" : "grey"}
        />
      );
    });

    const listOfMapCustomObject = data.customObjects.map(customObject => {
      return (
        <Button
          className="map-object"
          compact
          size="tiny"
          key={customObject.name}
          color={status.selected === customObject.name ? "linkedin" : "grey"}
          lng={customObject.pos.lng}
          lat={customObject.pos.lat}
          onClick={() => handler.updateSelected(customObject.name)}
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
            onChange={handler.searchHandler}
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
                      handler.addCustomObjectHandler(status.center)
                    }
                    color="green"
                  />
                </Form.Group>
              </Form>
            </Grid.Row>
            {listOfCustomObject}
          </Grid.Column>
          <Grid.Column width={10}>
            <div style={{ height: "350px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyA2cdiYB3xgDumC7eu-1FTkMJkZPyHotlc"
                }}
                center={status.center}
                zoom={status.zoom}
                onClick={this.onClick}
                onChange={this.onChange}
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
              onClick={() => this.props.updateSelected(this.props.name)}
            >
              {this.props.name}
            </Button>
            <Button
              content="Remove"
              color="red"
              onClick={() => this.props.removeObject(this.props.name)}
            />
          </Form.Group>
        </Form>
      </Grid.Row>
    );
  }
}

export default CustomObject;
