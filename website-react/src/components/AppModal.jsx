
class FilterButton extends Component {
	render() {
		let className = "btn-sm btn-light border mr-3" + (this.props.data.isFiltered ? " filtered" : "");
		return (
			<button type="button" className={className} data-toggle="modal" data-target={"#" + this.props.data.id }>
				{this.props.data.buttonMessage}
			</button>
		);
	}
}


class Dates_Modal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    	return (
    		<div className="modal" id={this.props.data.id} tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
							body
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary">Clear</button>
							<button type="button" className="btn btn-primary"  data-dismiss="dates_modal">Apply</button>
						</div>
					</div>
				</div>
    		</div>
    	);
	}
}


class Price_Modal extends Component {
	constructor(props) {
			super(props);
	}

	render() {
		//$("#price-slider").slider({});
		return (
			<div className="modal" id={this.props.data.id} tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
							<div className="modal-content">
									<div className="modal-body">
											$10 <input id="price-slider" type="text" className="span2" data-slider-min="0" data-slider-max="10000" data-slider-step="1" data-slider-value="[250,450]"/> $3000
									<div>
											Price: <span id="price" />
									</div>
									</div>
									<div className="modal-footer">
											<button type="button" className="btn btn-secondary">Clear</button>
											<button type="button" className="btn btn-primary"  data-dismiss="dates_modal">Apply</button>
									</div>
							</div>
					</div>
			</div>
		);
	}
}


class HomeType_Modal extends Component {
		constructor(props) {
				super(props);
		}

		render() {
				return (
						<div className="modal" id={this.props.data.id} tabIndex="-1" role="dialog" aria-hidden="true">
								<div className="modal-dialog" role="document">
										<div className="modal-content">
												<div className="modal-body">
														<FormCheck data={this.props.body.entirePlace} onChange={this.props.onChange}/>
														<FormCheck data={this.props.body.privateRoom} onChange={this.props.onChange}/>
														<FormCheck data={this.props.body.sharedRoom} onChange={this.props.onChange}/>
												</div>
												<div className="modal-footer">
														<button type="button" className="btn btn-secondary">Clear</button>
														<button type="button" className="btn btn-primary"  data-dismiss="dates_modal">Apply</button>
												</div>
										</div>
								</div>
						</div>
				);
		}
}


class MoreFilters_Modal extends React.Component {
	constructor(props) {
			super(props);
	}

	render() {

		const listOfWantedObjects = this.props.wantedObjects.map((val) => {
				return (
						<WantedObject name={val} key={val}/>
				);
		});

		return (
			<div className="modal" id={this.props.data.id} tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
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
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary">Clear</button>
							<button type="button" className="btn btn-primary"  data-dismiss="dates_modal">Apply</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


class FormCheck extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const html = this.props.data.id+"_checkbox";
		const {data, onChange} = this.props;
		return (
			<div className="form-check">
				<input className="form-check-input" type="checkbox" checked={this.props.data.isChecked} id={html} onChange={() => onChange(data.id)} />
				<label className="form-check-label" htmlFor={html}>
					{this.props.data.name}
				</label>
				<div>
					<label className="form-check-label" htmlFor={html}>
							{this.props.data.description}
					</label>
				</div>
			</div>
		);
	}
}


class WantedObject extends React.Component {
	constructor(props) {
		super(props);
	}

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

export default AppModal;
// export default Price_Modal, HomeType_Modal, MoreFilters_Modal };
