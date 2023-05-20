class AddLocIdToMarkerImages < ActiveRecord::Migration[7.0]
  def change
    add_column :marker_images, :loc_id, :integer
    
  end
end
