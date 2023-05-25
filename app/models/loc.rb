class Loc < ApplicationRecord
    belongs_to :user
    has_many :Markerimage
end
