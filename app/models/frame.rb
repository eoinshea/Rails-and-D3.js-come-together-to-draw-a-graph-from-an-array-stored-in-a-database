# == Schema Information
#
# Table name: frames
#
#  id                 :integer          not null, primary key
#  coreset_id         :integer
#  node_id            :integer
#  integer            :integer
#  frames_id          :integer
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Frame < ActiveRecord::Base
  belongs_to :coreset


  def set_node_and_frame_num

  end

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
