import React, { Component } from "react";
import { Segment, Grid, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../layout.css";

class HouseList extends Component {
  render() {
    const listOfHouse = this.props.data.map(result => {
      return (
        <Segment padded={false}>
          <Image src={result.img} className="img-result" />
          <div> {result.address} </div>
          <div>
            {" "}
            {"Gross area:" +
              result.grossArea +
              "sq.ft. | Saleable area:" +
              result.saleableArea +
              "sq.ft."}
          </div>
          <div>{result.address}</div>
          <div>
            <div>Rent HKD: {result.price}</div>
            <div>{result.bedrooms + " bedrooms"}</div>
            <div className="rightFloat">
              <Link to={result.url}>
                <Button>View details</Button>
              </Link>
            </div>
          </div>
        </Segment>
      );
    });

    return (
      <Grid columns="equal" padded={false} divided={false} fluid="true">
        <Grid.Column>{listOfHouse}</Grid.Column>
        <Grid.Column>
          <Segment padded={false} floated="right" style={{ height: "500px" }}>
            this is map
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HouseList;
