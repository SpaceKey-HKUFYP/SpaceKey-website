import React, {Component, Fragment} from 'react';
import {Button} from 'semantic-ui-react';
import {HomeTypeModal, PricesModal} from './AppModal';

class FilterBar extends Component {
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
			},
			prices: {
				minValue: 0,
				maxValue: 50000000,
				value: {
						min: 0,
						max: 50000000,
				},
			},
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

		const pricesHandler = (value) => {
			let newState = my.state;
			newState.prices.value = value;
			my.setState(newState);
		}

        return (
    		<Fragment>
				<Fragment>
	                <Button onClick={() => buttonHandler("dates",true)}>Dates</Button>
	                <Button onClick={() => buttonHandler("prices",true)}>Prices</Button>
	                <Button onClick={() => buttonHandler("homeType",true)}>Home type</Button>
	                <Button onClick={() => buttonHandler("moreFilters",true)}>More filters</Button>
				</Fragment>

				<Fragment>
					<HomeTypeModal onChecked={homeTypeHandler} data={state.homeType} size={state.buttons.homeType.size} open={state.buttons.homeType.open} onClose={() => buttonHandler("homeType",false)}/>
					<PricesModal data={state.prices} onChange={pricesHandler} size={state.buttons.prices.size} open={state.buttons.prices.open} onClose={() => buttonHandler("prices",false)}/>
				</Fragment>
    		</Fragment>

        );
	}
}


export default FilterBar;
