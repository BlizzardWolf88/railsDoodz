class RenameMarkerImageTable < ActiveRecord::Migration[7.0]
  def self.up
    rename_table :marker_images, :markerimages
  end

  def self.down
    rename_table :marker_images, :markerimages
  end
end
