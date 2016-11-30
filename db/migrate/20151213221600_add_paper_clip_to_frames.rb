class AddPaperClipToFrames < ActiveRecord::Migration
  def up
    add_attachment :frames, :image
  end

  def down
    remove_attachment :frames, :image
  end
end
