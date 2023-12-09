class PolylinesController < ApplicationController
    before_action :authenticate_user!
    
    def save_dist_marks(dist_locs_data, user)
        dist_locs_data.each do |loc_data|
          current_user.loc.create(
            latitude: loc_data[:latitude],
            longitude: loc_data[:longitude],
            loc_type: loc_data[:loc_type]
          )
        end
      end
  
      def save_polylines_and_labels(polylines_data, labels_data, user)
        polylines_data.each_with_index do |polyline_data, index|
          dist_loc_start = find_or_create_loc(polyline_data[:path][0], user)
          dist_loc_end = find_or_create_loc(polyline_data[:path][1], user)
    
          polyline = create_polyline(dist_loc_start, dist_loc_end, user)
          create_label(polyline, labels_data[index])
        end
      end
      
      def find_or_create_loc(coords, user)
        current_user.loc.find_or_create_by(
          latitude: coords[:lat],
          longitude: coords[:lng]
        )
      end
    
      def create_polyline(dist_loc_start, dist_loc_end, user)
        current_user.loc.find(dist_loc_start.id).start_polylines.create(
          end_loc: dist_loc_end
        )
      end
    
      def create_label(polyline, label_data)
        polyline.create_dist_label(
          distance: label_data[:distance]
        )
      end
end