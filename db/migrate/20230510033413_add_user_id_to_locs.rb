class AddUserIdToLocs < ActiveRecord::Migration[7.0]
  def change
    add_column :locs, :user_id, :integer
  end
end
