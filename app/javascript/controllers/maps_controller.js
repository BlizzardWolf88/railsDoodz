import { Controller } from "@hotwired/stimulus"



export default class extends Controller {
  //static targets = ["coordinates", "map", "latitude", "longitude","wind"]
  static targets = ["coordinates","north","south","east","west"]
 
  connect() {
    if (typeof (google) != "undefined"){
      this.initializeMap();      
    }
  }

  
  initializeMap(evt) {
    //Don't Invoke these functions for now
     

     
   
     
     
     //Lat and Lon for starting position on map
     const lat = parseFloat(this.coordinatesTarget.dataset.lat)
     const lon = parseFloat(this.coordinatesTarget.dataset.lon)
     const coordinates = {lat:lat,lng:lon}
     const map = new google.maps.Map(this.coordinatesTarget,{center:coordinates,zoom:15});
     this.content = formContent
        
     this.CreateIcons();
  
      map.addListener("click", (e) => {

        console.log("Map Listener")
        this.placeMarkerAndPanTo(e.latLng, map);   
        
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
        
      this.infowindow = new google.maps.InfoWindow();
      this.infowindow.setContent(this.content)
      this.infowindow.open(map,this.marker);   
      
    let northLogo = document.getElementById('northLogo').src = "/assets/North.png";
    let southLogo = document.getElementById('southLogo').src = "/assets/South.png";
    let westLogo = document.getElementById('westLogo').src = "/assets/West.png";
    let eastLogo = document.getElementById('eastLogo').src = "/assets/East.png";

    //  northLogo.src = "/assets/North.png";
    //  logoSouth.src = "/assets/South.png";
    //  logoWest.src = "/assets/West.png";
    //  logoEast.src = "/assets/East.png";
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
        northLogo.src = "/assets/NorthAfter.png"
      }
      else{
        this.NorthWind = null
        northLogo.src = "/assets/North.png"  
      }       
    }

    sendWest(){
      if(this.WestWind == undefined){
        this.WestWind = this.westTarget.dataset.west
        westLogo.src = "/assets/WestAfter.png"
      }
      else{
        this.WestWind = null  
        westLogo.src = "/assets/West.png"
      }       
    }

    sendEast(){      
      if(this.EastWind == undefined){
        this.EastWind  = this.eastTarget.dataset.east
        eastLogo.src = "/assets/EastAfter.png"
      }
      else{
        this.EastWind = null  
        eastLogo.src = "/assets/East.png"
      }    
    }

    sendSouth(){
      if(this.SouthWind == undefined){
        this.SouthWind  = this.southTarget.dataset.south
        southLogo.src = "/assets/SouthAfter.png"
      }
      else{
        this.SouthWind = null  
        southLogo.src = "/assets/South.png"
      }  
    }    

 

    
  }



