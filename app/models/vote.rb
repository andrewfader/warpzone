class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :video

  def value
    super || 0
  end
end
