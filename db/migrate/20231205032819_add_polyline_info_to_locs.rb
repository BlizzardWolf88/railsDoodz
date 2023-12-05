class AddPolylineInfoToLocs < ActiveRecord::Migration[7.0]
  def change
    add_column :locs, :polyline_info, :text
  end
end
