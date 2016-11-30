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

require 'rails_helper'

RSpec.describe Coreset, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
