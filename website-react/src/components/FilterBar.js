import React, { Component, Fragment } from 'react';
import { Input } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Container, Modal } from 'semantic-ui-react';

//import { Dates_Modal, Price_Modal, HomeType_Modal, MoreFilters_Modal } from "./Modal"


class FilterBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonStatus :[
				{buttonMessage: "Dates", isFiltered: false, id: "dates"},
				{buttonMessage: "Price", isFiltered: false, id: "price"},
				{buttonMessage: "Home type", isFiltered: false, id: "homeType"},
				{buttonMessage: "More filters", isFiltered: false, id: "moreFilter"},
			],
			price: {
				minPrice:0,
				maxPrice:100000,
			},
			homeType:{
				entirePlace: {isChecked: false, id:"entirePlace", name: "Entire place", description: "Have a place to yourself"},
				privateRoom: {isChecked: false, id:"privateRoom", name: "Private room", description: "Have your own room and share some common spaces"},
				sharedRoom: {isChecked: false, id:"sharedRoom", name: "Shared room", description: "Stay in a shared space, like a common room"}
			},
			moreFilter:{
				wantedObjects: ["school","cafe"],
			}
		};
		this.homeType_handler = type => {
			let newState = {...this.state}
			newState.homeType[type].isChecked = !newState.homeType[type].isChecked;
			this.setState(newState);
		}
		this.moreFilter_handler = {
			addWantedObject: name => {
				let newState = {...this.state}
				newState.moreFilter.wantedObjects.push(name);
				this.setState(newState);
			}
		}
	}

	handleDates() {
		alert ("handleDates");
		let dates = Object.assign({},this.state.buttonStatus["dates"]);
		dates["isFiltered"] = true;
		let buttonStatus = Object.assign(this.state.buttonStatus,{dates:dates});
		console.log(buttonStatus);
		this.setState({
			buttonStatus: buttonStatus,
		});
	}

	state = { open: false }
	show = size => () => this.setState({ size, open: true })
	close = () => this.setState({ open: false })
	render() {
        const listOfFilter = this.state.buttonStatus.map((val) => {
    		return (
				<Button> {val} </Button>
    		);
        });

        // const listOfModal = (
    	// 	<Fragment>
		// 		<Dates_Modal data={this.state.buttonStatus[0]} body={this.state.homeType} onChange={this.homeType_handler}/>
		// 		<Price_Modal data={this.state.buttonStatus[1]} body={this.state.homeType} onChange={this.homeType_handler}/>
		// 		<HomeType_Modal data={this.state.buttonStatus[2]} body={this.state.homeType} onChange={this.homeType_handler}/>
		// 		<MoreFilters_Modal data={this.state.buttonStatus[3]} body={this.state.moreFilter} addWantedObject={this.moreFilter_handler.addWantedObject} wantedObjects={this.state.moreFilter.wantedObjects}/>
    	// 	</Fragment>
        // );
		const { open, size } = this.state
        return (
    		<Fragment>
				<Container>
                    <Button onClick={this.show('mini')}>Dates</Button>
                    <Button onClick={this.show('mini')}>Prices</Button>
                    <Button onClick={this.show('mini')}>Home type</Button>
                    <Button onClick={this.show('mini')}>More filters</Button>

					<Modal size={size} open={open} onClose={this.close}>
			          <Modal.Header>Delete Your Account</Modal.Header>
			          <Modal.Content>
			            <p>Are you sure you want to delete your account</p>
			          </Modal.Content>
			          <Modal.Actions>
			            <Button negative>No</Button>
			            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
			          </Modal.Actions>
			        </Modal>
				</Container>
    		</Fragment>

        );
	}
}


export default FilterBar;
