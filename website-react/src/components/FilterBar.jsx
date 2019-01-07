import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Button, Container, Input, Modal} from 'semantic-ui-react';
import {HomeTypeModal} from './AppModal';
import NavigationBar from './NavigationBar';

class FilterBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: {
				dates: {open: false, size: 'mini', isFiltered: false},
				prices: {open: false, size: 'mini', isFiltered: false},
				homeType: {open: false, size: 'tiny', isFiltered: false},
				moreFilters: {open: false, size: 'mini', isFiltered: false},
			},
			homeType: {
				entirePlace: {checked: false},
				privateRoom: {checked: false},
				sharedRoom: {checked: false},
			}
		};
		// this.homeType_handler = type => {
		// 	let newState = {...this.state}
		// 	newState.homeType[type].isChecked = !newState.homeType[type].isChecked;
		// 	this.setState(newState);
		// }
		// this.moreFilter_handler = {
		// 	addWantedObject: name => {
		// 		let newState = {...this.state}
		// 		newState.moreFilter.wantedObjects.push(name);
		// 		this.setState(newState);
		// 	}
		// }
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

	render() {
		const my = this;
		const state = this.state;

		const buttonHandler = (typeButton, isOpen) => {
			let newState = my.state;
			newState.buttons[typeButton].open = isOpen;
			my.setState(newState);
		}

		const homeTypeHandler = (homeType) => {
			let newState = my.state;
			newState.homeType[homeType].checked = !newState.homeType[homeType].checked;
			my.setState(newState);
		}

        return (
    		<React.Fragment>
				<React.Fragment>
	                <Button onClick={() => buttonHandler("dates",true)}>Dates</Button>
	                <Button onClick={() => buttonHandler("prices",true)}>Prices</Button>
	                <Button onClick={() => buttonHandler("homeType",true)}>Home type</Button>
	                <Button onClick={() => buttonHandler("moreFilters",true)}>More filters</Button>
				</React.Fragment>

				<React.Fragment>
					<HomeTypeModal onChecked={homeTypeHandler} data={state.homeType} size={state.buttons.homeType.size} open={state.buttons.homeType.open} onClose={() => buttonHandler("homeType",false)}/>
				</React.Fragment>
    		</React.Fragment>

        );
	}
}


export default FilterBar;
