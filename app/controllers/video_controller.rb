class VideoController < ApplicationController
  def create
    @video = Video.new(file: params[:file])
  end
end
