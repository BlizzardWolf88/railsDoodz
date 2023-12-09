class MadoodsController < ApplicationController
  before_action :set_madood, only: %i[ show edit update destroy ]
  before_action :authenticate_user!,except:[:index,:show]
  before_action :correct_dood, only:[:edit,:update,:destroy]

  # GET /madoods or /madoods.json
  def index
    @madoods = Madood.all
  end

  # GET /madoods/1 or /madoods/1.json
  def show
  end

  # GET /madoods/new
  def new
    @madood = current_user.madood.build
  end

  # GET /madoods/1/edit
  def edit
  end

  # POST /madoods or /madoods.json
  def create
   # @madood = Madood.new(madood_params)
   @madood = current_user.madood.build(madood_params)
    respond_to do |format|
      if @madood.save
        format.html { redirect_to madood_url(@madood), notice: "Madood was successfully created." }
        format.json { render :show, status: :created, location: @madood }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @madood.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /madoods/1 or /madoods/1.json
  def update
    respond_to do |format|
      if @madood.update(madood_params)
        format.html { redirect_to madood_url(@madood), notice: "Madood was successfully updated." }
        format.json { render :show, status: :ok, location: @madood }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @madood.errors, status: :unprocessable_entity }
      end
    end
  end


  def correct_dood 
   @madood = current_user.madood.find_by(id: params[:id])
   redirect_to madood_path, notice: "Can't change this friend because you are NOT that freinds with " if @madood.nil?
  end


  # DELETE /madoods/1 or /madoods/1.json
  def destroy
    @madood.destroy

    respond_to do |format|
      format.html { redirect_to madoods_url, notice: "Madood was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def confirm_delete
    respond_to do |format|
      format.html
      format.js
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_madood
      @madood = Madood.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def madood_params
      params.require(:madood).permit(:first_name, :last_name, :email, :phone, :EBabys_Twitter,:user_id)
    end
end
