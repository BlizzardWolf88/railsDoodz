// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
// import "popper"
// import "bootstrap"

//= require jquery
//= require popper
//= require turbolinks
//= require bootstrap
//= require_tree.

 import "trix"
 import "@rails/actiontext"

window.dispatchMapsEvent = function() {
  console.log("In the /javascript/application.js")
  console.log(google)
  const evt = new Event("mapsLoaded");
  //evt.initEvent=("google-maps-callback",true,true)
  //evt.args = args
  document.dispatchEvent(evt);
};



