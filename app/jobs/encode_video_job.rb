class EncodeVideoJob < ApplicationJob
  queue_as :default

  def perform(video)
    webm = video.file.file.file
    movie = FFMPEG::Movie.new(webm)
    if movie.valid?
      filename = "#{video.id}_1.gif"
      video.filepath = filename
      gif = "#{Rails.root.join("public/uploads/video/file/#{video.id}/#{filename}")}"
      palette = "/tmp/palette.png"
      filters = "fps=15,scale=320:-1:flags=lanczos"
      command = "ffmpeg -v warning -i #{webm} -vf \"#{filters},palettegen\" -y #{palette}"
      command2= "ffmpeg -v warning -i #{webm} -t 00:00:05 -i #{palette} -lavfi \"#{filters} [x]; [x][1:v] paletteuse\" -y #{gif}"

      puts command
      puts Open3.popen3(command)
      sleep 4
      puts command2
      puts Open3.popen3(command2)
      sleep 4
      video.save
    end
  end
end
