Rails.application.routes.draw do

  
  root 'home#index'
  get  'home/about'
  get  'madoods/index'
  
  

    devise_for :users, controllers: {
      sessions: 'users/sessions',
      passwords: 'users/passwords',
      registrations: 'users/registrations',
      confirmations: 'users/confirmations'
     # after_sign_in_path_for  'madoods/index'   
    }
  

  resources :madoods
  resources :doodzs
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
