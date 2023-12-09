class Loc < ApplicationRecord
    belongs_to :user
    has_many_attached :images, dependent: :destroy
    
    has_many :start_polylines, class_name: 'Polyline', foreign_key: 'start_loc_id', dependent: :destroy
    has_many :end_polylines, class_name: 'Polyline', foreign_key: 'end_loc_id', dependent: :destroy
   
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

