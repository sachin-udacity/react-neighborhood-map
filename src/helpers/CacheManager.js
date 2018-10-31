import * as JSWrappers from './JSHtmlWrappers'

export const getItemFromCache = (cacheName, key) => {
    try {
        let value = null;
        // check if local storage support is there
        if (typeof(Storage) === "undefined") {
            return value;
        }

        // get value from localStorage
        if (localStorage && localStorage[cacheName]) {
            const cacheValues = localStorage[cacheName];
            if (cacheValues) {
                const jsonValues = JSON.parse(cacheValues);
                value = jsonValues[key];
            }
        }
        return value;
    }
    catch(ex) {
        JSWrappers.logError(ex);
    }
}

export const setItemInCache = (cacheName, key, value) => {
    try {
        // check if local storage support is there
        if (typeof(Storage) === "undefined") {
            return null;
        }

        // create an object to store it in local storage
        let cacheValues = null;
        if (localStorage && localStorage[cacheName]) {
            cacheValues = JSON.parse(localStorage[cacheName]);
        } else {
            cacheValues = {};
        }
        cacheValues[key] = value;

        // set in localStorage
        localStorage[cacheName] = JSON.stringify(cacheValues);
        return value;
    }
    catch(ex) {
        JSWrappers.logError(ex);
    }
}