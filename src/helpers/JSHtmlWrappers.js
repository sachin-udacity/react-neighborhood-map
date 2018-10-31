// Util file for helper JS and Html manipulation functions

// customize map info window
export const customizeInfoWindow = (infoWindow, item) => {
    try {
        // find specific html elements using 'map-info-window' class and google map class 'gm-style-iw'
        // based on assumption that google infoWindow html structure is standard and will remain consistent.
        // Future Item: This is kind of quick hack and prefer implementing custom popup for info window instead.
        const infoWindowContent = getContentHtmlElement(item);
        if (!infoWindowContent) {
            return null;
        }
        infoWindow.setContent(infoWindowContent);
        const htmlElementColl = document.getElementsByClassName('map-info-window');
        if (htmlElementColl.length > 0) {
            let gmInfoWindow = htmlElementColl[0];
            let classNotFound = true;
            // find parent with class 'gm-style-lw'
            while(classNotFound && gmInfoWindow.parentElement) {
                gmInfoWindow = gmInfoWindow.parentElement;
                classNotFound = gmInfoWindow.classList.contains('gm-style-iw') === false;
            }
            // gets it next sibling and change the color of 4th div to
            if (gmInfoWindow.previousElementSibling) {
                const children = gmInfoWindow.previousElementSibling.children;
                if (children.length > 2) {
                    const arrowChildren = children[2].children;
                    if (arrowChildren.length === 2) {
                        arrowChildren[0].children[0].style.background = 'transparent';
                        arrowChildren[1].children[0].style.background = 'transparent';
                    } else {
                        throw new Error('Assumption failed, google map info window DOM changed.');
                    }
                } else {
                    throw new Error('Assumption failed, google map info window DOM changed.');
                }
                if (children.length > 3) { // 4th div.
                    children[3].style.background = 'transparent';
                } else {
                    throw new Error('Assumption failed, google map info window DOM changed.');
                }
            }
            // move close button to top right
            if (gmInfoWindow.nextElementSibling) {
                gmInfoWindow.nextElementSibling.style.right = '-6px';
            }
        }
    }
    catch(ex) {
        logError(ex);
    }
}

// creates html element <article> for map info window.
export const getContentHtmlElement = (item) => {
    try {
        // get the content from already formed html element
        const htmlElement = document.getElementById(item.id);
        if (htmlElement) {
            const imgElement = htmlElement.getElementsByTagName('img');
            if (imgElement.length > 0) {
                return `<article class="map-info-window" aria-label="${item.title}" tabIndex="0">
                            <img src=${imgElement[0].src} class="map-info-window-image" alt=${item.title} />
                            <h1>${item.description}</h1>
                        </article>`;
            }
        } else {
            logDebugInfo('Info Window html wrapper not found.')
        }
    }
    catch(ex) {
        logError(ex);
    }
    return null;
}

// creates html element <p> for map error.
// Future item: research to use component event to show this div instead of creating on the fly
export const showMapError = () => {
    try {
        const htmlElementColl = document.getElementsByClassName('map-container');
        if (htmlElementColl.length > 0) {
            const element = document.createElement('p');
            element.innerText = 'Failed to load google maps. Please see console for more details.';
            htmlElementColl[0].appendChild(element);
        }
    }
    catch(ex) {
        logError(ex);
    }
}

// show windows alert
export const showError = (error) => {
    window.alert(error);
}

// logs error based on debug flag.
export const logError = (error, pretextInfo = null, debug = 0) => {
    if (debug === 1) {
        if (pretextInfo) {
            console.log(pretextInfo);
        }
        console.log(error);
    }
}

// log debug info for troubleshooting based on debug flag.
export const logDebugInfo = (message, debug = 0) => {
    if (debug === 1) {
        console.log(message);
    }
}