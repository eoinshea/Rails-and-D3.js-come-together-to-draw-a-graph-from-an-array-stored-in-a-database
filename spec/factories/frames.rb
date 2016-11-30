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

FactoryGirl.define do
  factory :frame do
    
  end

end
