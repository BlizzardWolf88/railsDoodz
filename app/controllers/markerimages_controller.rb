class MarkerimagesController < ApplicationController
  before_action :set_location

  def new
    @markerimage = @loc.markerimages.new
  end

def show
end

# def create
#     # @madood = Madood.new(madood_params)
#     @pics = Markerimage.new(markerPic_param)
#      respond_to do |format|
#        if @pics.save
#          format.html { redirect_to loc_url(@pics), notice: "Location was successfully created." }
#          msg = { :status => "ok", :message => "Location was successfully created." }
#          format.json {  render  json: @pics }
#        else
#          format.html { render :new, status: :unprocessable_entity }
#          format.json { render json: @pics.errors, status: :unprocessable_entity }
#        end
#      end
#   end

  def create
    params[:markerimage][:images].each do |image|
      @markerimage = @loc.markerimages.new(image: image)
      @markerimage.save
    end

    #redirect_to new_user_location_location_image_path(@user, @loc), notice: "Images uploaded successfully!"
  end


  # def update
  #   respond_to do |format|
  #     if @loc.update(loc_params)
  #       format.html { redirect_to loc_url(@pics), notice: "Image(s) was successfully updated." }
  #       msg = { :status => "ok", :message => "Location was successfully updated." }
  #       format.json {  render  json: @pics }
  #     else
  #       format.html { render :edit, status: :unprocessable_entity }
  #       format.json { render json: @pics.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end


private

def set_location
  @loc = current_user.loc.find_by(id: params[:id])
end