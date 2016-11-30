# == Schema Information
#
# Table name: coresets
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  graph_data :json             default([])
#  created_at :datetime
#  updated_at :datetime
#

class Coreset < ActiveRecord::Base
has_many :frames
end
