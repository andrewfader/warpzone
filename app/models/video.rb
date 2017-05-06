class Video < ApplicationRecord
  mount_uploader :file, VideoUploader
  has_many :comments, dependent: :destroy
  has_many :votes, dependent: :destroy
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
