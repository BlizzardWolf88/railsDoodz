class PolylinesController < ApplicationController
  before_action :authenticate_user!

  def save_dist_marks
    polyline_params[:distLocs].each do |loc_data|
      current_user.loc.create(
        latitude: loc_data[:latitude],
        longitude: loc_data[:longitude],
        loc_type: loc_data[:loc_type]
      )
    end


    polyline_params[:polylines].each do |polyline_data|
      create_polyline(polyline_data)
    end


  end

  # def save_polylines_and_labels
  #   polyline_params[:polylines].each_with_index do |polyline_data, index|
  #     dist_loc_start = find_or_create_loc(polyline_data[:path][0])
  #     dist_loc_end = find_or_create_loc(polyline_data[:path][1])

  #     polyline = create_polyline(dist_loc_start, dist_loc_end,distance)
  #     format.json { render json: response_data, status: :ok }
  #   end
  # end

  private

  def find_or_create_loc(coords)
    current_user.loc.find_or_create_by(
      latitude: coords[:lat],
      longitude: coords[:lng]
    )
  end

  def create_polyline(polyline_data)
    #Rails.logger.info("Creating polyline with parameters: #{dist_loc_start}, #{dist_loc_end}, #{distance}")
    current_user.loc.find(dist_loc_start.id).start_polylines.create(
      start_loc: dist_loc_start,
      end_loc: dist_loc_end,
      distance: distance
    )
  end



  def polyline_params
    params.permit(distLocs: [:latitude, :longitude, :loc_type], polylines: [:path => [:lat, :lng, :distance]])
  end

end 
