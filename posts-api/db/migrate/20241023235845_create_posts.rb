class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.string :image_url

      t.timestamps
    end
  end
end
