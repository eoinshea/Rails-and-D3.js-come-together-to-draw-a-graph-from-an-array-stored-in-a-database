class CreateCoresets < ActiveRecord::Migration
  def change
    create_table :coresets do |t|
      t.string :name
      t.column :graph_data, :json
      t.timestamps
    end
    execute "ALTER TABLE coresets ALTER COLUMN graph_data SET DEFAULT '[]'::JSON"
  end
end
