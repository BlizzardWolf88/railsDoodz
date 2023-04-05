class AddUserIdToMadoods < ActiveRecord::Migration[7.0]
  def change
    add_column :madoods, :user_id, :integer
    add_index :madoods, :user_id
  end
end
