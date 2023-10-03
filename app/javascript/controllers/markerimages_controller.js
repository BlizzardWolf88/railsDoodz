import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'
import {
  getMetaValue,
  toArray,
  findElement,
  removeElement,
  insertAfter
} from "helpers";


// Connects to data-controller="marker-images"
export default class extends Controller {
  static targets = ["mypics","deletebtn","locPics"]
  connect() {
    this.initImages();

  }

  initImages(){
    
    this.deletebtnTarget.hidden = true;

  }

  showImages(images) {
      this.locPicsTarget.innerHTML = '' //clear the Image(s) from previous loc 

      images.forEach((image,index) => {     
      const imgElement = document.createElement('img')
      imgElement.src = image.url
      imgElement.alt = image.filename
      const divElement = document.createElement('div');
      
      if (index == 0){
        //first element must be active to render
        divElement.classList.add('carousel-item', 'active');
      }
      else
      {
        divElement.classList.add('carousel-item');
      }
      
      divElement.appendChild(imgElement);
      this.locPicsTarget.appendChild(divElement)
    })
  }



  async saveMarkerImage(marker,newOrUpdate){
      let url
      let body      
      const test = marker
      
      url = (newOrUpdate == "update") ?  "../markerimages/update":  "../markerimages/create"
        
 
      body = { 
        loc_id: marker
        //pictures: this.mypicsTarget.value
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
