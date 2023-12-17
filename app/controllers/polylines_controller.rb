class PolylinesController < ApplicationController
  before_action :authenticate_user!

  def getPolyLines
    @polyLines = current_user.polylines    
    render json: @polyLines
  end


  def save_dist_marks
    polyline_params[:distLocs].each do |loc_data|
     @loc = current_user.loc.create(
        latitude: loc_data[:latitude],
        longitude: loc_data[:longitude],
        loc_type: loc_data[:loc_type]
      )
    end

    # polyline_params[:polylines].each do |polyline_data|
    #  @polyLine = create_polyline(polyline_data)
    # end
   
    respond_to do |format|
      if @loc.save
        format.html { redirect_to loc_url(@loc), notice: "Poly loc and marker were successfully created." }           
        msg = { :status => "ok", :message => "Poly loc and marker were successfully created." }
        format.json {  render  json: @loc }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @loc.errors, status: :unprocessable_entity }
      end
    end

  end


  private
 
  def polyline_params
    params.permit(distLocs: [:latitude, :longitude, :loc_type])
  end
end
