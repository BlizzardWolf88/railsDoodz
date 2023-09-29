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
  static targets = ["mypics","deletebtn"]
  connect() {
    this.initImages();

  }

  initImages(){
    
    this.deletebtnTarget.hidden = true;

  }

  showImages(images) {
      images.forEach(image => {
      const imgElement = document.createElement('img')
      imgElement.src = image.url
      imgElement.alt = image.filename
      this.containerTarget.appendChild(imgElement)
    })
  }


async fetchImages(marker){
 let pics
 let url = "../markerimages/getPics?loc_id="+ marker
this.mypicsTarget.value 

  const request = new FetchRequest("get",url, { responseKind: "json" })
    const response = await request.perform()

    if (response.ok){
      const data = await response.json()
      pics = data 
    }

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
