class EncodeVideoJob < ApplicationJob
  queue_as :default

  def perform(video)
    binding.pry
    movie = FFMPEG::Movie.new(video.file.file.file)
    if movie.valid?
      options = %w("-r 30000/1001 -b:a 2M -bt 4M -vcodec libx264 -pass 1 -coder 0 -bf 0 -flags -loop -wpredp 0)
      filename = "#{video.id}-#{Time.now.to_i}.mp4"
      movie.transcode(filename, options)
      video.file = filename
      video.save
    end
  end
end
