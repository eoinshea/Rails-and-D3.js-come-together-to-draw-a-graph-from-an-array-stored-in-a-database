require 'rubygems'
require 'zip'

class CoresetsController < ApplicationController
  before_filter :set_coreset, only: [:show, :edit, :update, :destroy ,:update]

  respond_to :html

  def index
    @coresets = Coreset.all
    respond_with(@coresets)
  end

  def example_coreset1
    render 'example_coreset1'
  end

  def example_coreset2
    render 'example_coreset2'
  end

  def example_coreset
    render 'example_coreset'
  end

  def example_coreset3
    render 'example_coreset3', layout: false
  end

  def example_coreset4
    render 'example_coreset4', layout: false
  end

  def example_coreset5
    render 'example_coreset5', layout: false
  end

  def array_into_graph
    render 'array_into_graph', layout: false
  end

  def show
    @coreset = Coreset.find(params[:id])
    respond_with(@coreset)
  end

  def new
    @coreset = Coreset.new
    respond_with(@coreset)
  end

  def edit
  end

  def create
    @coreset = Coreset.new(coreset_params)
    @logger = Logger.new('log/zipper.log')
    @logger.info @coreset.to_s

    # Zip::File.open(params[:zip_file].path) do |zipfile|
    #   zipfile.each do |file|
    #     tempfile = Tempfile.new(File.basename(file.name))
    #     tempfile.binmode
    #     tempfile.write file.get_input_stream.read
    #
    #
    #     @logger.info "Extracting"  + zipfile.to_s
    #
    #
    #     # to save original file name to model, use image_file_name
    #     frame =  Frame.create!(image: tempfile, image_file_name: file.name)
    #     @coreset.frames << frame
    #     tempfile.close
    #   end
    # end
    @coreset.save
    respond_with(@coreset)
  end

  def update
    @coreset.update(coreset_params)
    respond_with(@coreset)
  end

  def destroy
    @coreset.destroy
    respond_with(@coreset)
  end

  def upload_json
    @coreset = Coreset.new(name: hub_params[:name])

    @coreset.save
    respond_with(@coreset)
  end

  private
  def set_coreset
    @coreset = Coreset.find(params[:id])
  end

  def coreset_params
    params.require(:coreset).permit(:name, :graph_data)
  end
end
