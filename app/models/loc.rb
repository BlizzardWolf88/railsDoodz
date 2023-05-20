class Loc < ApplicationRecord
    belongs_to :user
    has_many :MarkerImage
end
