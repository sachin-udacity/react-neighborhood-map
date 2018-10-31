import { Component } from 'react';
import * as JSWrappers from '../helpers/JSHtmlWrappers'

class InfoWindow extends Component {
    infoWindow = null;

    componentDidMount() {
        const infoWindow = new window.google.maps.InfoWindow();
        if (infoWindow && this.props.onInfoWindowCreated) {
            this.infoWindow = infoWindow;
            this.props.onInfoWindowCreated(infoWindow);
        }
    }

    render() {
        if (this.props.currentItem && this.infoWindow) {
            JSWrappers.customizeInfoWindow(this.infoWindow, this.props.currentItem);
        }
        return null;
    }
}

export default InfoWindow;