class EncodeVideoJob < ApplicationJob
  queue_as :default

  def perform(video)
    webm = video.file.file.file
    movie = FFMPEG::Movie.new(file)
    if movie.valid?
      filename = "#{video.id}-#{Time.now.to_i}.gif"
      video.filepath = filename
      gif = "#{Rails.root.join("public/uploads/video/file/#{video.id}/#{filename}")}"
      palette = "/tmp/palette.png"
      filters = "fps=15,scale=320:-1:flags=lanczos"

      # command = "ffmpeg -y -i #{movie.path} -r 30000/1001 -b:a 2M -bt 4M -vcodec libx264 -pass 1 -coder 0 -bf 0 -flags -loop -wpredp 0 -an #{filename}"
      command = "ffmpeg -v warning -i #{webm} -vf \"#{filters},palettegen\" -y #{palette}"
      command2= "ffmpeg -v warning -i #{webm} -i #{palette} -lavfi \"#{filters} [x]; [x][1:v] paletteuse\" -y #{gif}"


      binding.pry
      Open3.popen3(command)
      binding.pry
      Open3.popen3(command2)
      binding.pry
      video.save
    end
  end
end
