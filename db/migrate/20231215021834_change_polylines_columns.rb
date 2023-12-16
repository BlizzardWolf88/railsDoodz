class ChangePolylinesColumns < ActiveRecord::Migration[7.0]
  def change
    #Don't use any of this start_loc_id table is trash
    # remove_foreign_key :polylines, column: :start_loc_id
    # remove_foreign_key :polylines, column: :end_loc_id

    # rename_column :polylines, :start_loc_id, :start_latitude
    # rename_column :polylines, :end_loc_id, :end_longitude
  end
end
