class DropPolylinesTable < ActiveRecord::Migration[7.0]
  def change
     #Don't use any of this start_loc_id table is trash
     
    #  # Drop foreign keys and indexes related to start_loc_id and end_loc_id
    #  remove_foreign_key :polylines, column: :start_loc_id
    #  remove_index :polylines, name: "index_polylines_on_start_loc_id"
 
    #  remove_foreign_key :polylines, column: :end_loc_id
    #  remove_index :polylines, name: "index_polylines_on_end_loc_id"
 
    #  # Rename columns
    #  rename_column :polylines, :start_loc_id, :start_latitude
    #  rename_column :polylines, :end_loc_id, :end_latitude

  end
end
