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

# config.assets.raise_runtime_errors = true
#   config.action_mailer.delivery_method = :sendmail
#   config.action_mailer.delivery_method = :smtp
#   config.action_mailer.perform_deliveries = true
#   config.action_mailer.raise_delivery_errors = true
#   #config.action_mailer.default_options = {from: 'TestIT@email.com'}
#   config.action_mailer.default_url_options = { host: 'localhost: 3000' } 
#   config.action_mailer.smtp_settings = {
#   address:              'smtp.gmail.com',
#   port:                  587,
#   domain:               'gmail.com',
#   user_name:            Rails.application.credentials.gmail['lildukedana@gmail.com'],
#   password:              Rails.application.credentials.gmail['Kancamgus35$$'],
#   authentication:       'plain',
#   enable_starttls_auto: true  }