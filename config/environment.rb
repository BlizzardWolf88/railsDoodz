# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!


# ActionMailer::Base.delivery_method = :smtp
# ActionMailer::Base.perform_deliveries = true
# ActionMailer::Base.smtp_settings={
#     address:            'smpt.gmail.com',
#     port:                465,
#     domain:              'gmail.com',
#     user_name:           ENV['GMAIL_USERNAME'],
#     password:            ENV['GMAIL_PASSWORD'],
#     authentication:       'plain',
#     :ssl => true,
#     :tsl => true,
#     enable_starttls_auto:true

# }

ActionMailer::Base.smtp_settings = {
    :user_name => 'apikey', # This is the string literal 'apikey', NOT the ID of your API key
    :password => 'SG.ZMOqQQ6xSxqeE-PQWTYeeQ.nGeml-eGqM1rNBZQpW7-hImChoFkxMsQSuhTTDN1OwA', # This is the secret sendgrid API key which was issued during API key creation
    :domain => 'lildukedana@gmail.com',
    :address => 'smtp.sendgrid.net',
    :port => 587,
    :authentication => :plain,
    :enable_starttls_auto => true
  }