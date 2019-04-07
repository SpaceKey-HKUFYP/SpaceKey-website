import React, { Component } from "react";
import {
  Button,
  Modal,
  Grid,
  Label,
  Dropdown,
  Form,
  Header,
  Segment,
  Input
} from "semantic-ui-react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import CustomObject from "./CustomObject";

import { Range } from "rc-slider";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../layout.css";
import "rc-slider/assets/index.css";

class ScrollFilter extends Component {
  render() {
    const { data, status } = this.props;
    const handler = this.props.handler;

    const info =
      data.value[0] +
      data.unit +
      " - " +
      data.value[1] +
      data.unit +
      (data.value[1] === data.max ? "+" : "");
    return (
      <Dropdown
        text={status.text}
        floating
        labeled
        className="mr-3"
        open={status.open}
        onClick={handler.openDropdown}
        onBlur={handler.closeDropdown}
      >
        <Dropdown.Menu>
          <Dropdown.Header>
            <Header as="h4">{status.defaultText}</Header>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Header>
            <Header as="h5">{info}</Header>
          </Dropdown.Header>
          <Dropdown.Header>
            <div className="scrollFilter-range-wrapper">
              <Range
                value={data.value}
                default={data.default}
                onChange={handler.rangeValueUpdate}
                step={data.step}
                marks={data.marks}
                min={data.min}
                max={data.max}
                style={{ width: "360px" }}
                onAfterChange={handler.onAfterValueUpdated}
              />
            </div>
          </Dropdown.Header>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

class SpmFilter extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
    this.spmGraph = React.createRef();
  }

  render() {
    const { status, handler, data, customObject } = this.props;
    const { poiInput, wantedObjects, distOption } = data;
    const listOfWantedObjects = wantedObjects.map(val => {
      return (
        <WantedObject
          val={val.keyword}
          key={val.keyword}
          dir={val.dir}
          dist={val.dist}
          onDistanceChange={event => {
            handler.wantedObjectChange(val.keyword, "dist", event.target.value);
            this.spmGraph.current.blinkPOI(val.keyword, wantedObjects);
          }}
          onDirectionChange={event => {
            handler.wantedObjectChange(val.keyword, "dir", event.target.value);
            this.spmGraph.current.blinkPOI(val.keyword, wantedObjects);
          }}
        />
      );
    });

    const distVal = distOption.data.value;
    const distUnit = distOption.data.unit;
    const distToLabel = dist => {
      if (dist === 3000) return "infinity";
      return dist + distUnit;
    };
    const rangeLabel1 =
      "close: " + distToLabel(distVal[0]) + " - " + distToLabel(distVal[1]);
    const rangeLabel2 =
      "medium: " + distToLabel(distVal[1]) + " - " + distToLabel(distVal[2]);
    const rangeLabel3 =
      "far: " + distToLabel(distVal[2]) + " - " + distToLabel(distVal[3]);

    return (
      <Modal
        size={this.props.size}
        open={status.open}
        onClose={handler.closeModal}
        id="spm-modal"
      >
        <Modal.Header>SPM</Modal.Header>
        <Modal.Content>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.setState({ tabIndex })}
          >
            <TabList>
              <Tab>Point of Interests</Tab>
              <Tab>Custom Object</Tab>
            </TabList>
            <TabPanel>
              <Grid>
                <Grid.Column width={10}>
                  <Segment>
                    <div style={{ padding: "10px" }}>{rangeLabel1} </div>
                    <div style={{ padding: "10px" }}>{rangeLabel2} </div>
                    <div style={{ padding: "10px" }}>{rangeLabel3} </div>
                    <div className="scrollFilter-range-wrapper">
                      <Range
                        value={distOption.data.value}
                        default={distOption.data.default}
                        onChange={distOption.handler.rangeValueUpdate}
                        step={1}
                        marks={{
                          0: "0m",
                          1000: "1000m",
                          2000: "2000m",
                          3000: "Infinity"
                        }}
                        min={0}
                        max={3000}
                        count={3}
                        pushable={100}
                      />
                    </div>
                  </Segment>
                  <Grid columns="equal" divided={false} padded fluid="true">
                    <Grid.Row>
                      <Grid.Column>
                        <Dropdown
                          fluid
                          selection
                          multiple={true}
                          search={true}
                          options={poiInput.options}
                          value={poiInput.value}
                          placeholder="Add point of interest"
                          onChange={handler.handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    {listOfWantedObjects}
                  </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                  <SpmGraph ref={this.spmGraph} />
                </Grid.Column>
              </Grid>
            </TabPanel>
            <TabPanel>
              <CustomObject
                data={customObject.data}
                handler={customObject.handler}
                status={customObject.status}
              />
            </TabPanel>
          </Tabs>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Apply"
            onClick={handler.onApplyButtonClicked}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

class SpmGraph extends Component {
  constructor(props) {
    super(props);

    const drawPOI = pois => {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      for (var poi in pois) {
      }
    };

    this.state = {
      status: {},
      data: {},
      handler: {}
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    //  circles
    const maxR = Math.min(w, h) / 2 - 1;
    for (var i = 3; i >= 1; i--) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, (maxR / 3) * i, 0, 2 * Math.PI);
      // set colors for sections
      if (i === 1) ctx.fillStyle = "green";
      else if (i === 2) ctx.fillStyle = "yellow";
      else if (i === 3) ctx.fillStyle = "red";
      // draw circles
      ctx.fill();
      if (i !== 3) ctx.stroke();
      else {
        const step = Math.PI / 30;
        for (let b = 0, e = step / 2; e <= 2 * Math.PI; b += step, e += step) {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, maxR, b, e);
          ctx.stroke();
        }
      }
    }
    // lines
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h);
    ctx.moveTo(0, h);
    ctx.lineTo(w, 0);
    ctx.stroke();
    // directions text
    ctx.font = "15px Georgia";
    const offset = 15;
    ctx.fillText("N", w / 2, 0 + offset);
    ctx.fillText("S", w / 2, h);
    ctx.fillText("E", w - offset, h / 2);
    ctx.fillText("W", 0, h / 2);
  }

  blinkPOI(keyword, wantedObjects) {
    for (var i = 0; i < wantedObjects.length; i++) {
      if (wantedObjects[i].keyword === keyword) {
        var poi = wantedObjects[i];
      }
    }
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const maxR = Math.min(w, h) / 2 - 1;
    // decide the radius, start angle, end angle.
    var ra, rb, s, t;
    if (poi.dist === "close") {
      ra = 0;
      rb = (maxR / 3) * 1;
    } else if (poi.dist === "medium") {
      ra = (maxR / 3) * 1;
      rb = (maxR / 3) * 2;
    } else if (poi.dist === "far") {
      ra = (maxR / 3) * 2;
      rb = (maxR / 3) * 3;
    } else {
      ra = (maxR / 3) * 2;
      rb = (maxR / 3) * 3;
    }
    if (poi.dir === "north") {
      s = -Math.PI / 4;
      t = Math.PI / 4;
    } else if (poi.dir === "south") {
      s = Math.PI / 4;
      t = Math.PI / 4 + Math.PI / 2;
    } else if (poi.dir === "west") {
      s = Math.PI / 4 + Math.PI / 2;
      t = Math.PI / 4 + (Math.PI / 2) * 2;
    } else if (poi.dir === "east") {
      s = Math.PI / 4 + (Math.PI / 2) * 2;
      t = Math.PI / 4 + (Math.PI / 2) * 3;
    } else {
      s = 0;
      t = Math.PI * 2;
    }
    console.log(ra, rb, s, t);
    // fill the shape
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, ra, 0, Math.PI * 2);
    // ctx.arc(w / 2, h / 2, rb, t, s);
    ctx.fill();
    ctx.stroke();
  }

  render() {
    return (
      <canvas
        ref="canvas"
        style={{
          border: "0px solid #000000",
          width: "100%",
          height: "100%"
        }}
      />
    );
  }
}

class WantedObject extends Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column>
          <Grid columns="equal" divided={false} fluid="true">
            <Grid.Row>
              <Grid.Column>
                <Label>{this.props.val}</Label>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Field
                    control="select"
                    value={this.props.dir}
                    onChange={this.props.onDirectionChange}
                  >
                    <option value="any">any direction</option>
                    <option value="north">north</option>
                    <option value="east">east</option>
                    <option value="south">south</option>
                    <option value="west">west</option>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Field
                    control="select"
                    value={this.props.dist}
                    onChange={this.props.onDistanceChange}
                  >
                    <option value="any">any distance</option>
                    <option value="close">close</option>
                    <option value="medium">medium</option>
                    <option value="far">far</option>
                    <option value="inf">unwanted</option>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export { ScrollFilter, SpmFilter, SpmGraph };
// export default Price_Modal, HomeType_Modal, MoreFilters_Modal };
