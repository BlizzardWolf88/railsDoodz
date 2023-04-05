class CreateMadoods < ActiveRecord::Migration[7.0]
  def change
    create_table :madoods do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :EBabys_Twitter

      t.timestamps
    end
  end
end
