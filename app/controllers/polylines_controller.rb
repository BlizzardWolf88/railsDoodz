class PolylinesController < ApplicationController
  before_action :authenticate_user!

  def getPolyLines
    @polyLines = current_user.polylines    
    render json: @polyLines
  end


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

  private

 
  def create_polyline(polyline_data)
    start_point = polyline_data[:path].first
    end_point = polyline_data[:path].last
  
    start_loc = create_or_find_loc(
      latitude: start_point[:lat],
      longitude: start_point[:lng]
    )
  
    end_loc = create_or_find_loc(
      latitude: end_point[:lat],
      longitude: end_point[:lng]
    )
  
    current_user.polylines.create(
      start_latitude: start_loc.latitude,
      start_longitude: start_loc.longitude,
      end_latitude: end_loc.latitude,
      end_longitude: end_loc.longitude,
      distance: polyline_data[:path].first[:distance].to_f 
    )
  end

  def create_or_find_loc(coords)
    current_user.loc.find_or_create_by(
      latitude: coords[:latitude],
      longitude: coords[:longitude]
    )
  end

  def polyline_params
    params.permit(distLocs: [:latitude, :longitude, :loc_type], polylines: [:path => [:lat, :lng, :distance]])
  end
end
