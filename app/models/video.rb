class Video < ApplicationRecord
  mount_uploader :file, VideoUploader
  has_many :comments

  def votes
    super || 0
  end
end
