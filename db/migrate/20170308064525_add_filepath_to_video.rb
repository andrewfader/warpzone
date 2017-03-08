class AddFilepathToVideo < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :filepath, :string
  end
end
