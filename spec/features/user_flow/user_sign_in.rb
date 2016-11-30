require 'rails_helper'
require 'spec_helper'


describe "Login" do
  describe "GET /" do

    before(:each) do
      @user = create(:user, :real_user)
      @user.confirm!
    end

    it "should successfully login to dashboard", js: true do
      visit('/users/sign_in')
      fill_in('Email', with: @user.email)
      fill_in('Password', with: 'fandomapp')
      click_on('Sign in')
      binding.pry
      page.should have_content('Create Feed')
    end
  end
end