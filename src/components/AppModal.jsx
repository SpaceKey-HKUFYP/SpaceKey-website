import React, { Component } from "react";
import {
  Button,
  Modal,
  Checkbox,
  Tab,
  Grid,
  Label,
  Dropdown,
  Form
} from "semantic-ui-react";
import InputRange from "react-input-range";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

class DatesModal extends Component {
  render() {
    return (
      <Modal
        size={this.props.size}
        open={this.props.open}
        onClose={this.props.onClose}
        centered={false}
      >
        <Modal.Content>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.props.data.startDate}
            endDate={this.props.data.endDate}
            onDatesChange={this.props.onDatesChange}
            focusedInput={this.props.data.focusedInput}
            onFocusChange={this.props.onFocusChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative content="Clear" />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Apply"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

class PricesModal extends Component {
  render() {
    return (
      <Modal
        size={this.props.size}
        open={this.props.open}
        onClose={this.props.onClose}
        centered={false}
      >
        <Modal.Content>
          <InputRange
            maxValue={this.props.data.maxValue}
            minValue={this.props.data.minValue}
            value={this.props.data.value}
            onChange={this.props.onChange}
            formatLabel={value => `${value} HKD`}
          />
          <div>
            {this.props.data.value.min} - {this.props.data.value.max}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content="Clear" />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Apply"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

class HomeTypeModal extends Component {
  render() {
    return (
      <Modal
        size={this.props.size}
        open={this.props.open}
        onClose={this.props.onClose}
        centered={false}
      >
        <Modal.Content>
          <Checkbox
            fitted
            toggle
            onChange={() => this.props.onChecked("entirePlace")}
            checked={this.props.data.entirePlace.checked}
            label="Entire place"
          />
          <Checkbox
            fitted
            toggle
            onChange={() => this.props.onChecked("privateRoom")}
            checked={this.props.data.privateRoom.checked}
            label="Private room - Have your own room and share some common spaces"
          />
          <Checkbox
            fitted
            toggle
            onChange={() => this.props.onChecked("sharedRoom")}
            checked={this.props.data.sharedRoom.checked}
            label="Shared room - Stay in a shared space, like a common room"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative content="Clear" />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Apply"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

class MoreFiltersModal extends Component {
  render() {
    const { poi, wantedObjects } = this.props.data;
    const handler = this.props.handler;
    const listOfWantedObjects = wantedObjects.map(val => {
      return (
        <WantedObject
          val={val.id}
          key={val.id}
          dir={val.dir}
          dist={val.dist}
          onDistanceChange={event =>
            handler.wantedObjectChange(val.id, "dist", event.target.value)
          }
          onDirectionChange={event =>
            handler.wantedObjectChange(val.id, "dir", event.target.value)
          }
        />
      );
    });

    const SimplePanel = () => (
      <Grid columns="equal" divided padded fluid="true">
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              fluid
              selection
              multiple={true}
              search={true}
              options={poi.options}
              value={poi.value}
              placeholder="Add point of interest"
              onChange={handler.handleChange}
            />
          </Grid.Column>
        </Grid.Row>
        {listOfWantedObjects}
      </Grid>
    );

    const AdvancedPanel = () => <div>this is advanced</div>;

    const panes = [
      {
        menuItem: "Simple",
        render: () => (
          <Tab.Pane attached={false}>
            {" "}
            <SimplePanel />{" "}
          </Tab.Pane>
        )
      },
      {
        menuItem: "Advanced",
        render: () => (
          <Tab.Pane attached={false}>
            {" "}
            <AdvancedPanel />{" "}
          </Tab.Pane>
        )
      }
    ];
    return (
      <Modal
        size={this.props.size}
        open={this.props.open}
        onClose={this.props.onClose}
        centered={false}
      >
        <Modal.Content>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative content="Clear" />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Apply"
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
          <Grid columns="equal" divided fluid="true">
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
                    <option value="close">close (0-500m)</option>
                    <option value="medium">medium (500-1000m)</option>
                    <option value="far">far (1000-1500m)</option>
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

export { DatesModal, PricesModal, HomeTypeModal, MoreFiltersModal };
// export default Price_Modal, HomeType_Modal, MoreFilters_Modal };
