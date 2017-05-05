class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.belongs_to :video
      t.string :value
      t.timestamps
    end

    remove_column :videos, :tags, :string
    add_column :videos, :user_id, :integer
    add_column :videos, :title, :string
  end
end
