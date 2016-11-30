# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require 'spec_helper'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
#require "pundit/rspec"
require 'factory_girl_rails'
require 'capybara/rspec'
#require 'vcr'
require 'webmock/rspec'
require 'devise'
#require "paperclip/matchers"


VCR.configure do |c|
  c.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  c.hook_into :webmock
  c.ignore_localhost = true
end

# Add additional requires below this line. Rails is not loaded until this point!
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  #config.filter_run focus: true
  config.infer_spec_type_from_file_location!
#  config.include Paperclip::Shoulda::Matchers
  config.include Devise::TestHelpers, type: :controller
  #config.include FeatureHelpers
  config.include Capybara::DSL
  config.include FactoryGirl::Syntax::Methods
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
end
