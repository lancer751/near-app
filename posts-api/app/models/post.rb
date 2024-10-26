class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates_uniqueness_of :title
  
  # Relación many-to-many con tags a través de post_tags
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments

   # Método para obtener información del autor
   def author_info
    {
      id: user.id,
      username: user.username,
      name: user.name,
      profile_image_url: user.profile_image_url
    }
  end

  # Método para estructurar los comentarios con la información del autor
  def serialized_comments
    comments.includes(:user).map do |comment|
      {
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.user.id,
          name: comment.user.name,
          username: comment.user.username,
          profile_image_url: comment.user.profile_image_url
        },
        created_at: comment.created_at
      }
    end
  end

  def tag_names
    tags.pluck(:name) # Devuelve un arreglo con solo los nombres de los tags
  end
end
