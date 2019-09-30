class EncodeVideoJob < ApplicationJob
  queue_as :default

  def perform(video)
    webm = video.file.file.file
    movie = FFMPEG::Movie.new(webm)
    if movie.valid?
      filename = "#{video.id}-#{Time.now.to_i}.apng"
      gif = "#{Rails.root.join("public/uploads/video/file/#{video.id}/#{filename}")}"
       command2= "ffmpeg -v warning -i #{webm} -t 00:00:05 -plays 0 -vf \"setpts=PTS-STARTPTS, crop=1200:800, hqdn3d=1.5:1.5:6:6, scale=600:400\" #{gif}"

      puts Open3.popen3("#{command2}")
      sleep 8
      video.filepath = filename
      video.save
    end
  end
end
