class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  # def index
  #   render root_path
  # end
  #
  before_filter :make_action_mailer_use_request_host_and_protocol
  #


  def make_action_mailer_use_request_host_and_protocol
    ActionMailer::Base.default_url_options[:protocol] = request.protocol
    ActionMailer::Base.default_url_options[:host] = request.host_with_port
    ActionMailer::Base.default :from => 'eoinsoftware.test@gmail.com'
  end


end

