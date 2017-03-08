class EncodeVideoJob < ApplicationJob
  queue_as :default

  def perform(video)
    movie = FFMPEG::Movie.new(video.file.file.file)
    if movie.valid?
      binding.pry
      filename = "#{video.id}-#{Time.now.to_i}.mp4"
      video.filepath = filename
      filename = "#{Rails.root.join("public/uploads/#{filename}")}"
      command = "ffmpeg -y -i #{movie.path} -r 30000/1001 -b:a 2M -bt 4M -vcodec libx264 -pass 1 -coder 0 -bf 0 -flags -loop -wpredp 0 -an #{filename}"
      Open3.popen3(command)
      video.save
    end
  end
end
