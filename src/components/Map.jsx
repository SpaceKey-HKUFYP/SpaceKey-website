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
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
      center: {
        lat: 22.3964,
        lng: 114.1095
      },
      zoom: 11
    };

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div id="map" style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyAjyOQCXT6nWbMDdQ1JT3_G7LYSJ1mWOJ4' }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text={'Kreyser Avrora'}
                  />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
