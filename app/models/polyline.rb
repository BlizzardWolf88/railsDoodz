class Polyline < ApplicationRecord
  belongs_to :start_loc, class_name: 'Loc'
  belongs_to :end_loc, class_name: 'Loc'
end
