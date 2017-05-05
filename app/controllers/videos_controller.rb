class VideosController < ApplicationController
  def create
    @video = Video.create(video_params)
    EncodeVideoJob.perform_later(@video)
    redirect_to videos_path
  end

  def index
    @videos = Video.all
  end

  def video_params
    params.require(:video).permit(:file, :user_id, :title)
  end

  def upvote
    self.votes= 1
  end

  def downvote
    self.votes= -1
  end

  private

  def votes= votes
    if current_user
      if vote = Vote.find_by(user_id: current_user.id, video_id: video.id)
        vote.value = votes
        vote.save
      else
        Vote.create(user_id: current_user.id, video_id: video.id, value: votes)
      end
      redirect_to videos_path
    else
      redirect_to new_user_registration_path
    end
  end

  def video
    @video ||= Video.find(params[:video_id])
  end
end


