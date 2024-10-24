class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email, :username

  def as_json(opts = {})
    super(opts.merge(only: [:id, :name, :role, :username]))
  end
end
