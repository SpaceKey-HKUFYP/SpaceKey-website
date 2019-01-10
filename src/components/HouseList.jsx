import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

class HouseList extends React.Component {
  render() {
    const listOfHouse = this.props.data.house.map(val => {
      var id = "result-" + val.id;
      var features = val.features.map(feature => {
        return <span key={feature}>- {feature} -</span>;
      });

      var price = "$" + val.price + " HKD per night";
      return (
        <div className="row border mb-3 house-result" key={id} id={id}>
          <div className="col-3 border-right h-100">
            <img src={val.img} />
          </div>
          <div className="col-7 border-right h-100 ">
            <p className="font-weight-bold mb-1"> {val.typeOfHouse} </p>
            <p className="mb-1"> {val.postTitle} </p>
            <p className="font-weight-light h6">{features}</p>
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
            <div className="container-fluid p-3">{listOfHouse}</div>
          </div>
          <div className="col-5" id="mapContainer">
            This is the map
          </div>
        </div>
      </div>
    );
  }
}

export default HouseList;
