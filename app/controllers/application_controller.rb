class ApplicationController < ActionController::Base

    def after_sign_out_path_for (resource)
        root_path
     end


    def after_sign_in_path_for(resource)
        session[:user_return_to] || root_url
    end


end
