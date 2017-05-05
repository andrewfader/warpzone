class CommentsController < ApplicationController
  def create
    if current_user
      video.comments.create(comment_params.merge(user_id: current_user.id))
    else
      redirect_to new_user_registration_path
    end

    redirect_to videos_path
  end

  def comment_params
    params.require(:comment).permit(:text, :video_id)
  end

  def video
    @video ||= Video.find(comment_params[:video_id])
  end
end
