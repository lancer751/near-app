class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates_uniqueness_of :title
  
  # Relación many-to-many con tags a través de post_tags
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments
end
