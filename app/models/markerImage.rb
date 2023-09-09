class MarkerImage < ApplicationRecord
    belongs_to :loc
    has_one_attached :image
    #has_rich_text :body
end