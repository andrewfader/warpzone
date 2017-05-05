class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.belongs_to :video
      t.text :text
      t.belongs_to :user
      t.timestamps
    end
  end
end
