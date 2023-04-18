class CreateLocs < ActiveRecord::Migration[7.0]
  def change
    create_table :locs do |t|
      t.string :name
      t.string :address
      t.integer :position 
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.date :create_date

      t.timestamps
    end
  end
end
