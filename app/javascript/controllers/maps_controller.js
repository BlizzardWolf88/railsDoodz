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
    this.holdContent = formContent //HTML for the info Window marker form
    this.userContent = formContent

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
      this.renderMarkers(markers)
    }
    
    // this.userLocs = []
    // this.filterMarker =[]
    //  markers.forEach((marker) => {

    //     this.userLocs.push(marker)
    //     let sendIcon 
    //     switch(marker.loc_type){
    //       case("Access Point"):
    //         sendIcon = this.icon1
    //         break;
          
    //       case("Buck Bed Pin"):
    //         sendIcon = this.icon2
    //         break;
    //       case("Stand Pin"):
    //         sendIcon = this.icon3
    //         break;       
    //       default:
    //         sendIcon = this.icon4      
    //     }

    //     let latLng = new google.maps.LatLng(marker.latitude, marker.longitude);

    //     let gmarker = new google.maps.Marker({
    //     position: latLng,
    //     map: this.map,
    //     icon: sendIcon,
    //     title: "DON'T GET DISCOURAGED WHEN THE SEASON GETS TOUGH"

    //   });
        
    //     //Save these values to the marker for filtering and showing marker
    //     gmarker.set("id", marker.id.toString())
    //     gmarker.set("locType", marker.loc_type)
    //     gmarker.set("wind", marker.wind)
    //     gmarker.set("numSits", marker.num_sits)
      

    //     this.filterMarker.push(gmarker)
    //     //adding a a click event to each of the user's markers
    //     google.maps.event.addListener(gmarker, 'click', (e) => {
    //       this.showMarker(gmarker);


    //     });

    //  });

  }

  renderMarkers(markers){

    this.userLocs = []
    this.filterMarker =[]
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
        title: "DON'T GET DISCOURAGED WHEN THE SEASON GETS TOUGH"

      });
        
        //Save these values to the marker for filtering and showing marker
        gmarker.set("id", marker.id.toString())
        gmarker.set("locType", marker.loc_type)
        gmarker.set("wind", marker.wind)
        gmarker.set("numSits", marker.num_sits)
      

        this.filterMarker.push(gmarker)
        //adding a a click event to each of the user's markers
        google.maps.event.addListener(gmarker, 'click', (e) => {
          this.showMarker(gmarker);


        });

     });

  }

  showMarker(userGMarker){
    let markerId
    //change button name to update spot
    // change button to add/delete pics
    this.clearMarker();

    //markerId = userGMarker.title.split(",")
    markerId = userGMarker.get("id")

    this.userLocs.forEach( (loc) => {
      if(markerId == loc.id){
               
          this.nameTarget.value = loc.name;
          this.latTarget.value = loc.latitude;
          this.lonTarget.value = loc.longitude;
          this.dateTarget.value = Date(loc.create_at);
          this.notesTarget.value = loc.notes;
          this.numsitsTarget.value = loc.num_sits;

          this.loctypeTarget.value = loc.loc_type;

          this.windArr = loc.wind.split(",")

          this.windArr.forEach( (direc) =>{
            switch(direc){
              case("N"):
                this.NorthWind = direc
                northLogo.src = "/assets/wind/NorthAfter.png"
                break;    
              case("NE"):
                this.NorthEastWind = direc
                northEastLogo.src = "/assets/wind/NorthEastAfter.png"
                break;
              case("E"):
                this.EastWind = direc
                eastLogo.src = "/assets/wind/EastAfter.png"
                break;
              case("SE"):
                this.SouthEastWind = direc
                southEastLogo.src = "/assets/wind/SouthEastAfter.png"
              break;
              case("S"):
                this.SouthWind = direc
                southLogo.src = "/assets/wind/SouthAfter.png"
              break;
              case("SW"):
                this.SouthWestWind = direc
                southWestLogo.src = "/assets/wind/SouthWestAfter.png"
              break;
              case("W"):
                this.WestWind = direc
                westLogo.src = "/assets/wind/WestAfter.png"
              break;
              case("NW"):
                this.NorthWestWind = direc
                northWestLogo.src = "/assets/wind/NorthWestAfter.png"
                break;         
              default:
              
            }
          });
        
      }

    });
      
   
  }


     placeMarkerAndPanTo(latLng, map) {
     
     //Create Marker on the click
     if(this.marker != undefined){
         this.marker.setPosition(latLng);
          this.marker.setVisible(true);      
     }
     else{
       this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: this.icon5,
        });
        map.panTo(latLng);

    }
    
      this.clearMarker();
      const cords = JSON.stringify(latLng.toJSON(), null, 2)
      const parsee = JSON.parse(cords);

      //send coords to testfields
      this.latTarget.value = parsee.lat
      this.lonTarget.value = parsee.lng


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
    
    this.icon5 = {
      url: "/assets/BlueWolfDood.png"  + '#custom_marker', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

  }

 async saveSpot() {

    this.sendWind = this.NorthWind +"," + this.NorthEastWind + "," + this.EastWind + "," +
    this.SouthEastWind + "," + this.SouthWind +"," + this.SouthWestWind + "," + this.WestWind +"," + this.NorthWestWind

   
   let markers = []
   let marker = { 
      loc_type: this.locType,
      name: this.nameTarget.value,
      latitude: this.latTarget.value,
      longitude:this.lonTarget.value,
      notes: this.notesTarget.value,
      num_sits: this.numsitsTarget.value,
      wind: this.sendWind}

    const response = await post('create',{
        body: {
                //marker
                loc_type: this.locType,
                name: this.nameTarget.value,
                latitude: this.latTarget.value,
                longitude:this.lonTarget.value,
                notes: this.notesTarget.value,
                num_sits: this.numsitsTarget.value,
                wind: this.sendWind
              }
              , responseKind: 'json'
            })

            if (response.ok) {
              console.log(response)
            }
         //.then((response) =>{ this.dataP = response.json
          
        //})

        markers.push(marker)
        //this.renderMarkers(markers)
            
       //CALL A RESET FUNCTION
        this.clearMarker();
       
  }

  filterTimesHunted(event){
    let timesHunted
    let found  

    this.filterMarker.forEach( (marker) =>{    
      timesHunted = marker.get("numSits"); //The last value in the title are the times sat
      found = (event.target.selectedOptions[0].value == timesHunted 
        || event.target.selectedOptions[0].value == "" 
        || (event.target.selectedOptions[0].value == "5+" && timesHunted >= 5  )) ? this.map : null; 
      marker.setMap(found)
    });

  }

  filterLocType(event){
    //manipulate markers based on wind
      let markerLocT
      let found
      
      this.filterMarker.forEach( (marker) =>{    
        markerLocT = marker.get("locType"); //Get the Loc Type Element from the marker 
        found = (event.target.selectedOptions[0].value == markerLocT || event.target.selectedOptions[0].value == "" ) ? this.map : null; 
        marker.setMap(found)
      });
       
  }  

  filterWinds(event){
    //filter the markers based on location type
    let splitWind
    
    this.filterMarker.forEach( (marker) =>{ 
    
      splitWind = marker.get("wind");
      splitWind = splitWind.split(",");//Now we can create array of each wind direction after substring extraction

      for(let i = 0; i < splitWind.length; i++){
        if(event.target.selectedOptions[0].value == splitWind[i] || event.target.selectedOptions[0].value == "" ){
          marker.setMap(this.map)
          break;
        }
        else{
          marker.setMap(null)
        }
       }
        
    });

  }


  async clearMarker(){

    //DON'T FORGET TO ADD THE TYPE OF ICON FOR
    // const request = new FetchRequest("get","/locs/saveSpot", { responseKind: "html" })
    // const response = await request.perform()

    // if (response.ok){
    //   const data = await response.html
    //  // markers = data 
    // }

    this.loctypeTarget.value = ""
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



