ruby '2.4.1'
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'bootstrap-sass'
gem 'carrierwave'
gem 'devise'
gem 'dropzonejs-rails'
gem 'excon'
gem 'fog-aws'
gem 'haml'
gem 'html2haml'
gem 'inherited_resources'
gem 'jbuilder'
gem 'jquery-rails'
gem 'jquery-turbolinks'
gem 'pg'
gem 'puma'
gem 'rails', '5.0.1'
gem 'redis'
gem 'sass-rails'
gem 'sidekiq'
gem 'simple_form'
gem 'sqlite3'
gem 'streamio-ffmpeg'
gem 'therubyracer', platforms: :ruby
gem 'turbolinks'
gem 'uglifier'
gem 'viddl'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'jazz_fingers', github: 'andrewfader/jazz_fingers'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
  gem 'letter_opener'
end
