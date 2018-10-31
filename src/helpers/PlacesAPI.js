import {Place} from '../components/Place'
import * as JSWrappers from '../helpers/JSHtmlWrappers'

class FourSquareCredentials {
    constructor() {
        this.clientId = '2NL2FSD1ZREZUB1R2VJ4YS442X2D3YFDNAWIJ3PW11DYUSSH';
        this.clientSecret = 'TJC0RBPBN1O31Y4KDFCNSTJPLSGIB51QU4CPRNSYYYXKZ3Y4';
    }
}

// Uses foursquare api to retrieve places and venue image.
// https://foursquare.com/dev/docs/venues/explore
export const getNearByPlacesFromFourSquare = (position, queryFor, totalPlaceCount) => {
    try {
    const radius = 100000;
    const credentials = new FourSquareCredentials();
    const apiUrl = 'https://api.foursquare.com/v2/venues/explore';
    const parameters = `client_id=${credentials.clientId}&client_secret=${credentials.clientSecret}&v=20180323&limit=${totalPlaceCount}&ll=${position.lat},${position.lng}&radius=${radius}&query=${queryFor}`;
    return fetch(`${apiUrl}?${parameters}`)
            .then((response) => {
                if (response.ok === false || response.status === 429/*Api max limit reached*/) {
                    JSWrappers.logError(`PlacesAPI.getNearByPlacesFromFourSquare api failed. Error response: ${response.ok} and status: ${response.status}`, null, 1);
                    JSWrappers.logError(response, null, 1);
                    throw new Error('Failed to load data from FourSquare. Please try reloading page and check console for more details.');
                }
                return response.json();
            })
            .then((json) => {
                const places = [];
                const venueContainers = json.response.groups[0].items;
                let id = 1;
                venueContainers.forEach((venueContainer) => {
                    const venue = venueContainer.venue;
                    const location = venue.location;
                    const descripion = `${location.address}, ${location.city}, ${location.state} - ${location.postalCode}`;
                    const place = new Place(id++, venue.id, venue.name, descripion, location.lat, location.lng);
                    places.push(place);
                });
                return places;
            })
            .catch(function(error) {
                return getApiErrorIfOnline(error);
            });
    }
    catch(ex) {
        JSWrappers.logError(ex);
    }
}

// Foursquare Api reference - https://developer.foursquare.com/docs/api/venues/photos
export const getPhoto = (venueId) => {
    try {
    const credentials = new FourSquareCredentials();
    const apiUrl = `https://api.foursquare.com/v2/venues/${venueId}`;
    const parameters = `client_id=${credentials.clientId}&client_secret=${credentials.clientSecret}&v=20180323&limit=1`;
    return fetch(`${apiUrl}?${parameters}`)
            .then((response) => {
                if (response.ok === false || response.status === 429/*Api max limit reached*/) {
                    JSWrappers.logError(`PlacesAPI.getNearByPlacesFromFourSquare api failed. Error response: ${response.ok} and status: ${response.status}`, null, 1);
                    JSWrappers.logError(response, null, 1);
                    throw new Error('Failed to load photo from FourSquare. Please check console for more details.');
                }
                return response.json();
            })
            .then(json => {
                JSWrappers.logDebugInfo(json);
                let photo = null;
                const venue = json.response.venue;
                if (venue) {
                    const venuePhotoGroups = venue.photos.groups.filter(group => group.type === 'venue');
                    if (venuePhotoGroups && venuePhotoGroups.length > 0) {
                        photo = `${venuePhotoGroups[0].items[0].prefix}original${venuePhotoGroups[0].items[0].suffix}`;
                        JSWrappers.logDebugInfo(photo);
                    }
                }
                return photo;
            })
            .catch(function(error) {
                return getApiErrorIfOnline(error);
            });
    }
    catch(ex) {
        JSWrappers.logError(ex);
    }
}

const getApiErrorIfOnline = (error) => {
    let err = {
        error: null
    }
    if (navigator.onLine) {
        err.error = error;
    }
    return err;
}

// test function to avoid hitting Foursquare photo quota
export const getPhotoUrlFromCache = (venueId) => {
    const photos = {
            '4b0586a2f964a520a86822e3': 'https://igx.4sqi.net/img/general/original/ABBYAIL1IP5BZJEXGZNSCW33UJZWU3THJTUSOQCGL3P2UPXO.jpg',
            '4b058692f964a520656622e3': 'https://igx.4sqi.net/img/general/original/35195719_SB4lTNPAMqTQAeTDn3FQOq2Pe8G0sRtAb4rNgQw46mU.jpg',
            '4b301d74f964a52053f624e3': 'https://igx.4sqi.net/img/general/original/13687447_ZRKwEBYsPn_9aR_5amMYyjfOmvyAnq9_kflTCYu1jCw.jpg',
            '4b11d311f964a520758523e3': 'https://igx.4sqi.net/img/general/original/4572315_8tJO7DFxbg8NWvJejdNvxz4K6rCQeeAWnQxec4YhYoA.jpg',
            '4c10f205ce640f4747af3a52': 'https://igx.4sqi.net/img/general/original/57903_NWKe372t-uTPd96RkFJ03nqJ0agd311Xd77_eAk9HHE.jpg',
            '4b819389f964a52028b030e3': 'https://igx.4sqi.net/img/general/original/4Q-3iVaaGsFrB1lrWMvLZJidcZygmelWT_f16gnraNI.jpg',
            '4b058692f964a520536622e3': 'https://igx.4sqi.net/img/general/original/13163258_YW4hnUT9YAwItY9p5ZoxswW5jzWp6nsQ_smG1o_5MVs.jpg',
            '4be3094ed27a20a1280f915b': 'https://igx.4sqi.net/img/general/original/11769564_lmQAx2pE5i3ZXlmTBQEGsOqrTRO8YSPu-CT6VZ7sDDg.jpg',
            '4b59beb8f964a520c99528e3': 'https://igx.4sqi.net/img/general/original/20280132__G_UlAP0KBlQmZ4KGd25xMmWwHelp4vQcp9Ol8DiDuw.jpg',
            '4ad62c90f964a5208c0521e3': 'https://igx.4sqi.net/img/general/original/4607787_DqAZ4Mzo33WwbdolsKa2r6kXmNjp0B4HTuigBBtpYrg.jpg'
    };
    return photos[venueId];
}