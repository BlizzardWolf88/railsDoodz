import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'

export default class extends Controller {
    static targets = ["buttons"]
    connect() {
      this.initImages();
      this.CreateIcons();
      this.polylines = []
      this.distLabels = []
    }
  
    initImages(){
      
    }

    CreateDistanceLocs(location,disLocs,map) {
        let daIcon
        let iconName 
     
       this.distLocs = disLocs
       this.map = map

       if (this.distLocs.length > 0){
        daIcon = this.icon7
        iconName = "laser"// each tail loc
       }else{
        daIcon = this.icon6
        iconName = "Predator"//the head
       }
      
    
        let marker = new google.maps.Marker({
                position: location,
                map: this.map,
                title: 'Point',
                icon: daIcon,
              });
    
         marker.set("locType", iconName)
         this.distLocs.push(marker)
    
         if (this.distLocs.length > 1){
          this.drawLines(this.distLocs);
         }
        
      }
    
    
      drawLines(distLocs) {
           
        for (let i = distLocs.length -1; i >=0 ; i--) {
    
            //distance between the current and the preev
            var distance = google.maps.geometry.spherical.computeDistanceBetween(
              distLocs[i].getPosition(),
              distLocs[i-1].getPosition()        
            );  
    
            let distanceInYards = distance * 1.09361; 
    
            //get medpoint of distance
            let midpoint = google.maps.geometry.spherical.interpolate(
              distLocs[i].getPosition(), distLocs[i-1].getPosition() , 0.5
            );
    
            const line = new google.maps.Polyline({
              path: [
                { lat: distLocs[i].getPosition().lat(), lng: distLocs[i].getPosition().lng() },
                { lat: distLocs[i - 1].getPosition().lat(), lng: distLocs[i - 1].getPosition().lng() },
              ],
              geodesic: true,
              strokeColor: 'red',
              strokeOpacity: 1.0,
              strokeWeight: 3,
              map: this.map,
              
            });
    
              this.polylines.push(line);
    
                let distanceLabel = new google.maps.InfoWindow({
                position: midpoint,
                pixelOffset: new google.maps.Size(0, -27),
                content: '<div style=" font-weight: bold;"  class="distance-label">' + distanceInYards.toFixed(2) + ' yards</div>'
              });
              
              //We don't want to save repetative HTML we just want the distance
              // we can reuse that HTML in the content after fetching from the db
              distanceLabel.set("distance", distanceInYards.toFixed(2))
            
            this.distLabels.push(distanceLabel);    
              distanceLabel.open(this.map)
              break;
          }
      }
    
      UndoPolyLine() {
    
          if (this.polylines.length > 0 )  {
            // Remove the last drawn polyline from the map
            const lastLine = this.polylines.pop();
            lastLine.setMap(null);
          }
            
          if (this.distLocs.length > 0) {
              // Remove the last marker from the map
              const lastMarker = this.distLocs.pop();
              lastMarker.setMap(null);
          }
    
          if (this.distLabels.length > 0) {
            // Remove the last marker from the map
            const lastLabel = this.distLabels.pop();
            lastLabel.setMap(null);
          }   
    }

    async SaveLocsAndPol(){

      const markerData = this.distLocs.map((marker) => {
        let locIcon = marker.get("locType")
      return {
        latitude: marker.position.lat(),
        longitude: marker.position.lng(),
        loc_type: locIcon
        // Add other properties you need
      };
    });

      const polylineData = this.polylines.map((polyline) => {
        return {
          path: polyline.getPath().getArray().map((latLng) => {
            return { lat: latLng.lat(), lng: latLng.lng() };
          }),
          // Add other properties you need
        };
      });

    
      const labelData = this.distLabels.map((label) => {
        let dist = label.get("distance")
        return {
          //content: label.getContent(),
          distance: dist
          // Add other properties you need
        };
});

    const response = await post('save_dist_marks',{
      body: JSON.stringify({
        distLocs: markerData,
        polylines:polylineData,
        distLabels: labelData,
      }),
      responseKind: 'json'
       
     })
          
    if (response.ok) {
      const data = await response.json     
     }        
  }

    CreateIcons(){

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


}