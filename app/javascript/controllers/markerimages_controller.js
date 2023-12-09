import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'
// import {
//   getMetaValue,
//   toArray,
//   findElement,
//   removeElement,
//   insertAfter
// } from "helpers";


// Connects to data-controller="marker-images"
export default class extends Controller {
  static targets = ["mypics","deletebtn","locPics","addMoreInputGroupFile","picsModal"]
  connect() {
    this.initImages();

  }

  initImages(){
    
  }

  showImages(images,locID,newLoc) {
       if (newLoc){ 
        this.locPicsTarget.innerHTML = '' //clear the Image(s) from previous loc 
       }

       //add new images for same loc
      this.locID = locID;
      images.forEach((image,index) => {     
      const imgElement = document.createElement('img')
      imgElement.src = image.url
      imgElement.alt = image.filename

      imgElement.dataset.imageId = image.id;
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
     // this.deletebtnTarget.hidden = false;
    })
  }

  async addMoreImages(){

    const fileInput = this.addMoreInputGroupFileTarget;
    const files = fileInput.files;
    let loc = new FormData();
    loc.append("id", this.locID)
    
    for (let i = 0; i < files.length; i++) {
      loc.append("images[]", files[i])    
    }

    const response = await post("updateImages",{
      body: loc,
      responseKind: 'json'
       
     })
          
    if (response.ok) {
      //if the response is ok the images have been validated, are save and saved!
      // we can take the new images and add them to the carousel
      const images = await response.json

    //   const images = Array.from(files).map(file => {
    //     return {
    //         url: URL.createObjectURL(file),  // Assuming you want to display a preview
    //         filename: file.name,  // Assuming you want to use the file name as the filename
    //         id: null  // You might want to generate a unique ID for the image
    //     };
    // });

    this.showImages(JSON.parse(images),this.locID,false) 
    }

    document.getElementById('addMoreInputGroupFile').value = ''; //clear the Image upload field 

     
  }
  //using for delete
  getActiveImageId() {
    const activeImage = this.locPicsTarget.querySelector('.carousel-item.active img');
    
    if (activeImage) {
      return activeImage
    }
    return null;
  }
  

  async destroyPic() {
    let imageId
    let caroItem

    const activeIm = this.getActiveImageId();
    if(activeIm){
       caroItem = activeIm.closest('.carousel-item');
       imageId  = activeIm.dataset.imageId;

    }
    
    const response = await post('delete_image',{
      body:{image_id: imageId},
      responseKind: 'json'
       
     })
          
    if (response.ok) {     
      if (activeIm) {
        caroItem.remove();
        //write code if any images left make the previous the active 
        //if no images left close modal

        const nextCaroItem = caroItem.nextElementSibling;
        if (nextCaroItem) {
          // Make the next item active
          nextCaroItem.classList.add('active');
        } else {
          // If no next item, make the first item active
          const firstCaroItem = this.locPicsTarget.querySelector('.carousel-item');
          if (firstCaroItem) {
              firstCaroItem.classList.add('active');
          }
          else{
            const bootstrapModal = new bootstrap.Modal(this.picsModalTarget);
            bootstrapModal.hide(); 
          }        
      }
    }  
    }
  }
  
}
