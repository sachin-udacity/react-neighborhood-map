import React, { Component } from 'react';
import GoogleMap from '../components/GoogleMap';
import Marker from '../components/Marker';
import InfoWindow from '../components/InfoWindow';
import * as JSWrappers from '../helpers/JSHtmlWrappers'

class MapContainer extends Component {
  apiKey = 'AIzaSyB-9UMvgtXCkcvoGIxFqhAzy0ODvzp4RE4';
  state  = {
    map: null,
    items: [],
    markers: [],
    infoWindows: [],
    mapError: false
  }

  // event callback when map load is complete
  handleMapLoad = (map) => {
    if (this.props.onMapLoaded) {
      this.props.onMapLoaded(map);
    }
    this.setState({
      map: map
    })
  }

  // map error handler
  handleMapError = () => {
    JSWrappers.showMapError();
  }

  render() {
      if (this.state.mapError) {
        return null;
      }

      const items = this.props.items;
      return (
        <section className="map-container">
          <GoogleMap  apiKey = {this.apiKey}
                      center = {this.props.center}
                      zoom = {this.props.zoom}
                      onMapLoaded={this.handleMapLoad}
                      onMapError={this.handleMapError} />
          { this.state.map && !this.props.isClickEvent &&
            items.map((item) => (
              <Marker key = {item.id}
                      map = {this.state.map}
                      item = {item}
                      onMarkerCreated={this.props.onMarkerCreated}
                      onInfoWindowCreated={this.props.onInfoWindowCreated}
                      onMarkerClicked={this.props.onMarkerClicked}
                      isInfoWindowVisible={this.props.isInfoWindowVisible} />
            ))
          }
          { this.state.map &&
            <InfoWindow onInfoWindowCreated = {this.props.onInfoWindowCreated}
                        currentItem = {this.props.currentItem} />
          }
        </section>
      )
    }
  }

  export default MapContainer;