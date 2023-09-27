class MarkerImage < ApplicationRecord
    belongs_to :loc
    has_one_attached :images
    #has_rich_text :body
end