class AddIndexToMarkerImages < ActiveRecord::Migration[7.0]
  def change
    add_index :marker_images, :loc_id
  end
end
