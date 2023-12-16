Rails.application.routes.draw do

  
  root 'home#index'
  get  'home/about'
  get  'madoods/index'
  get  'locs/index'
  get  'locs/saveSpot', to: "locs#saveSpot"
  get  'locs/getMarkers'
  get  'polylines/getPolyLines'
  get  'locs/getMarkerImage/:loc_id', to: 'locs#getMarkerImage'
  post "locs/create", to: "locs#create"
  post "locs/update", to: "locs#update"
 
  post "locs/updateImages", to: "locs#updateImages"
  post "locs/destroy", to: "locs#destroy"
  post 'locs/delete_image', to: 'locs#delete_image'

  post "locs/save_dist_marks", to: 'polylines#save_dist_marks' 
  
  get  "markerimages/getPics"
  post "markerimages/create", to: "markerimages#create"
  post "markerimages/update", to: "markerimages#update"
  post "markerimages/destroy", to: "markerimages#destroy"
  

    devise_for :users, controllers: {
      sessions: 'users/sessions',
      passwords: 'users/passwords',
      registrations: 'users/registrations'
      #confirmations: 'user/confirmations' Might need this later
    #   resources :locs do
    #     resources :marker_image
    #   end
    # end
    }

   
  resources :madoods
  resources :doodzs
  resources :locs do
    member do
      delete :delete_image
    end
  end
  resources :markerpics
 # resources :users
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
