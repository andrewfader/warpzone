class VideosController < ApplicationController
  def create
    @video = Video.create(file: video_params[:file])
    EncodeVideoJob.perform_later(@video)
    redirect_to videos_path
  end

  def index
    @videos = Video.all
  end

  def video_params
    params.require(:video).permit(:file)
  end
end
