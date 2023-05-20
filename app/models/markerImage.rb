class MarkerImage < ApplicationRecord
    belongs_to :loc
    has_many :image
end