class CommentsController < ApplicationController
  def create
    user_id = current_user.try(:id) || request.ip
    video.comments.create(comment_params.merge(user_id: user_id))
    redirect_to videos_path
  end

  def comment_params
    params.require(:comment).permit(:text, :video_id)
  end

  def video
    @video ||= Video.find(comment_params[:video_id])
  end
end
