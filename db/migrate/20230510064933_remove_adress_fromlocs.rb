class RemoveAdressFromlocs < ActiveRecord::Migration[7.0]
  def change
    remove_column :locs, :address
    remove_column :locs, :position
    add_column :locs, :notes, :string
    add_column :locs, :loc_type, :string
  end
end
