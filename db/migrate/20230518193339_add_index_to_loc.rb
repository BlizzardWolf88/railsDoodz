class AddIndexToLoc < ActiveRecord::Migration[7.0]
  def change
    add_index :locs, :user_id
    #Ex:- add_index("admin_users", "username")
  end
end
