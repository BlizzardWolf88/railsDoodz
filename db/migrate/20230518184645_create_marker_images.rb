class CreateMarkerImages < ActiveRecord::Migration[7.0]
  def change
    create_table :marker_images do |t|
      t.string :name
      t.string :record_type
      t.bigint:record_id
      t.timestamps 
      
    end
  end
end
