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

  def upvote
    self.votes= 1
    redirect_to videos_path
  end

  def downvote
    self.votes= -1
    redirect_to videos_path
  end

  private

  def votes= votes
    video.votes ||= 0
    video.votes = video.votes + votes
    video.save
  end

  def video
    @video ||= Video.find(params[:video_id])
  end
end


