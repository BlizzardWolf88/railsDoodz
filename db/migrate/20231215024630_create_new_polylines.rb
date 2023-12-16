class CreateNewPolylines < ActiveRecord::Migration[7.0]
  def change
    drop_table :polylines if table_exists?(:polylines)

    create_table :polylines do |t|
      t.decimal "start_latitude", precision: 10, scale: 6, null: false
      t.decimal "start_longitude", precision: 10, scale: 6, null: false
      t.decimal "end_latitude", precision: 10, scale: 6, null: false
      t.decimal "end_longitude", precision: 10, scale: 6, null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.float "distance"
    end
  end
end
