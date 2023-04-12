# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
    user_name: 'apikey', # This is the string literal 'apikey', NOT the ID of your API key
    password: Rails.application.credentials.dig(:Email_Key1), # This is the secret sendgrid API key which was issued during API key creation
    domain: 'lildukedana@gmail.com',
    address: 'smtp.sendgrid.net',
    port: 587,
    authentication: :plain,
    enable_starttls_auto: true
  }


# Mail.defaults do
#         delivery_method :smtp, {
#       :user_name => ENV['User_ID'], # This is the string literal 'apikey', NOT the ID of your API key
#       : :password => Rails.application.credentials.dig(:Email_Key2), # This is the secret sendgrid API key which was issued during API key creation
#       :address => ENV['Email_Add'],
#       :port => 587,
#       :authentication => :plain,
#       :enable_starttls_auto => true
#     }

  #end