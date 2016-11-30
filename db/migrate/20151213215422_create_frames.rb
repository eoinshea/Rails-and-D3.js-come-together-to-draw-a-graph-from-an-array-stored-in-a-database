class CreateFrames < ActiveRecord::Migration
  def change
    create_table :frames do |t|
      t.integer  :node_id ,:integer
      t.integer  :frames_id ,:integer
      t.string  :frame_url ,:string
    end
  end
end
