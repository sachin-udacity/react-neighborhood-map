import React, { Component } from 'react';
import * as JSWrappers from '../helpers/JSHtmlWrappers'

// compoment to add google maps
class GoogleMap extends Component {
    _map = null;
    // default options for google map
    _defaultGoogleOptions = {
        center: {
            lat: 28.538380,
            lng: -81.379134
        },
        zoom: 12
    };

    state = {
        mapError: false
    }

    getGoogleMapUrl = () => {
        const url = `https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&v=3&callback=initMap`;
        return url;
    }

    // adds google script element
    addGoogleScriptElement = () => {
        let googleScript = null;
        try {
            googleScript = document.createElement('script');
            googleScript.setAttribute('async', '');
            googleScript.setAttribute('defer', '');
            googleScript.setAttribute('src', this.getGoogleMapUrl());
            document.body.appendChild(googleScript);
        }
        catch(ex) {
            JSWrappers.logError(ex);
            JSWrappers.showError('Failed to add google script. Please check console for more details.');
        }
        return googleScript;
    }

    // callback function when script load is completed.
    // stores the map reference
    initMap=() => {
        try {
            if (this._map === null) {
                this._map = new window.google.maps.Map(document.getElementById('map'), {
                    center: this.props.center || this._defaultGoogleOptions.center,
                    zoom: this.props.zoom || this._defaultGoogleOptions.zoom
                })
                if (this.props.onMapLoaded) {
                    this.props.onMapLoaded(this._map);
                }
            }
        }
        catch(ex) {
            JSWrappers.logError(ex);
            JSWrappers.showError('Error while executing google map initMap callback . Please check console for more details.');
        }
    }

    // callback is case authorization fails at google's end
    onGoogleMapAuthFailure = () => {
        try {
            if (this.props.onMapError) {
                this.props.onMapError();
            }
            this.setState({
                mapError: true
            });
        }
        catch(ex) {
            JSWrappers.logError(ex);
            JSWrappers.showError('Error while executing google map error callback . Please check console for more details.');
        }
    }

    // helper function to add script and assign callback to global funciton on window object.
    addGoogleMap() {
        try {
            // set function initMap on windows object for google script callback
            window.initMap = this.initMap;
            // set function on windows for error callback
            window.gm_authFailure = this.onGoogleMapAuthFailure;
            // add google script html element.
            this.addGoogleScriptElement();
        }
        catch(ex) {
            JSWrappers.logError(ex);
        }
    }

    componentDidMount() {
       this.addGoogleMap();
    }

    render() {
        if (this.state.mapError) {
            return null;
        }

        return (
            <div id="map" role="application" tabIndex="0"></div>
        );
    }
}

export default GoogleMap;