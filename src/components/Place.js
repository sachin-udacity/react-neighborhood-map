// class to hold data for places

export class Place {
    constructor(id, venueId, title, description, lat, lng) {
      this.id = id;
      this.venueId = venueId;
      this.title = title;
      this.description = description;
      this.position = {
        lat: lat,
        lng: lng
      };
      this.marker = null;
      this.infoWindow = null;
      this.infoWindowContent = null;
      this.markerVisible = true;
    }
}