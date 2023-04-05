class CreateDoodzs < ActiveRecord::Migration[7.0]
  def change
    create_table :doodzs do |t|
      t.string :first_name
      t.string :last_name
      t.string :string
      t.string :email
      t.string :phone
      t.string :EBaby_Twitter

      t.timestamps
    end
  end
end
