class DropPolytableForGood < ActiveRecord::Migration[7.0]
  def change
    drop_table :polylines if table_exists?(:polylines)
  end
end
