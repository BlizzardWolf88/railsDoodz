class LocsController < ApplicationController
  
  before_action :authenticate_user!
  before_action :store_location
  before_action :correct_dood, only:[:edit,:update,:destroy]

  
    def store_location
      session[:user_return_to] = request.fullpath
    end
  
    def index        
    end     
    
    def show
    end

    def new
      @loc = current_user.madood.build
    end

    def saveSpot  
      #We need to re-render save-spot HTML
      render partial: 'saveSpot'
    end

    def getMarkers
      @locs = current_user.loc    
      render json: @locs
    end


    def create
      # @madood = Madood.new(madood_params)
      @loc = current_user.loc.build(loc_params)
       respond_to do |format|
         if @loc.save
           format.html { redirect_to loc_url(@loc), notice: "Location was successfully created." }
           msg = { :status => "ok", :message => "Location was successfully created." }
           format.json {  render  json: @loc }
         else
           format.html { render :new, status: :unprocessable_entity }
           format.json { render json: @loc.errors, status: :unprocessable_entity }
         end
       end
    end

    def update
      respond_to do |format|
        if @loc.update(loc_params)
          format.html { redirect_to loc_url(@loc), notice: "Loc was successfully updated." }
          msg = { :status => "ok", :message => "Location was successfully updated." }
          format.json {  render  json: @loc }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @loc.errors, status: :unprocessable_entity }
        end
      end
    end
  
    def destroy
      @loc.destroy 
      respond_to do |format|
        format.html { redirect_to madoods_url, notice: "Loc was successfully destroyed." }
        format.json { head :no_content }
      end
    end

    def confirm_delete
      respond_to do |format|
        format.html
        format.js
      end
    end

    def correct_dood 
      @loc = current_user.loc.find_by(id: params[:id])
      redirect_to loc_path, notice: "Can't change this Loc because that is NOT your Loc Madoo" if @loc.nil?
    end

    
    private
    # Use callbacks to share common setup or constraints between actions.
    def set_loc
      @loc = Loc.find(params[:id])
    end
    
    #Might need to refactor the loc table IDK 
    def loc_params
      params.require(:loc).permit(:name, :latitude, :longitude,:create_date,:created_at,:user_id,:updated_at,:wind,:notes,:loc_type,:num_sits)
    end


  end