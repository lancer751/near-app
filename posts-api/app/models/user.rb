class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email, :username

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  def as_json(opts = {})
    super(opts.merge(only: [:id, :name, :role, :username, :profile_image_url, :email]))
  end
end
