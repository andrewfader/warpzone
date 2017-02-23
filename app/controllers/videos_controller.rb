class VideosController < ApplicationController
  def create
    binding.pry
    @video = Video.create(file: params[:file])
    redirect_to videos_path
  end

  def index
    @videos = Video.all
  end
end
