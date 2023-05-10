class AddNumsitsToLocs < ActiveRecord::Migration[7.0]
  def change
    add_column :locs, :num_sits, :integer
  end
end
