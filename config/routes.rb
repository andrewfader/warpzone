Rails.application.routes.draw do
  devise_for :users
  root to: 'videos#index'
  resources :videos do
    get :upvote
    get :downvote
  end
  resources :comments
end
