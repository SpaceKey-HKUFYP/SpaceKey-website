import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Button,
  Sticky,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../layout.css";

class HouseList extends Component {
  render() {
    const listOfHouse = this.props.data.map(result => {
      return (
        <Segment
          padded={false}
          key={result.address + result.url}
          raised
          secondary
        >
          <Image src={result.img} className="img-result" />

          <Header as="h3"> {result.address} </Header>
          <Header as="h4">Rent: {result.price} HKD</Header>
          <Header as="h4">
            {" "}
            {"Gross area:" +
              result.grossArea +
              "sq.ft. | Saleable area:" +
              result.saleableArea +
              "sq.ft."}
          </Header>

          <Grid>
            <Grid.Column width={10}>
              <Header as="h4">{result.bedrooms + " bedrooms"}</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <Link to={result.url}>
                <Button>View details</Button>
              </Link>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    });

    return (
      <Grid columns="equal" divided={false} padded={false} fluid="true">
        <Grid.Column>{listOfHouse}</Grid.Column>
        <Grid.Column>
          <Segment style={{ height: "500px" }}>this is map</Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HouseList;
