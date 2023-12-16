class AddUserIdToPolylines < ActiveRecord::Migration[7.0]
  def change
    add_reference :polylines, :user, null: false, foreign_key: true
  end
end
