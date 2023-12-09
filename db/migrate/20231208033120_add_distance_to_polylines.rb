class AddDistanceToPolylines < ActiveRecord::Migration[7.0]
  def change
    add_column :polylines, :distance, :float
  end
end
