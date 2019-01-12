import React, { Component } from "react";
import { Segment, Grid, Image, Button, Header } from "semantic-ui-react";
import "../layout.css";
<<<<<<< HEAD
=======
import Map from "./Map";
>>>>>>> parent of 54b64e4... update map to mapcontainer

// address: "No.2 Tai Pak Terrace, Kennedy Town",
// imageURL: "images/house1.jpg",
// grossArea: 300,
// saleableArea: 240,
// bedrooms: 1,
// price: 14000,
// pageURL: "#",
// lat: 111.11,
// lng: 111.11,
// title: "this is title",
// propertyName: "propertyName",
// agentName: "agentName",

class HouseList extends Component {
  render() {
    const listOfHouse = this.props.data.map(result => {
      let bedroomsInfo;

      if (result.bedrooms === 0) {
        bedroomsInfo = "Studio";
      } else if (result.bedrooms === 1) {
        bedroomsInfo = "1 bedroom";
      } else if (result.bedrooms === 6) {
        bedroomsInfo = "5+ bedrooms";
      } else {
        bedroomsInfo = result.bedrooms + " bedrooms";
      }

      return (
        <Segment
          key={result.address + result.pageURL}
          raised
          secondary
          clearing
          style={{ padding: "0px" }}
        >
          <Image src={result.imageURL} className="img-result" />

          <Header as="h4">
            {result.title}
            <Header.Subheader>{result.propertyName}</Header.Subheader>
            <Header.Subheader>{result.address}</Header.Subheader>
            <Header.Subheader>{result.agentName}</Header.Subheader>
          </Header>

          <Header as="h4">
            {" "}
            Rent: {result.price} HKD
            <Header.Subheader>
              {" "}
              {"Gross area:" +
                result.grossArea +
                "sq.ft. | Saleable area:" +
                result.saleableArea +
                "sq.ft."}
            </Header.Subheader>
          </Header>
          <Header as="h4" floated="left">
            {bedroomsInfo}
          </Header>
          <Header as="h4" floated="right">
            <a href={result.pageURL}>
              <Button>View details</Button>
            </a>
          </Header>
        </Segment>
      );
    });

    return (
      <Grid columns="equal" divided={false} padded={false} fluid="true">
<<<<<<< HEAD
        <Grid.Column width={6}>{listOfHouse}</Grid.Column>
        <Grid.Column width={10} />
=======
        <Grid.Column>{listOfHouse}</Grid.Column>
        <Grid.Column>
          <Segment style={{ height: "500px", padding: "0px" }}>
            <Map data={this.props.data} />
          </Segment>
        </Grid.Column>
>>>>>>> parent of 54b64e4... update map to mapcontainer
      </Grid>
    );
  }
}

export default HouseList;
