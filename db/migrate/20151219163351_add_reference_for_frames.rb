class AddReferenceForFrames < ActiveRecord::Migration
  def change
    add_reference :frames, :coresets, index: true, foreign_key: true
  end
end
