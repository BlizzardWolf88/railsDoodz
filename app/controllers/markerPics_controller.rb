class MarkerpicsController < ApplicationController
#before_action :correct_loc

def show
end

def create
    # @madood = Madood.new(madood_params)
    @pics = current_user.image.build(markerPic_param)
     respond_to do |format|
       if @pics.save
         format.html { redirect_to loc_url(@pics), notice: "Location was successfully created." }
         msg = { :status => "ok", :message => "Location was successfully created." }
         format.json {  render  json: @pics }
       else
         format.html { render :new, status: :unprocessable_entity }
         format.json { render json: @pics.errors, status: :unprocessable_entity }
       end
     end
  end


def getPics
    @images = current_user.loc.image    
    render json: @images
end

# def correct_loc 
#     @loc = current_user.loc.find_by(id: params[:id])
#     redirect_to loc_path, notice: "Can't change this Loc because that is NOT your Loc Madoo" if @loc.nil?
# end

private

    def set_imag
        @image = MarkerImage.find(params[:id]) 
    end

    def markerPic_param
        params.require(:markerimage).permit(:pictures[],:loc_id) 
    end
end