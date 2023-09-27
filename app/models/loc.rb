class Loc < ApplicationRecord
    belongs_to :user
    # has_many :markerimage
    has_many_attached :images, dependent: :destroy

    #validates :images, presence: true
    #validate :image_type

    def image_type
        if images.attached? && !images.content_type.in?(%w(image/jpeg image/png image/gif))
          errors.add(:images, "Must be a JPEG, PNG, or GIF file")
        end
    end
end



# This must be implemented at some point
#validates :attachment, content_type: { in: ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'] }