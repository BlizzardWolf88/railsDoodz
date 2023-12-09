class CreatePolylines < ActiveRecord::Migration[7.0]
  def change
    create_table :polylines do |t|
      t.references :start_loc, null: false, foreign_key: true
      t.references :end_loc, null: false, foreign_key: true

      t.timestamps
    end
  end
end
