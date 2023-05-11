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
 import "@rails/request.js"

window.dispatchMapsEvent = function() {
  console.log(google)
  const evt = new Event("mapsLoaded");
  document.dispatchEvent(evt);
};



