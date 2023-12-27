class RemovePolylineInfoFromLocs < ActiveRecord::Migration[7.0]
  def up
    remove_column :locs, :polyline_info
  end

  def down
    add_column :locs, :polyline_info, :text
  end
end