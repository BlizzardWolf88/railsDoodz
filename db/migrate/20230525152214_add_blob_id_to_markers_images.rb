class AddBlobIdToMarkersImages < ActiveRecord::Migration[7.0]
  def change
    add_column :marker_images, :blob_id, :bigint
    add_foreign_key :marker_images, :active_storage_blobs, column: :blob_id
  end
end
