import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["coordinates", "map", "latitude", "longitude","field"]

  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();      
    }
  }

  
  initializeMap() {
    //Don't Invoke these functions for now
     
     //Lat and Lon for starting position on map
     const lat = parseFloat(this.coordinatesTarget.dataset.lat)
     const lon = parseFloat(this.coordinatesTarget.dataset.lon)
     const coordinates = {lat:lat,lng:lon}
     const map = new google.maps.Map(this.coordinatesTarget,{center:coordinates,zoom:15});
     
     this.CreateIcons();
     //this.CreatWinForm();
  
    map.addListener("click", (e) => {

       console.log("Map Listener")
       this.placeMarkerAndPanTo(e.latLng, map);   
      
    });     
   
     
         //this.map(coordinates)
         //this.marker(lat,lon)
         //this.autocomplete()     

  }

     placeMarkerAndPanTo(latLng, map) {
      
     
     //Create Marker on the click
     if(this.marker != undefined){
         this.marker.setPosition(latLng);
         this.infowindow.close();
     } 
     else{   
       this.marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: this.icon1,
        });
        map.panTo(latLng);
             
    }   

    
      this.infowindow = new google.maps.InfoWindow({
          //content: JSON.stringify(latLng.toJSON(), null, 2) + this.contentString,
          content:content
      });
      this.infowindow.open(map,this.marker);       
  }   




  CreateIcons(){

      this.icon1 = {
      url: "/assets/BlueWolfDood.png" + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    this.icon2 = {
      url: "/assets/EEEIND.jpg" + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };


  }

  CreatWinForm(){

    this.contentString = ' <button type="button" class="btn btn-primary btn-lg active goodGood" data-bs-container="body"+'
     'data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover">+'
      'Save This Spot +'
     '</button>'
    
  }



    
  }





  // map(cordeez) {

  //   if(this._map == undefined) {
  //     console.log("Making a Map")
  //    this._map = new google.maps.Map(this.coordinatesTarget,{center:cordeez,zoom:15});
  //   }


  //   return this._map
  // }

//   marker(lat,lon) {
//     if (this._marker == undefined) {
//       this._marker = new google.maps.Marker({
//         map: this.map(),
//         anchorPoint: new google.maps.Point(0,0)
//       })
//       let mapLocation = {
//         lat: lat,
//         lng: lon
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