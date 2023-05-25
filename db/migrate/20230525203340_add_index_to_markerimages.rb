class AddIndexToMarkerimages < ActiveRecord::Migration[7.0]
  def change
    add_index :markerimages, :blob_id
  end
end
