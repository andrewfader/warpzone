class CommentsController < ApplicationController
  def create
    user_id = current_user.id
    video.comments.create(comment_params)
    redirect_to videos_path
  end

  def comment_params
    params.require(:comment).permit(:text, :video_id)
  end

  def video
    @video ||= Video.find(comment_params[:video_id])
  end
end
