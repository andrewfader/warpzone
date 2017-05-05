class AddToVideo < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :tags, :string
    add_column :videos, :votes, :integer
  end
end
