Rails.application.routes.draw do

  
  root 'home#index'
  get  'home/about'
  get  'madoods/index'

  # GET '/users/:id users'#show
  # PUT '/users/:id users'#update

  # PUT '/users/invitation devise/invitations'#update
  

    devise_for :users, controllers: {
      sessions: 'users/sessions',
      passwords: 'users/passwords',
      registrations: 'users/registrations',
      confirmations: 'user/confirmations'
     # after_sign_in_path_for  'madoods/index'   
    }
  

  resources :madoods
  resources :doodzs
 # resources :users
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
