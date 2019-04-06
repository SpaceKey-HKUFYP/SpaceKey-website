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

import { Range } from "rc-slider";

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

class SpmGraph extends Component {
  render() {
    return <div />;
  }
}

class SpmFilter extends Component {
  render() {
    const { status, handler, data } = this.props;
    const { poiInput, wantedObjects, distOption } = data;

    const listOfWantedObjects = wantedObjects.map(val => {
      return (
        <WantedObject
          val={val.keyword}
          key={val.keyword}
          dir={val.dir}
          dist={val.dist}
          onDistanceChange={event =>
            handler.wantedObjectChange(val.keyword, "dist", event.target.value)
          }
          onDirectionChange={event =>
            handler.wantedObjectChange(val.keyword, "dir", event.target.value)
          }
        />
      );
    });

    const SimplePanel = () => (
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
    );

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
              <SimplePanel />
            </Grid.Column>
            <Grid.Column width={6}>
              <canvas
                id="myCanvas"
                style={{
                  border: "1px solid #000000",
                  width: "100%",
                  height: "100%"
                }}
              />{" "}
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Clear"
            onClick={handler.onClearButtonClicked}
          />
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

export { ScrollFilter, SpmFilter };
// export default Price_Modal, HomeType_Modal, MoreFilters_Modal };
