'use strict';

const userDummy = {name: 'Budiman'}

class NavigationBar extends React.Component {
    render() {
        const menu = ['Profile', 'Messages', 'Help', 'Search'];
        const listOfMenu = menu.map((val) => {
            return (
                <li key={val} className='nav-item'>
                    <a className='nav-link' href='#'>{val}</a> 
                </li>
            );
        });
        
        console.log(listOfMenu);
        
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    {listOfMenu}
                </ul>
               <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> 
            </nav>
        );
    }
}

/*class FilterModal extends React.Component {
    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          ...
        </div>
      </div>
    </div>
}*/

class FilterButton extends React.Component {
    render() {
        let className = "btn" + (this.props.data.isFiltered ? " filtered" : "");
        return (
            <button type="button" className={className} onClick={this.props.onClick}>
                {this.props.data.buttonMessage}
            </button>
        );
    }
}

class FitlerBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStatus:{dates:{buttonMessage: "Dates", isFiltered: false}, 
                        price:{buttonMessage: "Price", isFiltered: false},
                        location:{buttonMessage: "Location", isFiltered: false},
                        moreFilter:{buttonMessage: "Filters", isFiltered: false},
                        },
        };
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
    
    handlePrice() {
        alert ("handlePrice");
    }
    
    handleLocation() {
        alert ("handleLocation");
    }
    
    handleMoreFilters() {
        alert ("handleMoreFilters");
    }
    
    render() {
        return (
            <div id="filterBar" className="col-12">
                <FilterButton onClick={() => this.handleDates()} data={this.state.buttonStatus["dates"]} />
                <FilterButton onClick={() => this.handlePrice()} data={this.state.buttonStatus["price"]} />
                <FilterButton onClick={() => this.handleLocation()} data={this.state.buttonStatus["location"]} />
                <FilterButton onClick={() => this.handleMoreFilters()} data={this.state.buttonStatus["moreFilter"]} />
            </div>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <FitlerBar />
            </div>
        );
    }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);