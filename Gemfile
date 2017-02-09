ruby '2.4'
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'coffee-rails', '~> 4.2'
gem 'devise'
gem 'haml'
gem 'inherited_resources'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails'
gem 'pg'
gem 'puma', '~> 3.0'
gem 'rails', '~> 5.0.1'
gem 'redis', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'sqlite3'
gem 'therubyracer', platforms: :ruby
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'capybara-puma'
  gem 'capybara-webkit'
  gem 'jazz_fingers', github: 'andrewfader/jazz_fingers'
  gem 'rspec-rails'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller' 
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end
