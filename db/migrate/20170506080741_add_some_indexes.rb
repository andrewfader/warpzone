class AddSomeIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :videos, :user_id
  end
end
