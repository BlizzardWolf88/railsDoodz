 import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  //static targets = ["coordinates", "map", "latitude", "longitude"]
  static targets = ["coordinates"]
  

  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();      
    }
  }

  initializeMap() {
    //Don't Invoke these functions for now
     console.log("in the Maps Controller Madoo")
     
    // this.map()
    // this.marker()
    // this.autocomplete()
    // console.log('init')
    const lat = parseFloat(this.coordinatesTarget.dataset.lat)
    const lon = parseFloat(this.coordinatesTarget.dataset.lon)
    console.log("lat is",lat,"lon is ",lon)
    const coordinates = {lat:lat,lng:lon}
    console.log(coordinates)

    this._map = new google.maps.Map(this.coordinatesTarget,{center:coordinates,zoom:15});

  
  }
}

  // map() {
  //   //console.log("Line before undefined map")
  //   if(this._map == undefined) {
  //     console.log("Making a Map")
  //     this._map = new google.maps.Map(this.mapTarget, {
  //       center: new google.maps.LatLng(
  //         this.latitudeTarget.value,
  //         this.longitudeTarget.value
  //       ),
  //       zoom: 17
  //     })
  //   }
  //   return this._map
  // }

//   marker() {
//     if (this._marker == undefined) {
//       this._marker = new google.maps.Marker({
//         map: this.map(),
//         anchorPoint: new google.maps.Point(0,0)
//       })
//       let mapLocation = {
//         lat: parseFloat(this.latitudeTarget.value),
//         lng: parseFloat(this.longitudeTarget.value)
//       }
//       this._marker.setPosition(mapLocation)
//       this._marker.setVisible(true)
//     }
//     return this._marker
//   }

//   autocomplete() {
//     if (this._autocomplete == undefined) {
//       this._autocomplete = new google.maps.places.Autocomplete(this.fieldTarget)
//       this._autocomplete.bindTo('bounds', this.map())
//       this._autocomplete.setFields(['address_components', 'geometry', 'icon', 'name'])
//       this._autocomplete.addListener('place_changed', this.locationChanged.bind(this))
//     }
//     return this._autocomplete
//   }

//   locationChanged() {
//     let loc = this.autocomplete().getPlace()

//     if (!loc.geometry) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + loc.name + "'");
//       return;
//     }

//     this.map().fitBounds(loc.geometry.viewport)
//     this.map().setCenter(loc.geometry.location)
//     this.marker().setPosition(loc.geometry.location)
//     this.marker().setVisible(true)

//     this.latitudeTarget.value = loc.geometry.location.lat()
//     this.longitudeTarget.value = loc.geometry.location.lng()
//   }

//   preventSubmit(e) {
//     if (e.key == "Enter") { e.preventDefault() }
//   }
// }