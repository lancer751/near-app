class Category < ApplicationRecord
  has_many :posts
  
  validates_uniqueness_of :name
end
