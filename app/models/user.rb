class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  # Other associations
  has_many :madood
  has_many :loc, dependent: :destroy
  has_one_attached :image

  # Omniauth callback
  def self.from_google(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name # optional, if you have a name column
      user.image.attach(io: URI.open(auth.info.image), filename: "#{auth.info.name}.jpg") if auth.info.image.present?
    end
  end
end
