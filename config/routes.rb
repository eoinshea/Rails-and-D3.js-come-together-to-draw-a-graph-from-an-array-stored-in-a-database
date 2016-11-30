Rails.application.routes.draw do

  resources :frames, except: [:new]

  resources :videos

  devise_for :users

  # devise_scope :user do
  resources :coresets do
    post 'frames/upload', to: 'frames#upload', as: :upload
  end
    get 'coresets/example1' ,to: 'coresets#example_coreset1', as: :coreset_example1
    get 'coresets/example2' ,to: 'coresets#example_coreset2', as: :coreset_example2
    get 'coresets/example3' ,to: 'coresets#example_coreset3', as: :coreset_example3
    get 'coresets/example4' ,to: 'coresets#example_coreset4', as: :coreset_example4
    get 'coresets/example5' ,to: 'coresets#example_coreset5', as: :coreset_example5
  # end
  get 'frames/upload' ,to: 'videos#example_video', as: :example_video
  post 'frames/:coreset_id/upload', to: 'frames#upload', as: :upload_frames
  post 'coresets/upload', to: 'coresets#upload'
  get 'frames/:coreset_id/new', to: 'frames#new' , as: :new_upload_frames

  resources :users

  root to: 'home#index', as: :home_index
end
