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
      show: null,
      currPage: 1
    };

    this.housesPerPage = 10;
  }

  mouseEnter(id) {
    this.setState({ focus: id });
  }

  mouseLeave(id) {
    this.setState({ focus: null });
  }

  mouseClick(id) {
    this.setState({ show: id });
  }

  getCenter() {
    let min_lat = 500,
      max_lat = 0,
      min_lng = 500,
      max_lng = 0,
      avg_lat = 0,
      avg_lng = 0;
    const houseData = this.props.data.slice(
      this.housesPerPage * (this.state.currPage - 1),
      this.housesPerPage * this.state.currPage
    );

    houseData.forEach(function(prop) {
      if (prop.lat < min_lat) min_lat = prop.lat;
      if (prop.lat > max_lat) max_lat = prop.lat;
      if (prop.lng < min_lng) min_lng = prop.lng;
      if (prop.lng > max_lng) max_lng = prop.lng;
      avg_lat += prop.lat;
      avg_lng += prop.lng;
    });
    if (houseData.length !== 0) {
      avg_lat /= houseData.length;
      avg_lng /= houseData.length;
    }

    if (avg_lat === 0 && avg_lng === 0) return { lat: 22.3964, lng: 114.1095 };
    else return { lat: avg_lat, lng: avg_lng };
  }

  render() {
    const numOfPages = Math.ceil(this.props.data.length / this.housesPerPage);

    if (numOfPages !== 0) {
      // Calculate the list of button strings
      var buttonList = ["<"];
      if (this.state.currPage - 2 > 1) buttonList.push("...");
      // Calculate starting point & ending point
      var start, end;
      if (this.state.currPage - 2 >= 1) start = this.state.currPage - 2;
      else start = 1;
      if (start + 4 <= numOfPages) end = start + 4;
      else end = numOfPages;
      // Push number strings to the list
      for (var i = start; i <= end; i++) {
        if (i >= 1 && i <= numOfPages) buttonList.push(String(i));
      }
      if (this.state.currPage + 2 < numOfPages) buttonList.push("...");
      buttonList.push(">");
    } else buttonList = [];

    const listOfPages = buttonList.map(param => {
      var color = "default";
      if (this.state.currPage === parseInt(param, 10)) color = "red";
      return (
        <Button
          onClick={() => {
            console.log(param);
            if (param === "<") {
              if (this.state.currPage !== 1)
                this.setState({ currPage: this.state.currPage - 1 });
            } else if (param === ">") {
              if (this.state.currPage !== numOfPages)
                this.setState({ currPage: this.state.currPage + 1 });
            } else if (param !== "...") {
              this.setState({ currPage: parseInt(param, 10) });
            }
          }}
          compact
          color={color}
        >
          {param}
        </Button>
      );
    });
    const listOfHouse = this.props.data
      .slice(
        this.housesPerPage * (this.state.currPage - 1),
        this.housesPerPage * this.state.currPage
      )
      .map(result => {
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

        const grossAreaDisplay =
          result.grossArea === 0
            ? ""
            : "Gross area:" + result.grossArea + "sq.ft.";
        const saleableAreaDisplay =
          result.saleableArea === 0
            ? ""
            : "Saleable area:" + result.saleableArea + "sq.ft.";
        const propertyPrice =
          result.type === "rent"
            ? "Price : " + result.rent/ 1000.0 + "k HKD"
            : "Price : " + result.price / 1000000.0 + "M HKD"

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
              {propertyPrice}
              <Header.Subheader>
                <div>{grossAreaDisplay}</div>
                <div> {saleableAreaDisplay}</div>
              </Header.Subheader>
            </Header>
            <Header as="h4" floated="left">
              {bedroomsInfo}
            </Header>
            <Header as="h4" floated="right">
              <a href={result.pageURL} target="_blank">
                <Button>View details</Button>
              </a>
            </Header>
          </Segment>
        );
      });

    return (
      <Grid divided={false} padded={false} stretched={false}>
        <Grid.Column width={6} className="listOfHouse">
          {listOfHouse}
        </Grid.Column>
        <Grid.Column width={10}>
          <Button.Group>{listOfPages}</Button.Group>

          <Segment style={{ height: "600px", padding: "0px" }}>
            <MapContainer
              data={this.props.data.slice(
                this.housesPerPage * (this.state.currPage - 1),
                this.housesPerPage * this.state.currPage
              )}
              status={this.state}
              poi={this.props.poi}
              customObjects={this.props.customObjects}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HouseList;
