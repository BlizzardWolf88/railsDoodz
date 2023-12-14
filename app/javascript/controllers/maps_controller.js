import { Application } from "@hotwired/stimulus";
import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'

export default class extends Controller {
  static targets = ["map","lat","lon","name","date","notes","north","northwest","northeast","west","east",
  "southwest","myID","southeast","south","loctype","numsits","showpicsbtn","createbtn","updatebtn","deletebtn",
  "markerimages","inputGroupFile","buttons","polylines"]
 
  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();
    }
    
  }

  initializeMap(evt) {
    this.myMarkers =[]

    this.showpicsbtnTarget.hidden = true;

    this.updatebtnTarget.hidden = true;
    this.createbtnTarget.hidden = false;
    this.deletebtnTarget.hidden = true

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
    this.MeasureDist = false

    this.fetchMarkers();
    this.CreateIcons();

     this.map.addListener("click", (e) => {

        console.log("Map Listener")
        this.placeMarkerAndPanTo(e.latLng, this.map);

      });

  }

  async fetchMarkers(){

    const request = new FetchRequest("get","/locs/getMarkers", { responseKind: "json" })
    const response = await request.perform()

    if (response.ok){
      const markers = await response.json
      this.renderMarkers(markers)
    }
    
  }

  //add new param if update
  renderMarkers(markers){

     markers.forEach((marker) => {

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
          case("Predator"):
            sendIcon = this.icon6
            break;
          case("laser"):
          sendIcon = this.icon7
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
        
        //ADD ALL VALUES FROM THE DB
        //The update comes with 2 objects: Form data i.e. lat,long and images
        //We only need the form oject properties for this update
        //The image update that takes place in the images modal
        //needs this in order to delete
       
        gmarker.set("id", marker.id.toString())
        gmarker.set("name", marker.name)
        gmarker.set("lat", marker.latitude)
        gmarker.set("lon", marker.longitude)
        gmarker.set("locType", marker.loc_type)
        gmarker.set("wind", marker.wind)
        gmarker.set("numSits", marker.num_sits)
        gmarker.set("date", marker.created_at)
        gmarker.set("notes", marker.notes)
          
        this.myMarkers.push(gmarker)
        //adding a a click event to each of the user's markers
        google.maps.event.addListener(gmarker, 'click', (e) => {
          this.showMarker(gmarker);

        });

     });

  }

  showMarker(userGMarker){
    if(this.marker != undefined){
      this.marker.setVisible(false); //hide the "current location by click" marker
    }   

    this.myMarker = userGMarker
    this.clearMarker();

    this.markerId = userGMarker.get("id")
    this.nameTarget.value = userGMarker.get("name")
    this.latTarget.value = userGMarker.get("lat")
    this.lonTarget.value = userGMarker.get("lon")
    this.loctypeTarget.value = userGMarker.get("locType")
    this.windArr = userGMarker.get("wind").split(",")
    this.numsitsTarget.value = userGMarker.get("numSits")
    this.dateTarget.value = Date(userGMarker.get("date"))
    this.notesTarget.value = userGMarker.get("notes")

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
  
       //show correct buttons (Create or Edit)
       this.updatebtnTarget.hidden = false;
       this.createbtnTarget.hidden = true;
       this.deletebtnTarget.hidden = false  

       this.getMarkerImages(this.markerId)
       //Fetch images asscociated with this marke 
  }

  async getMarkerImages(locID){

    const request = new FetchRequest("get","/locs/getMarkerImage/"+ locID, { responseKind: "json" })
    const response = await request.perform()

    if (response.ok){
       let images = await response.text;
      if (images == "[]"){
        this.showpicsbtnTarget.hidden = true
      }
      else{
       this.showpicsbtnTarget.hidden = false
       
       //We must pass this to a new stimulus controller the modal will break
       // The binding of the stimulus targets 
       const imagesControl = this.application.getControllerForElementAndIdentifier(document.getElementById('markerimages'), "markerimages" )
       imagesControl.showImages(JSON.parse(images),locID,true)// we need the location id as a foriegn key for marker images 
      }
       
    }

  }

     placeMarkerAndPanTo(latLng, map) {

      //setting pins to calculate a distance
      if(this.activateMeasureDist){
        if(this.marker != undefined){  
            this.marker.setVisible(false);                          
       }  

       // MUST REFACTOR
       const polylineCntl = this.application.getControllerForElementAndIdentifier(document.getElementById('polylines'), "polylines" )
       polylineCntl.CreateDistanceLocs(latLng,this.distLocs,this.map)
      
      //this.CreateDistanceLocs(latLng)
      }
     else{
          //render pin on the click
          if(this.marker != undefined){
              this.marker.setPosition(latLng);
                this.marker.setVisible(true);  
                this.marker.setIcon(this.icon5)    
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
  }
  
  SwicthOnMesureDist(){

    this.activateMeasureDist = !this.activateMeasureDist; 
    this.toggleVisibility()
    this.distLocs = []
    this.polylines = []
    this.distLabels = []
  }

  //This is to show the save lines button and the undo button
  toggleVisibility() {
    this.buttonsTargets.forEach((button) => {
      button.classList.toggle("d-none", !button.classList.contains("d-none"));
    });
  }
   
  setCompassImages(){

    document.getElementById('northLogo').src = "/assets/wind/North.png";
    document.getElementById('northWestLogo').src = "/assets/wind/NorthWest.png";
    document.getElementById('northEastLogo').src = "/assets/wind/NorthEast.png";
    document.getElementById('westLogo').src = "/assets/wind/West.png";
    document.getElementById('eastLogo').src = "/assets/wind/East.png";
    document.getElementById('southWestLogo').src = "/assets/wind/SouthWest.png";
    document.getElementById('southEastLogo').src = "/assets/wind/SouthEast.png";
    document.getElementById('southLogo').src = "/assets/wind/South.png";
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
      if(event.target.selectedOptions[0] != undefined){
        this.locType = event.target.selectedOptions[0].value 
      }       
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

    this.icon6 = { //name is predator
      url: "/assets/distanceIcon1.png"  + '#custom_marker', // url
      scaledSize: new google.maps.Size(35, 35), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(20, 20) // anchor
    };

    this.icon7 = { //name laser
      url: "/assets/distanceIcon2.png"  + '#custom_marker', // url
      scaledSize: new google.maps.Size(35, 35), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(20, 20) // anchor
    };

  }

 async saveSpot(event) {
 
  let markers = []
  let updateOrCreate 
  let sendWind = this.NorthWind +"," + this.NorthEastWind + "," + this.EastWind + "," +
  this.SouthEastWind + "," + this.SouthWind +"," + this.SouthWestWind + "," + this.WestWind +"," + this.NorthWestWind

  const fileInput = this.inputGroupFileTarget;
  const files = fileInput.files;
  let loc = new FormData();

    
  if(this.updatebtnTarget.hidden){
    updateOrCreate = "create"
  }
  else{
    updateOrCreate = "update" 
    loc.append("id", this.markerId)
  }

  loc.append("name", this.nameTarget.value)
  loc.append("latitude", this.latTarget.value)
  loc.append("longitude", this.lonTarget.value)
  loc.append("notes",this.notesTarget.value)
  loc.append("loc_type",this.locType )
  loc.append("num_sits", this.numsitsTarget.value)
  loc.append("wind", sendWind)

  for (let i = 0; i < files.length; i++) {
    loc.append("images[]", files[i])    
  }
  
  const response = await post(updateOrCreate,{
        body: loc,
        responseKind: 'json'
         
       })
            
      if (response.ok) {
        const data = await response.json
        markers.push(data)// The render markers function is exptecting an array
        this.renderMarkers(markers)          
      }
       
        this.clearMarker();      
  }

  async destroySpot() {
  
    const response = await post('destroy',{
      body:{id:this.markerId},
      responseKind: 'json'
       
     })
          
    if (response.ok) {     
      this.myMarkers.forEach((marker) => {
        if(this.markerId == marker.id){
          
          const index = this.myMarkers.indexOf(marker);
          if (index > -1) { // only splice array when item is found
            this.myMarkers.splice(index, 1); // 2nd parameter means remove one item only
          }
        }

      });
      
      this.myMarker.setMap(null)    
      this.clearMarker();
    }
  }

  /** Filter methods for location markers */
  filterTimesHunted(event){
    let timesHunted
    let found  

    this.myMarkers.forEach( (marker) =>{    
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
      
      this.myMarkers.forEach( (marker) =>{    
        markerLocT = marker.get("locType"); //Get the Loc Type Element from the marker 
        found = (event.target.selectedOptions[0].value == markerLocT || event.target.selectedOptions[0].value == "" ) ? this.map : null; 
        marker.setMap(found)
      });
       
  }  

  filterWinds(event){
    //filter the markers based on location type
    let splitWind
    
    this.myMarkers.forEach( (marker) =>{ 
    
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

      this.showpicsbtnTarget.hidden = true;
      this.updatebtnTarget.hidden = true;
      this.createbtnTarget.hidden = false;
      this.deletebtnTarget.hidden = true
      document.getElementById('inputGroupFile').value = ''; //clear the Image upload field 

    }

  }



