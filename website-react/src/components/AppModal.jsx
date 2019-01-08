import React, {Component} from 'react';
import { Button, Modal, Checkbox, Segment } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

class DatesModal extends Component {
	render() {
    	return (
			<Modal size={this.props.size} open={this.props.open} onClose={this.props.onClose} centered={false}>
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
				<Button negative content='Clear' />
				<Button positive icon='checkmark' labelPosition='right' content='Apply' />
			  </Modal.Actions>
			</Modal>
    	);
	}
}

class PricesModal extends Component {
	render() {
		return (
			<Modal size={this.props.size} open={this.props.open} onClose={this.props.onClose} centered={false}>
			    <Modal.Content>
			  		<InputRange maxValue={this.props.data.maxValue}
					minValue={this.props.data.minValue}
					value={this.props.data.value}
					onChange={this.props.onChange}
					formatLabel = {value => `${value} HKD`}
					/>
					<div>
						{this.props.data.value.min} - {this.props.data.value.max}
					</div>
			    </Modal.Content>
			  <Modal.Actions>
				<Button negative content='Clear' />
				<Button positive icon='checkmark' labelPosition='right' content='Apply' />
			  </Modal.Actions>
			</Modal>
		);
	}
}


class HomeTypeModal extends Component {
		render() {
				return (
						<Modal size={this.props.size} open={this.props.open} onClose={this.props.onClose} centered={false}>
				          <Modal.Content>
				            <Checkbox fitted toggle onChange={() => this.props.onChecked("entirePlace")} checked={this.props.data.entirePlace.checked} label="Entire place"/>
							<Checkbox fitted toggle onChange={() => this.props.onChecked("privateRoom")} checked={this.props.data.privateRoom.checked} label="Private room - Have your own room and share some common spaces"/>
							<Checkbox fitted toggle onChange={() => this.props.onChecked("sharedRoom")} checked={this.props.data.sharedRoom.checked} label="Shared room - Stay in a shared space, like a common room"/>
				          </Modal.Content>
				          <Modal.Actions>
				            <Button negative content='Clear' />
				            <Button positive icon='checkmark' labelPosition='right' content='Apply' />
				          </Modal.Actions>
				        </Modal>
				);
		}
}


class MoreFiltersModal extends Component {
	render() {

		const listOfWantedObjects = this.props.data.wantedObjects.map((val) => {
				return (
						<WantedObject name={val} key={val}/>
				);
		});

		return (

			<Modal size={this.props.size} open={this.props.open} onClose={this.props.onClose} centered={false}>
			  <Modal.Content>
			  <ul className="nav nav-tabs" id="myTab" role="tablist">
				  <li className="nav-item">
					  <a className="nav-link active" id="moreFilters_simple-tab" data-toggle="tab" href="#simple-tab" role="tab" aria-controls="simple-tab" aria-selected="true">Simple</a>
				  </li>
				  <li className="nav-item">
					  <a className="nav-link" id="moreFilters_advanced-tab" data-toggle="tab" href="#advanced-tab" role="tab" aria-controls="advanced-tab" aria-selected="false">Advanced</a>
				  </li>
			  </ul>
			  <div className="tab-content" id="myTabContent">
				  <div className="tab-pane fade container show active" id="simple-tab" role="tabpanel" aria-labelledby="simple-tab">
					  <div className="row">
					  </div>
					  <div className="row border-top">
							  <div className="col border-right">
									  <div id="wantedObject" className="container">
										  {listOfWantedObjects}
									  </div>
							  </div>
							  <div className="col container">
									  <input className="form-control mt-3" id="moreFilters_simple-tab_search" type="text" placeholder="Point" aria-label="Search" />
									  <ul className="mt-2 list-inline" id="moreFilters_simple-tab_list">
											  <li className="btn btn-outline-secondary my-1 mx-auto moreFilters_simple-tab_element" value="school">school</li>
											  <li className="btn btn-outline-secondary my-1 mx-auto moreFilters_simple-tab_element" value="mtr-station">mtr-station</li>
											  <li className="btn btn-outline-secondary my-1 mx-auto moreFilters_simple-tab_element" value="university">university</li>
											  <li className="btn btn-outline-secondary my-1 mx-auto moreFilters_simple-tab_element" value="park">park</li>
											  <li className="btn btn-outline-secondary my-1 mx-auto moreFilters_simple-tab_element" value="airport">airport</li>
											  <li className="btn btn-outline-secondary my-1 mx-auto moreFilters_simple-tab_element" value="cafe">cafe</li>
									  </ul>
							  </div>
					  </div>
				  </div>
				  <div className="tab-pane fade" id="advanced-tab" role="tabpanel" aria-labelledby="advanced-tab">
					  This is advanced page!!
				  </div>
				  </div>
			  </Modal.Content>
			  <Modal.Actions>
				<Button negative content='Clear' />
				<Button positive icon='checkmark' labelPosition='right' content='Apply' />
			  </Modal.Actions>
			</Modal>
		);
	}
}


class WantedObject extends Component {
	render() {
		const name = this.props.name;
		const row = "row-" + name;
		const dist = "dist-" + name;
		const dir = "dir-" + name;
		const close = "close-" + name;
		return (
								<div className="row" id={row}>
										<form className="mt-2 list-inline">
												<div className="form-row">
														<div className="col border">
																<span> {name} </span>
																<button type="button" className="close" aria-label="Close" id={close}>
																	<span aria-hidden="true">&times;</span>
																</button>
														</div>
														<div className="col distance-option hidden">
																<select className="form-control" id={dist}>
																	<option select value="0">Distance</option>
																	<option value="1">Close (0-500m)</option>
																	<option value="2">Medium (500-1000m)</option>
																	<option value="3">Far (1-3km)</option>
																	<option value="4">Custom ... Need to add input</option>
																</select>
														</div>
														<div className="col direction-option hidden">
																<select className="form-control" id={dir}>
																	<option select value="0">Direction</option>
																	<option value="1">East</option>
																	<option value="2">South East</option>
																	<option value="3">South</option>
																	<option value="4">South West</option>
																	<option value="5">West</option>
																	<option value="6">North West</option>
																	<option value="7">North</option>
																	<option value="8">North East</option>
																</select>
														</div>
												</div>
										</form>
								</div>
		);
	}
}

export {DatesModal, PricesModal, HomeTypeModal, MoreFiltersModal};
// export default Price_Modal, HomeType_Modal, MoreFilters_Modal };
