import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'



export default class extends Controller {
  //static targets = ["coordinates", "map", "latitude", "longitude","wind"]
  static targets = ["map","lat","lon","name","date","notes","north","northwest","northeast","west","east","southwest","southeast","south","loctype","numsits"]

  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();
    }
  }


  initializeMap(evt) {

    this.setCompassImages();

    this.NorthWind = ""
    this.NorthEastWind = ""
    this.EastWind = ""
    this.SouthEastWind = ""
    this.SouthWind = ""
    this.SouthWestWind = ""
    this.WestWind = ""
    this.NorthWestWind = ""

     //Lat and Lon for starting position on map
    const lat = parseFloat("43.639")
    const lon = parseFloat("-71.981" )
    const coordinates = {lat: lat,lng: lon}
    this.map = new google.maps.Map(this.mapTarget,{center:coordinates,zoom:12});
    this.content = formContent //HTML for the info Window marker form

    this.displayMarkers();
    this.CreateIcons();

     this.map.addListener("click", (e) => {

        console.log("Map Listener")
        this.placeMarkerAndPanTo(e.latLng, this.map);

      });

  }

 

  async displayMarkers(){
     let markers

    //const request = new FetchRequest("get","/locs/getMarkers", { responseKind: "turbo-stream" })
    const request = new FetchRequest("get","/locs/getMarkers", { responseKind: "json" })
    const response = await request.perform()

    if (response.ok){
      const data = await response.json
      markers = data 
    }
    
    this.userLocs = []
     markers.forEach((marker) => {

      this.userLocs.push(marker)
      let sendIcon 
      switch(marker.loc_type){
        case("Access Point"):
          sendIcon = this.icon1
          break;
        
        case("Buck Bed Pin"):
          sendIcon = this.icon2
          break;
        case("Stand Pin"):
          sendIcon = this.icon3
          break;
        
        default:
          sendIcon = this.icon4
        
      }
        let latLng = new google.maps.LatLng(marker.latitude, marker.longitude);

        let gmarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: sendIcon,
        title: marker.id.toString() //location ID
      });
      
      google.maps.event.addListener(gmarker, 'click', (e) => {
        //console.log("Here We Are " + gmarker.position.lat + " " + gmarker.position.lon )
        this.showMarker(gmarker);
    });

     });

     console.log(this.userLocs)
  }

  showMarker(userGMarker){

    console.log("Are We CLEAR JACCKKKIEEE" +userGMarker)
    //match userGMarker with element in UserLoc Array
    //create infowindow add the content 
   
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
          icon: this.icon4,
        });
        map.panTo(latLng);

    }
  
      const cords = JSON.stringify(latLng.toJSON(), null, 2)
      const parsee = JSON.parse(cords);

      //send coords to testfields
      this.latTarget.value = parsee.lat
      this.lonTarget.value = parsee.lng

      this.infowindow = new google.maps.InfoWindow();

      this.infowindow.setContent(this.content)   
      this.infowindow.open(map,this.marker);

  }

  setCompassImages(){

    const northLogo = document.getElementById('northLogo').src = "/assets/wind/North.png";
    const northWestLogo = document.getElementById('northWestLogo').src = "/assets/wind/NorthWest.png";
    const northEastLogo = document.getElementById('northEastLogo').src = "/assets/wind/NorthEast.png";
    const westLogo = document.getElementById('westLogo').src = "/assets/wind/West.png";
    const eastLogo = document.getElementById('eastLogo').src = "/assets/wind/East.png";
    const southWestlogo = document.getElementById('southWestLogo').src = "/assets/wind/SouthWest.png";
    const southEeastlogo = document.getElementById('southEastLogo').src = "/assets/wind/SouthEast.png";
    const southLogo = document.getElementById('southLogo').src = "/assets/wind/South.png";

  }

  keydown(event){

    if (event.key == "Enter"){
        this.goToSpot();
    }
  }

  goToSpot(){

    //validate coords
    let reg = RegExp("^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$");

    if( reg.exec(this.latTarget.value) && reg.exec(this.lonTarget.value) ) {
      let latLng = new google.maps.LatLng(this.latTarget.value, this.lonTarget.value);
      this.placeMarkerAndPanTo(latLng, this.map);
    }

  }

    //INSTANIATE ALL THIS._WIND TO with let and set to ""
    sendNorth(){
      if(this.NorthWind == "" ){
        this.NorthWind = this.northTarget.dataset.north
        northLogo.src = "/assets/wind/NorthAfter.png"
      }
      else{
        this.NorthWind = ""
        northLogo.src = "/assets/wind/North.png"
      }
    }


    sendNorthWest(){
      if(this.NorthWestWind == ""){
        this.NorthWestWind = this.northwestTarget.dataset.northwest
        northWestLogo.src = "/assets/wind/NorthWestAfter.png"
      }
      else{
        this.NorthWestWind = ""
        northWestLogo.src = "/assets/wind/NorthWest.png"
      }
    }

    sendNorthEast(){
      if(this.NorthEastWind == ""){
        this.NorthEastWind = this.northeastTarget.dataset.northeast
        northEastLogo.src = "/assets/wind/NorthEastAfter.png"
      }
      else{
        this.NorthEastWind = ""
        northEastLogo.src = "/assets/wind/NorthEast.png"
      }
    }

    sendWest(){
      if(this.WestWind == ""){
        this.WestWind = this.westTarget.dataset.west
        westLogo.src = "/assets/wind/WestAfter.png"
      }
      else{
        this.WestWind = ""
        westLogo.src = "/assets/wind/West.png"
      }
    }

    sendEast(){
      if(this.EastWind == ""){
        this.EastWind  = this.eastTarget.dataset.east
        eastLogo.src = "/assets/wind/EastAfter.png"
      }
      else{
        this.EastWind = ""
        eastLogo.src = "/assets/wind/East.png"
      }
    }

    sendSouthWest(){
      if(this.SouthWestWind == ""){
        this.SouthWestWind  = this.southwestTarget.dataset.southwest
        southWestLogo.src = "/assets/wind/SouthWestAfter.png"
      }
      else{
        this.SouthWestWind = ""
        southWestLogo.src = "/assets/wind/SouthWest.png"
      }
    }

    sendSouthEast(){
      if(this.SouthEastWind == ""){
        this.SouthEastWind  = this.southeastTarget.dataset.southeast
        southEastLogo.src = "/assets/wind/SouthEastAfter.png"
      }
      else{
        this.SouthEastWind = ""
        southEastLogo.src = "/assets/wind/SouthEast.png"
      }
    }

    sendSouth(){
      if(this.SouthWind == ""){
        this.SouthWind  = this.southTarget.dataset.south
        southLogo.src = "/assets/wind/SouthAfter.png"
      }
      else{
        this.SouthWind = ""
        southLogo.src = "/assets/wind/South.png"
      }
    }

    setLocType(event){

     this.locType = event.target.selectedOptions[0].value
     
    }

    CreateIcons(){

      this.icon1 = {
      url: "/assets/huntingIcons/AccessPoint.png" + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    this.icon2 = {
      url: "/assets/huntingIcons/BuckBed.png"  + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    this.icon3 = {
      url: "/assets/huntingIcons/StandLoc.png"  + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    this.icon4 = {
      url: "/assets/OleBuckington.jpg"  + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

  }

  saveSpot(event) {

    this.sendWind = this.NorthWind +"," + this.NorthEastWind + "," + this.EastWind + "," +
    this.SouthEastWind + "," + this.SouthWind +"," + this.SouthWestWind + "," + this.WestWind +"," + this.NorthWestWind

    const id = event.target.dataset.id
    const csrfToken = document.querySelector("[name='csrf-token']").content

    fetch(`create`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          id:this.id,
          loc_type: this.locType,
          name: this.nameTarget.value,
          latitude: this.latTarget.value,
          longitude:this.lonTarget.value,
          notes: this.notesTarget.value,
          num_sits: this.numsitsTarget.value,
          wind: this.sendWind
            }) // body data type must match "Content-Type" header
    })
       //.then(response => response.json())
       //.then(data => {alert(data.message)})

       //CALL A RESET FUNCTION
        this.clearMarker();
        this.infowindow.close();

  }

  clearMarker(){

    //DON'T FORGET TO ADD THE TYPE OF ICON FOR
   
    this.setCompassImages();
    this.NorthWind = ""
    this.NorthEastWind = ""
    this.EastWind = ""
    this.SouthEastWind = ""
    this.SouthWind = ""
    this.SouthWestWind = ""
    this.WestWind = ""
    this.NorthWestWind = ""

    this.sendWind = "";

    this.nameTarget.value = ""
    this.dateTarget.value = ""
    this.notesTarget.value = ""
    this.numsitsTarget.value = ""



  }



  }



