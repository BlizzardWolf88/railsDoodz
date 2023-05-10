import { Controller } from "@hotwired/stimulus"



export default class extends Controller {
  //static targets = ["coordinates", "map", "latitude", "longitude","wind"]
  static targets = ["map","lat","lon","name","date","notes","north","northwest","northeast","west","east","southwest","southeast","south","loctype","numsits"]

  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();      
    }
  }

  
  initializeMap(evt) {
    //Don't Invoke these functions for now 

    let northLogo = document.getElementById('northLogo').src = "/assets/wind/North.png";
    let northWestLogo = document.getElementById('northWestLogo').src = "/assets/wind/NorthWest.png";
    let northEastLogo = document.getElementById('northEastLogo').src = "/assets/wind/NorthEast.png";
    let westLogo = document.getElementById('westLogo').src = "/assets/wind/West.png";
    let eastLogo = document.getElementById('eastLogo').src = "/assets/wind/East.png";
    let southWestlogo = document.getElementById('southWestLogo').src = "/assets/wind/SouthWest.png";
    let southEeastlogo = document.getElementById('southEastLogo').src = "/assets/wind/SouthEast.png";
    let southLogo = document.getElementById('southLogo').src = "/assets/wind/South.png";

     //Lat and Lon for starting position on map
      const lat = parseFloat("43.639")
      const lon = parseFloat("-71.981" )
      const coordinates = {lat: lat,lng: lon}
      this.map = new google.maps.Map(this.mapTarget,{center:coordinates,zoom:15});
  

     this.content = formContent //HTML for the info Window marker form
        
     this.CreateIcons();
  
     this.map.addListener("click", (e) => {

        console.log("Map Listener")
        this.placeMarkerAndPanTo(e.latLng, this.map);   
        
      });     
   
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
        
      const cords = JSON.stringify(latLng.toJSON(), null, 2)
      const parsee = JSON.parse(cords);

      //send coords to testfields
      this.latTarget.value = parsee.lat
      this.lonTarget.value = parsee.lng 


      this.infowindow = new google.maps.InfoWindow();
      this.infowindow.setContent(this.content)
      this.infowindow.open(map,this.marker);
      
     
          
  }   


  keydown(event){

    if (event.key == "Enter"){      
        this.goToSpot();
    }
  }

  goToSpot(){

    //validate coords
    var reg = RegExp("^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$");

    if( reg.exec(this.latTarget.value) && reg.exec(this.lonTarget.value) ) {
      var latLng = new google.maps.LatLng(this.latTarget.value, this.lonTarget.value);
      this.placeMarkerAndPanTo(latLng, this.map);
    }

  }

    //INSTANIATE ALL THIS._WIND TO with let and set to "" 
    sendNorth(){
      if(this.NorthWind == undefined || this.NorthWind == "" ){
        this.NorthWind = this.northTarget.dataset.north
        northLogo.src = "/assets/wind/NorthAfter.png"
      }
      else{
        this.NorthWind = ""
        northLogo.src = "/assets/wind/North.png"  
      }       
    }

     
   
    sendNorthWest(){
      if(this.NorthWestWind == undefined || this.NorthWestWind == ""){
        this.NorthWestWind = this.northwestTarget.dataset.northwest
        northWestLogo.src = "/assets/wind/NorthWestAfter.png"
      }
      else{
        this.NorthWestWind = ""
        northWestLogo.src = "/assets/wind/NorthWest.png"  
      }       
    }

    sendNorthEast(){
      if(this.NorthEastWind == undefined || this.NorthEastWind == ""){
        this.NorthEastWind = this.northeastTarget.dataset.northeast
        northEastLogo.src = "/assets/wind/NorthEastAfter.png"
      }
      else{
        this.NorthEastWind = " "
        northEastLogo.src = "/assets/wind/NorthEast.png"  
      }       
    }

    sendWest(){
      if(this.WestWind == undefined){
        this.WestWind = this.westTarget.dataset.west
        westLogo.src = "/assets/wind/WestAfter.png"
      }
      else{
        this.WestWind = null  
        westLogo.src = "/assets/wind/West.png"
      }       
    }

    sendEast(){      
      if(this.EastWind == undefined){
        this.EastWind  = this.eastTarget.dataset.east
        eastLogo.src = "/assets/wind/EastAfter.png"
      }
      else{
        this.EastWind = null  
        eastLogo.src = "/assets/wind/East.png"
      }    
    }

    sendSouthWest(){      
      if(this.SouthWestWind == undefined){
        this.SouthWestWind  = this.southwestTarget.dataset.southwest
        southWestLogo.src = "/assets/wind/SouthWestAfter.png"
      }
      else{
        this.SouthWestWind = null  
        southWestLogo.src = "/assets/wind/SouthWest.png"
      }    
    }

    sendSouthEast(){      
      if(this.SouthEastWind == undefined){
        this.SouthEastWind  = this.southeastTarget.dataset.southeast
        southEastLogo.src = "/assets/wind/SouthEastAfter.png"
      }
      else{
        this.SouthEastWind = null  
        southEastLogo.src = "/assets/wind/SouthEast.png"
      }    
    }

    sendSouth(){
      if(this.SouthWind == undefined){
        this.SouthWind  = this.southTarget.dataset.south
        southLogo.src = "/assets/wind/SouthAfter.png"
      }
      else{
        this.SouthWind = null  
        southLogo.src = "/assets/wind/South.png"
      }  
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

  saveSpot(event) {

    //var sendWind = this.NorthWind +"," + this.NorthEastWind + "," + this.NorthWestWind
    var sendWind = "NW"
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
          name: this.nameTarget.value, 
          latitude: this.latTarget.value,
          longitude:this.lonTarget.value,
          notes: this.notesTarget.value,
          num_sits: this.numsitsTarget.value,
          wind: sendWind
            }) // body data type must match "Content-Type" header
    })
       //.then(response => response.json())
       //.then(data => {alert(data.message)})

       //CALL A RESET FUNCTION
        this.nameTarget.value = ""
        this.dateTarget.value = ""
        this.notesTarget.value = ""
        this.numsitsTarget.value = ""

        this.infowindow.close();

  }
 

    
  }



