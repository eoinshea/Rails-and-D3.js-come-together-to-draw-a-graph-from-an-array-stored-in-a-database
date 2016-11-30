require 'rubygems'
require 'zip'
class FramesController < ApplicationController
  before_action :set_frame, only: [:show, :edit, :update, :destroy]
  before_action :set_coreset,  only: [:new]
  respond_to :html

  def index
    @frames = Frame.all
    respond_with(@frames)
  end

  def show
    respond_with(@frame)
  end

  def new
    @frame = Frame.new
    respond_with(@frame,@coreset)
  end

  def edit
  end

  def create
    @frame = Frame.new(frame_params)
    @frame.save
    respond_with(@frame)
  end

  def update
    @frame.update(frame_params)
    respond_with(@frame)
  end

  def destroy
    @frame.destroy
    respond_with(@frame)
  end

  def upload_old
    @logger = Logger.new('log/zipper.log')

    Zip::File.open(params[:zip_file].path) do |zip_file|
      # Handle entries one by one
      zip_file.each do |entry|
        # Extract to file/directory/symlink
        entry.extract(dest_file)

        # Read into memory
        content = entry.get_input_stream.read
      end

      # Find specific entry
      entry = zip_file.glob('*.csv').first
      puts entry.get_input_stream.read
    end
  end


  def new_upload
    @frame = Frame.new
    respond_with(@frame,@coreset)
  end

  #Fix me for param POST #works with images no folders
  # def upload
  #   @logger = Logger.new('log/zipper.log')
  #
  #   #@coreset = Coreset.find(frame_params[:coreset_id])
  #   Zip::File.open(params[:zip_file].path) do |zipfile|
  #     zipfile.each do |file|
  #       tempfile = Tempfile.new(File.basename(file.name))
  #       tempfile.binmode
  #       tempfile.write file.get_input_stream.read
  #
  #
  #       @logger.info "Extracting"  + zipfile.to_s
  #
  #
  #       # to save original file name to model, use image_file_name
  #       frame = Frame.create!(image: tempfile, image_file_name: file.name)
  #
  #
  #       @logger.info "FileName = "  + file.name.to_s
  #
  #
  #       #@coreset.frames << frame
  #       tempfile.close
  #     end
  #   end
  #   redirect_to coresets_path
  # end


  #Fix me for param POST #works with images no folders
  def upload
    @logger = Logger.new('log/zipper.log')

    @coreset = Coreset.find(params[:coreset_id])
    Zip::File.open(params[:zip_file].path) { |zip_file|
      zip_file.each { |f|
        @logger.debug "zip file = " + zip_file.to_s
        f_path=File.join( 'public/frames/' + @coreset.name.downcase + "s", f.name) #TODO fix for all models
        @logger.debug "create_photos" + f_path.to_s
        FileUtils.mkdir_p(File.dirname(f_path))
        @logger.debug "create_images"
        thing = zip_file.extract(f, f_path) unless File.exist?(f_path)
        @logger.debug thing.to_s

        # frame = Frame.create(image: tempfile, image_file_name: tempfile)
        # frame.node = node_id
        # frame.frame = frame.image_file_name.chomp('.jpg').to_i
        # frame.save
        # @logger.info "Frame = " + frame.frame.to_s
        # @coreset.frames << frame
        frame  = Frame.create
        frame.node_id = f_path.chomp('.jpg').to_i
        logger.info "File name = " + f.to_s
        frame.frames_id = f.name.chomp('/').to_i
        logger.info "Frame_id = " +  frame.frames_id.to_s
        frame.save
        @coreset.frames << frame
      }}
    #    p.close
    #    FileUtils.remove_file(filename)
    # # end
    #  #delete zip file
    #  @logger.debug "closing/deleting zip file #{zip.path}"
    #  zip.close
    #  FileUtils.remove_file(zip.path)
    #  @logger.debug "saving the event to database"
    #  @logger.debug "create_photos_from_zip <--"
    #end
    redirect_to coresets_path
  end



  private
  def set_frame
    @frame = Frame.find(params[:id])
  end

  def set_coreset
    @coreset = Coreset.find(params[:coreset_id])
  end

  def frame_params
    params[:frame , :image , :image_file_name, :coreset_id ]
  end
end
