class Video < ApplicationRecord
  mount_uploader :file, VideoUploader
  has_many :comments
  has_many :votes
  has_many :tags
  belongs_to :user

  def value
    if votes.present?
      votes.map(&:value).sum
    else
      0
    end
  end
end
