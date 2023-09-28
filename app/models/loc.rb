class Loc < ApplicationRecord
    belongs_to :user
    has_many_attached :images, dependent: :destroy

    validate :image_type

    def image_type
      if images.attached?
        images.each do |image|
          unless image.content_type.in?(%w(image/jpeg image/png image/gif))
            errors.add(:images, "Must be a JPEG, PNG, or GIF file")
          end
        end
      end
    end
end

