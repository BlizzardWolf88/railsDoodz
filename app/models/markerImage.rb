class Markerimage < ApplicationRecord
    belongs_to :loc
    has_many_attached :image
    #has_rich_text :body
end