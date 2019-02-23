import React, { Component } from "react";
import {
  Button,
  Modal,
  Tab,
  Grid,
  Label,
  Dropdown,
  Form,
  Header
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

class SpmFilter extends Component {
  render() {
    const { poiInput, wantedObjects } = this.props.data;
    const handler = this.props.handler;
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

    const AdvancedPanel = () => <div>this is advanced</div>;

    return (
      <Modal
        size={this.props.size}
        open={this.props.status.open}
        onClose={handler.closeModal}
        centered={false}
      >
        <Modal.Header>SPM</Modal.Header>
        <Modal.Content>
          <SimplePanel />
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
                    <option value="close">close (0-150m)</option>
                    <option value="medium">medium (150-500m)</option>
                    <option value="far">far (500-1000m)</option>
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
