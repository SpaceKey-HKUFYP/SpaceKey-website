'use strict';

const houseData =
            [{
              id: "house1",
              img:"img/house1.jpg",
              typeOfHouse:"PRIVATE ROOM IN APARTMENT",
              postTitle: "Private room in apartment\
                            New Cozy Suite *5 mins walk to North Point MTR",
              price: 332,
              features: ["2 guests", "Studio", "1 bed", "1 private bath"],
            },
            {
              id: "house2",
              img:"img/house2.jpg",
              typeOfHouse:"SHARED ROOM IN APARTMENT",
              postTitle: "Comfort Homey Quiet Stay",
              price: 310,
              features: ["2 guests", "1 bedroom", "1 bed", "2 shared baths", "Wifi", "Kitchen"],
            },
            {
              id: "house3",
              img:"img/house3.jpg",
              typeOfHouse:"PRIVATE ROOM IN APARTMENT",
              postTitle: "Stanley. Heaven at 40min of Causeway Bay",
              price: 450,
              features: ["2 guests", "1 bedroom", "1 private bath", "Wifi", "Kitchen"],
            },
        ];

class NavigationBar extends React.Component {
    render() {
        const menu = ['Saved', 'Messages', 'Helps', 'Log out'];
        const listOfMenu = menu.map((val) => {
            return (
                <li key={val} className='nav-item'>
                    <a className='nav-link' href='#'>{val}</a>
                </li>
            );
        });

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="index.html">HOME</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 mr-auto">
                      <input className="form-control mr-sm-2" type="search" placeholder='Try "Causeway Bay"' aria-label="Search" />
                    </form>
                    <ul className="navbar-nav float-right">
                        {listOfMenu}
                    </ul>
                </div>
            </nav>
        );
    }
}

class FilterButton extends React.Component {
    render() {
        let className = "btn-sm btn-light border mr-3" + (this.props.data.isFiltered ? " filtered" : "");
        return (
            <button type="button" className={className} data-toggle="modal" data-target={"#" + this.props.data.id }>
                {this.props.data.buttonMessage}
            </button>
        );
    }
}

class Dates_Modal extends React.Component {
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

class Price_Modal extends React.Component {
  constructor(props) {
      super(props);


  }

  render() {

    $("#price-slider").slider({
    });
    return (
      <div className="modal" id={this.props.data.id} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
            $10 <input id="price-slider" type="text" className="span2" data-slider-min="0" data-slider-max="10000" data-slider-step="1" data-slider-value="[250,450]"/>
            $3000
            <div>
                Price:
                <span id="price">
                </span>
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

class HomeType_Modal extends React.Component {
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
                                  <option select="true" value="0">Distance</option>
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

class FilterBar extends React.Component {
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

        // this.price_handler = ()
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
      const listOfFilter = this.state.buttonStatus.map((val) => {
          return (
              <FilterButton key={val.id} data={val} />
          );
      });

      const listOfModal = (
              <React.Fragment>
                <Dates_Modal data={this.state.buttonStatus[0]} body={this.state.homeType} onChange={this.homeType_handler}/>
                <Price_Modal data={this.state.buttonStatus[1]} body={this.state.homeType} onChange={this.homeType_handler}/>
                <HomeType_Modal data={this.state.buttonStatus[2]} body={this.state.homeType} onChange={this.homeType_handler}/>
                <MoreFilters_Modal data={this.state.buttonStatus[3]} body={this.state.moreFilter} addWantedObject={this.moreFilter_handler.addWantedObject} wantedObjects={this.state.moreFilter.wantedObjects}/>
              </React.Fragment>
          );


        return (
            <React.Fragment>
                <nav id="filterBar" className="navbar navbar-light navbar-expand-sm bg-light border-bottom">
                    {listOfFilter}
                </nav>
                <div>
                    {listOfModal}
                </div>
            </React.Fragment>
        );
    }
}

class HouseList extends React.Component {
    render() {
        const listOfHouse = houseData.map((val) => {
                var id= "result-" + val.id;
                var features = val.features.map((feature) => {
                   return (
                    <span key={feature}>- {feature} -</span>
                   )
                });

                var price = "$" + val.price + " HKD per night";
                return (
                    <div className="row border mb-3 house-result" key={id} id={id}>
                        <div className="col-3 border-right h-100">
                            <img src={val.img}/>
                        </div>
                        <div className="col-7 border-right h-100 ">
                            <p className="font-weight-bold mb-1"> {val.typeOfHouse} </p>
                            <p className="mb-1"> {val.postTitle} </p>
                            <p className="font-weight-light h6">
                                {features}
                            </p>
                        </div>
                        <div className="col-2 h-100">
                            <p>{price}</p>
                        </div>
                    </div>
                );
            });

       return (
         <div className="container-fluid h-100" id="main">
             <div className="row h-100">
                 <div className="col-7 border-right" id="result">
                   <div className="container-fluid p-3">
                        {listOfHouse}
                   </div>
                 </div>
                 <div className="col-5" id="mapContainer">
                     This is the map
                 </div>
             </div>
         </div>

       )
    };
}

class Main extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <FilterBar />
                <HouseList />
            </React.Fragment>
        );
    }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
