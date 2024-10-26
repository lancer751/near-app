class Tag < ApplicationRecord
  validates_uniqueness_of :name

  # Relación many-to-many con posts a través de post_tags
  has_many :post_tags, dependent: :destroy
  has_many :posts, through: :post_tags

  def as_json(opts = {})
    super(opts.merge(only: [:id, :name]))
  end
end
