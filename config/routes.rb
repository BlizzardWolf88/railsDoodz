Rails.application.routes.draw do

  
  root 'home#index'
  get  'home/about'
  get  'madoods/index'
  get  'locs/index'
  get  'locs/saveSpot', to: "locs#saveSpot"
  get  'locs/getMarkers'
  post "locs/create", to: "locs#create"
  post "locs/update", to: "locs#update"
  post "locs/destroy", to: "locs#destroy"


  

  # GET '/users/:id users'#show
  # PUT '/users/:id users'#update

  # PUT '/users/invitation devise/invitations'#update
  

    devise_for :users, controllers: {
      sessions: 'users/sessions',
      passwords: 'users/passwords',
      registrations: 'users/registrations'
      #confirmations: 'user/confirmations' Might need this later
    }

   
  resources :madoods
  resources :doodzs
  resources :locs
 # resources :users
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
