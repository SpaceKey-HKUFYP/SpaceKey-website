import React, {Component, Fragment} from 'react';
import {Button} from 'semantic-ui-react';
import {DatesModal, PricesModal, HomeTypeModal, MoreFiltersModal} from './AppModal';

class FilterBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: {
				dates: {open: false, size: 'tiny', isFiltered: false},
				prices: {open: false, size: 'tiny', isFiltered: false},
				homeType: {open: false, size: 'tiny', isFiltered: false},
				moreFilters: {open: false, size: 'tiny', isFiltered: false},
			},
			prices: {
				minValue: 0,
				maxValue: 50000000,
				value: {
						min: 0,
						max: 50000000,
				},
			},
			dates: {
				  startDate: null,
				  endDate: null,
				  focusedInput: null,
			},
			homeType: {
				entirePlace: {checked: false},
				privateRoom: {checked: false},
				sharedRoom: {checked: false},
			},
			moreFilters: {
				wantedObjects: []
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

		const datesHandler = {
			onDatesChange: ({startDate, endDate}) => {
				let newState = my.state;
				newState.dates.startDate = startDate;
				newState.dates.endDate = endDate;
				my.setState(newState);
			},
			onFocusChange: (focusedInput) => {
				let newState = my.state;
				newState.dates.focusedInput = focusedInput;
				my.setState(newState);
			},
		}

		const pricesHandler = (value) => {
			let newState = my.state;
			newState.prices.value = value;
			my.setState(newState);
		}

		const homeTypeHandler = (homeType) => {
			let newState = my.state;
			newState.homeType[homeType].checked = !newState.homeType[homeType].checked;
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
					<DatesModal data={state.dates} onDatesChange={datesHandler.onDatesChange} onFocusChange={datesHandler.onFocusChange} size={state.buttons.prices.size} open={state.buttons.dates.open} onClose={() => buttonHandler("dates", false)}/>
					<PricesModal data={state.prices} onChange={pricesHandler} size={state.buttons.prices.size} open={state.buttons.prices.open} onClose={() => buttonHandler("prices",false)}/>
					<HomeTypeModal onChecked={homeTypeHandler} data={state.homeType} size={state.buttons.homeType.size} open={state.buttons.homeType.open} onClose={() => buttonHandler("homeType",false)}/>
					<MoreFiltersModal data={state.moreFilters} size={state.buttons.moreFilters.size} open={state.buttons.moreFilters.open} onClose={() => buttonHandler("moreFilters",false)}/>
				</Fragment>
    		</Fragment>

        );
	}
}


export default FilterBar;
