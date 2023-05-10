class LocController < ApplicationController
  
  before_action :authenticate_user!
  before_action :store_location
  before_action :correct_dood, only:[:edit,:update,:destroy]
  
    def store_location
      session[:user_return_to] = request.fullpath
    end
  
    def index
       @locs = Loc.all
    end     
    
    

    def saveSpot
      # render "saveSpot"
      #render partial: 'saveSpot', locals: {loc: params[:loc]}, layout: false
      
      
    end


    def create
      # @madood = Madood.new(madood_params)
      @loc = current_user.loc.build(loc_params)
       respond_to do |format|
         if @loc.save
           format.html { redirect_to loc_url(@loc), notice: "Location was successfully created." }
           format.json { render :show, status: :created, location: @loc }
         else
           format.html { render :new, status: :unprocessable_entity }
           format.json { render json: @loc.errors, status: :unprocessable_entity }
         end
       end
    end
  

    def correct_dood 
      @loc = current_user.loc.find_by(id: params[:id])
      redirect_to loc_path, notice: "Can't change this Loc because you are NOT that Loc Madoo" if @loc.nil?
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_loc
      @loc = Loc.find(params[:id])
    end
    
    #Might need to refactor the loc table IDK 
    def loc_params
      params.require(:loc).permit(:name, :address, :position, :latitude, :longitude,:create_date,:created_at,:updated_at,:wind)
    end


  end