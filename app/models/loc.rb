class Loc < ApplicationRecord
    belongs_to :user
    # has_many :markerimage
    has_many_attached :images
end
