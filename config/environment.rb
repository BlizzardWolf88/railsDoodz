# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
 
ActionMailer::Base.smtp_settings = {
    user_name: 'apikey', 
    password: Rails.application.credentials.dig(:sendgrid, :Email_Key1),
    domain: 'lildukedana@gmail.com',
    address: 'smtp.sendgrid.net',
    port: 587,
    authentication: :plain,
    enable_starttls_auto: true
  }

