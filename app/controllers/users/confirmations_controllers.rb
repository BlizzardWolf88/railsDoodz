class ConfirmationsController < Devise::ConfirmationsController
  #ATTTTENNNNNNTION!!!!!!!!!!!!! This controller is not being invoked right now 
  # The standard Devise confirmation controller will route the newly confirmed user
  # To the Sign in Page where they can enter the site.
  # This will be save for later 
  
  # # GET /resource/confirmation/new
  # def new
  #   self.resource = resource_class.new
  # end

  # # POST /resource/confirmation
  # def create
  #   self.resource = resource_class.send_confirmation_instructions(resource_params)
  #   yield resource if block_given?

  #   if successfully_sent?(resource)
  #     respond_with({}, location: after_resending_confirmation_instructions_path_for(resource_name))
  #   else
  #     respond_with(resource)
  #   end
  # end

  # # GET /resource/confirmation?confirmation_token=abcdef
  # def show
  #   self.resource = resource_class.confirm_by_token(params[:confirmation_token])
  #   yield resource if block_given?

  #   if resource.errors.empty?
  #     # set_flash_message!(:notice, :confirmed)
  #     # respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
  #     set_flash_message(:notice, :confirmed) if is_navigational_format?
  #     sign_in(resource_name, resource)
  #     respond_with_navigational(resource){ madoods_path }
  #   else
  #     # TODO: use `error_status` when the default changes to `:unprocessable_entity`.
  #     respond_with_navigational(resource.errors, status: :unprocessable_entity){ render :new }
  #   end
  # end

  # protected

  #   # The path used after resending confirmation instructions.
  #   def after_resending_confirmation_instructions_path_for(resource_name)
  #     is_navigational_format? ? new_session_path(resource_name) : '/'
  #   end

  #   # The path used after confirmation.
  #   def after_confirmation_path_for(resource_name, resource)
  #     if signed_in?(resource_name)
  #       madoods_path
  #     else
  #       madoods_path
  #     end
  #   end

  #   def translation_scope
  #     'devise.confirmations'
  #   end
  
  end