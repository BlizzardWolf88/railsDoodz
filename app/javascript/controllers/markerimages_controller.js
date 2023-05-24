import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'

// Connects to data-controller="marker-images"
export default class extends Controller {
  static targets = ["mypics","deletebtn"]
  connect() {
    this.initImages();

  }

  initImages(){
    
    this.deletebtnTarget.hidden = true;

  }

  async saveMarkerID(marker,newOrUpdate){
      let url
      let body      
      const test = marker
      
      url = (newOrUpdate == "update") ?  "../markerpics/update":  "../markerpics/create"
        
 
      body = { 
        loc_id: marker,
        pictures: this.mypicsTarget.value
      }

      const response = await post(url,{
        body: body,
        responseKind: 'json'
         
       })
            
      if (response.ok) {
        const data = await response.json
          
                
      }
    
  }


}
