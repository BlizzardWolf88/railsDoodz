class User < ApplicationRecord
  # Include default devise modules. Others available are:
  #, :lockable, :timeoutable, :trackable and :omniauthable 
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:confirmable

  has_many :madood
  has_one_attached :image
end
