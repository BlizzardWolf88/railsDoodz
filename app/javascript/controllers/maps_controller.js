import { Controller } from "@hotwired/stimulus"



export default class extends Controller {
  //static targets = ["coordinates", "map", "latitude", "longitude","wind"]
  static targets = ["map","lat","lon","north","northwest","northeast","west","east","southwest","southeast","south"]
 
  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();      
    }
  }

  
  initializeMap(evt) {
    //Don't Invoke these functions for now 
     //Lat and Lon for starting position on map
      this.lat = parseFloat("43.639")
      this.lon = parseFloat("-71.981" )
      const coordinates = {lat: this.lat,lng: this.lon}
      const map = new google.maps.Map(this.mapTarget,{center:coordinates,zoom:15});
  

     this.content = formContent //HTML for the info Window
        
     this.CreateIcons();
  
      map.addListener("click", (e) => {

        console.log("Map Listener")
        this.placeMarkerAndPanTo(e.latLng, map);   
        
      });     
   
  }


     placeMarkerAndPanTo(latLng, map) {   
      //let place = this.getPlace()

     
    
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

      this.latTarget.value = parsee.lat
      this.lonTarget.value = parsee.lng 


      this.infowindow = new google.maps.InfoWindow();
      this.infowindow.setContent(this.content)
      this.infowindow.open(map,this.marker);
      
       

      let northLogo = document.getElementById('northLogo').src = "/assets/wind/North.png";
      let northWestLogo = document.getElementById('northWestLogo').src = "/assets/wind/NorthWest.png";
      let northEastLogo = document.getElementById('northEastLogo').src = "/assets/wind/NorthEast.png";
      let westLogo = document.getElementById('westLogo').src = "/assets/wind/West.png";
      let eastLogo = document.getElementById('eastLogo').src = "/assets/wind/East.png";
      let southWestlogo = document.getElementById('southWestLogo').src = "/assets/wind/SouthWest.png";
      let southEeastlogo = document.getElementById('southEastLogo').src = "/assets/wind/SouthEast.png";
      let southLogo = document.getElementById('southLogo').src = "/assets/wind/South.png";
          
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

    sendNorth(){
      if(this.NorthWind == undefined){
        this.NorthWind = this.northTarget.dataset.north
        northLogo.src = "/assets/wind/NorthAfter.png"
      }
      else{
        this.NorthWind = null
        northLogo.src = "/assets/wind/North.png"  
      }       
    }
   
    sendNorthWest(){
      if(this.NorthWestWind == undefined){
        this.NorthWestWind = this.northwestTarget.dataset.northwest
        northWestLogo.src = "/assets/wind/NorthWestAfter.png"
      }
      else{
        this.NorthWestWind = null
        northWestLogo.src = "/assets/wind/NorthWest.png"  
      }       
    }

    sendNorthEast(){
      if(this.NorthEastWind == undefined){
        this.NorthEastWind = this.northeastTarget.dataset.northeast
        northEastLogo.src = "/assets/wind/NorthEastAfter.png"
      }
      else{
        this.NorthEastWind = null
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

 

    
  }



