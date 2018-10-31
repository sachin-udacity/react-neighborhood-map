import { Component } from 'react';
import * as JSWrappers from '../helpers/JSHtmlWrappers'

class Marker extends Component {
    // creates markers
    createMarker = () => {
        try {
            // in case marker exist, just set its visibility and return
            const item = this.props.item;
            if (item.marker !== null) {
                if (item.markerVisible === false) {
                    item.marker.setMap(null);
                } else {
                    item.marker.setMap(this.props.map);
                }
                return;
            }

            // if marker doesn't exist create new one
            const marker = new window.google.maps.Marker({
                position: item.position,
                map: this.props.map,
                title: item.title,
                animation: window.google.maps.Animation.DROP
            });

            // call function to pass marker reference and attach event handler to click
            if (marker) {
                if (this.props.onMarkerCreated) {
                    this.props.onMarkerCreated(item, marker);
                }
                marker.addListener('click', () => {
                    if (this.props.onMarkerClicked) {
                        this.props.onMarkerClicked(item, marker);
                    }
                }, { passive: true })
            }
        }
        catch(ex) {
            JSWrappers.logError(ex);
        }
    }

    componentDidMount() {
        this.createMarker();
    }

    render() {
        const item = this.props.item;
        if (item.marker !== null) {
            if (item.markerVisible) {
                item.marker.setMap(this.props.map);
            } else {
                item.marker.setMap(null);
            }
        }
        return null;
    }
}

export default Marker;