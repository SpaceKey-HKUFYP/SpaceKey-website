import React, { Component } from "react";
import { Segment, Grid, Image, Button, Header } from "semantic-ui-react";
import "../layout.css";
import MapContainer from "./MapContainer";

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
  constructor(props) {
    super(props);
    this.state = {
      focus: null,
      show: null
    };
  }

  mouseEnter(id) {
    // console.log("HouseList mouseEnter " + id);
    this.setState({ focus: id });
  }

  mouseLeave(id) {
    // console.log("HouseList mouseLeave" + id);
    this.setState({ focus: null });
  }

  mouseClick(id) {
    // console.log("HouseList mouseClick" + id);
    this.setState({ show: id });
  }

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
          secondary
          clearing
          onClick={() => this.mouseClick(result.id)}
          onMouseEnter={() => this.mouseEnter(result.id)}
          onMouseLeave={() => this.mouseLeave(result.id)}
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
      <Grid divided={false} padded={false} fluid="true">
        <Grid.Column width={6}>{listOfHouse}</Grid.Column>
        <Grid.Column width={10}>
          <Segment style={{ height: "600px", padding: "0px" }}>
            <MapContainer data={this.props.data} state={this.state} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HouseList;
