Rails.application.routes.draw do

  #get 'home/index'
  root 'home#index'
  get  'home/about'
  
  
  devise_for :users

  #This was added because the Log out in the link_to in the _header.html.erb was causing errors
  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
  end

  # Rails.application.routes.draw do
  #   devise_for :users, controllers: {
  #     sessions: 'users/sessions'
  #   }
  # end


  resources :madoods
  resources :doodzs
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
