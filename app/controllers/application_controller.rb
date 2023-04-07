class ApplicationController < ActionController::Base

    def after_sign_out_path_for (resource)
        root_path
     end

     #Landing page after sign in remember convetion is /example/index becomes example_path
    def after_sign_in_path_for(resource)
        madoods_path
    end


end
