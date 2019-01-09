import React, { Component, Fragment } from "react";
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

class SpmFilter extends Component {
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
        onClose={handler.onClose}
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

export { SpmFilter };
// export default Price_Modal, HomeType_Modal, MoreFilters_Modal };
