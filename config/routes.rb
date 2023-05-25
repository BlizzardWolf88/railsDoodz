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

  post "markerimages/create", to: "markerimages#create"
  post "markerimages/update", to: "markerimages#update"
  post "markerimages/destroy", to: "markerimages#destroy"
  

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
  resources :markerpics
 # resources :users
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
