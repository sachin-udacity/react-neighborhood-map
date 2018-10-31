# React Neighborhood Project

**Project 7** - Submission for Front End Nanodegree. This project is developed using React

>## Functionalities
Provides ability to view and search the list of first 10 Orlando attractions returned by Foursquare api inside Google Map

![Orlando Attractions](src/doc-assets/images/orlando-attractions.png?raw=true "Orlando Attractions")

>**Google Map View**

![Google Map View](src/doc-assets/images/orlando-attractions-map-view.png?raw=true "Google Map View")



>**Search Pane**
User can search the places by title using search input box as shown below.

>*Clear the search field using delete/backspace to reset the search.*

![Search Pane](src/doc-assets/images/orlando-attractions-search.png?raw=true "Search Pane")


![Search Pane No Results](src/doc-assets/images/search-no-results.png?raw=true "Search Pane No Results")

>**Show/Hide Search Pane**

Click on breadcrumb icon on top left to hide/show search pane
![Search Pane No Results](src/doc-assets/images/orlando-attractions-show-hide-search-pane.png?raw=true "Search Pane No Results")


>**Limited Offline Support**

Website is cached using Cache web api and supports limited search functionality of last retrieved places.

![Offline Search](src/doc-assets/images/orlando-attractions-offline.png?raw=true "Offline Search")


>## Error Handling
1. Foursquare Explore api - https://api.foursquare.com/v2/venues/explore error.

    ![Foursquare Api Explore Error](src/doc-assets/images/places-error-handling.png?raw=true "Foursquare Expore Error")

2. Foursquare Venues api - `https://api.foursquare.com/v2/venues/ error

    ![Foursquare Api Venues Error](src/doc-assets/images/photo-error-handling.png?raw=true "Foursquare Venues Error")

3. Google Maps api - https://maps.googleapis.com/maps/api/js error

    ![Google Maps Api Error](src/doc-assets/images/google-map-error-handling.png?raw=true "Google Maps Api Error")

>## Dependencies

This application have following dependencies on third party and is required to run the application.

1. Foursquare api service
    a. https://api.foursquare.com/v2/venues/explore/
    b. https://api.foursquare.com/v2/venues/
       Free version only allows limited requests so in-memory and persistent cache is implemented.
       If quota exceeds, it will throw an error 429.

2. Google Maps service
  https://maps.googleapis.com/maps/api/js

3. Npm React packages


>## How to run the project?

1. Download and unzip the folder `react-neighborhood-map.zip`

2. With active directory as 'react-neighborhood-map' where `package.json` is present, run the following command to install the dependencies

    >npm install

3. Finally execute 'npm start' to launch the site.

    >npm start

4. Site will be hosted at http://localhost:3000/ (check command window to confirm the url)

5. Out of box service worker is customized to work in dev mode.


