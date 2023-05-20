import { Controller } from "@hotwired/stimulus"
import{FetchRequest, get, post, put, patch, destroy } from '@rails/request.js'

// Connects to data-controller="marker-images"
export default class extends Controller {

  static targets = ["deletebtn"]
  connect() {
    this.initImages();
  }

  initImages(){
    
    this.deletebtnTarget.hidden = true;

  }



}
