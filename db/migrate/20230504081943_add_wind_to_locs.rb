class AddWindToLocs < ActiveRecord::Migration[7.0]
  def change
    add_column :locs, :wind, :string
  end
end
