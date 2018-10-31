import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import SearchPane from './components/SearchPane'
import NavigationBar from './components/NavigationBar'
import * as PlacesAPI from './helpers/PlacesAPI'
import * as JSWrappers from './helpers/JSHtmlWrappers'
import * as CacheManager from './helpers/CacheManager'

const APP_NAME = 'neighborhood-map-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.infoWindow = null;

    this.state = {
      appError: '',
      isSearchPaneVisible: true,
      isInfoWindowVisible: false,
      center: {
        lat: 28.443166,
        lng: -81.541334
      },
      lookForPlacesAround: {
        lat: 28.442502,
        lng: -81.439470
      },
      zoom: 12,
      places: [],
      currentItem: null,
      isClickEvent: false // to avoid re-rendering of markers on map on click
    };

    this.venueImagesCache = {};
  }

  handleMapLoad = (map) => {
    this.map = map;
  }

  // store marker on creation
  handleMarkerCreated = (place, marker) => {
    try {
      if (place && marker) {
        const places = this.state.places;
        places.find(p => place.id === p.id).marker = marker;
        this.setState({
          places: places
        })
      }
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  // store window object on info window creation
  handleInfoWindowCreated = (infoWindow) => {
    this.infoWindow = infoWindow;
  }

  // handle click of marker.
  handleMarkerClicked = (place, marker) => {
    try {
      // get photo and on success open info window
      this.getPhoto(place, () => {
        this.openInfoWindow(this.infoWindow, marker);
        this.setState({
          currentItem: place,
          isClickEvent: true
        })
        // animate marker
        this.animateMarker(place.marker);
      });
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  // handle the click of breadcrumb
  handleNavMenuClicked = () => {
    this.setState({
      isSearchPaneVisible: (!this.state.isSearchPaneVisible),
      isClickEvent: true
    })
  }

  // handle click of search item
  handleSearchPlanelItemClicked = (place) => {
    try {
      // open window
      this.openInfoWindow(this.infoWindow, place.marker);
      this.setState({
        currentItem: place,
        isClickEvent: true
      })
      // animate marker
      this.animateMarker(place.marker);
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  // handle change in filter text
  handleSearchTextChanged = (keywordToSearch) => {
    try {
      // close the window if open
      if (this.infoWindow) {
        this.infoWindow.close();
      }

      // filter the places based on text entered and set the marker visibility.
      let places = this.state.places;
      if (keywordToSearch !== '') {
        keywordToSearch = keywordToSearch.toUpperCase();
        places.forEach(place => {
            place.markerVisible = (place.title.toUpperCase().indexOf(keywordToSearch) === -1 ? false : true);
        })
      } else {
        places.forEach(place => {
          place.markerVisible = true;
        })
      }

      // set state to fire render
      this.setState({
        isClickEvent: false,
        places: places
      })
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  openInfoWindow = (infoWindow, marker) => {
    try {
      const items = Object.values(this.state.places);
      items.forEach(item => {
        if (item.infoWindow) {
          item.infoWindow.close();
        }
      });
      if (marker && infoWindow && this.map) {
        infoWindow.open(this.map, marker);
        this.map.panTo(marker.getPosition());
      }
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  // animates the marker
  animateMarker = (marker) => {
    try {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        }
      }, 1000);
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  // get places from Foursquare service
  getPlaces = () => {
    try {
      const placesAround = this.state.lookForPlacesAround;
      const queryFor = 'Amusement Parks';
      const limit = 10;
      PlacesAPI.getNearByPlacesFromFourSquare(placesAround, queryFor, limit)
        .then((places) => {
          if (!places.error) {
            // set places
            this.setState({
              appError: '',
              places: places
            })
            // get photos for above places
            this.getPhotos(places);
          } else {
            JSWrappers.logDebugInfo(places);
            this.setState({
              appError: places.error.message
            })
          }
        });
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  // map over places and retrieve the photos
  getPhotos = (places) => {
    try {
      places.map((place) => {
          this.getPhoto(place, (venueImgUrl) => {
              place.imageUrl = venueImgUrl;
              this.setState({
                photoRetrieved: true
              })
          });
          return places;
      });
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }


  getPhoto = (place, onPhotoRetrieved = null) => {
    try {
      const key = `${place.venueId}`;
      // try to retrieve photo from in-memory cache
      let venueImgUrl = this.venueImagesCache[key];
      if (!venueImgUrl) {
        // try to retrieve photo from persistent storage
        venueImgUrl = CacheManager.getItemFromCache(APP_NAME, key);
      }
      // if not found in any of the cache, retrieve from foursquare service.
      if (!venueImgUrl) {
        // async function to retrieve photo url
        PlacesAPI.getPhoto(place.venueId).then((data) => {
          venueImgUrl = data;
          if (data.error) {
            venueImgUrl = 'image-load-error';
          } else {
            JSWrappers.logDebugInfo('Image successfully retrieved from service');
            // update cache on image retrieval
            CacheManager.setItemInCache(APP_NAME, key, venueImgUrl);
          }
          // set in-memory cache and finally calls the passed callback.
          this.venueImagesCache[key] = venueImgUrl;
          if (data)
            if (onPhotoRetrieved) {
              onPhotoRetrieved(venueImgUrl);
            }
          });
      } else {
        JSWrappers.logDebugInfo('Image retrieved from cache');
        if (onPhotoRetrieved) {
          onPhotoRetrieved(venueImgUrl);
        }
      }
    }
    catch(ex) {
      JSWrappers.logError(ex);
    }
  }

  componentDidMount() {
    this.getPlaces();
  }

  render() {
    if (this.state.appError !== '') {
      return (
        <main id="App" className="App">
          <p className="message-loading message-loading-error">{this.state.appError}</p>
        </main>
      )
    }
    const places = this.state.places;
    if (places.length === 0) {
        return (
          <main id="App" className="App">
            <p className="message-loading message-loading-app">Loading application, please wait ...</p>
          </main>
        )
    }

    return (
      <main id="App" className="App">
        <NavigationBar  onShowSearchPaneLinkClicked={this.handleNavMenuClicked}
                        isSearchPaneVisible={this.state.isSearchPaneVisible}/>
        <SearchPane items={places}
                    onSearchTextChanged={this.handleSearchTextChanged}
                    onItemClicked={this.handleSearchPlanelItemClicked}
                    isSearchPaneVisible={this.state.isSearchPaneVisible} />
        <MapContainer center={this.state.center}
                      zoom={this.state.zoom}
                      items={places}
                      currentItem={this.state.currentItem}
                      isClickEvent={this.state.isClickEvent}
                      onMapLoaded={this.handleMapLoad}
                      onMarkerCreated={this.handleMarkerCreated}
                      onInfoWindowCreated={this.handleInfoWindowCreated}
                      onMarkerClicked={this.handleMarkerClicked} />
      </main>
    );
  }
}

export default App;
