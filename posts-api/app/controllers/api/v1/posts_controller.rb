module Api
  module V1 
    class PostsController < ApplicationController
      before_action :set_post, only: %i[ show update destroy ]
      
      # skip_before_action :authenticate
      # GET /posts
      def index
        # @posts = Post.all
    
        posts = Post.includes(:user, :tags, comments: :user).all

        render json: posts.map { |post| post.as_json(
          only: [:id, :title, :created_at, :image_url],
          methods: [:author_info, :tag_names, :serialized_comments]
          ).merge(category: post.category.name)
        }

      end
    
    
      # GET /posts/1
      def show

        # render json: @post
        render json: @post.as_json(
          only: [:id, :title, :created_at, :image_url],
          methods: [:author_info, :tag_names, :serialized_comments]
        ).merge(category: @post.category.name)
      end
    
      # POST /posts
      def create
        # @post = Post.new(post_params)
    
        if post = @current_user.posts.create(post_params)
        # if @post.save
          
          if params[:tags].present?
            params[:tags].each do |tag_name|
              # Encontrar o crear el tag
              tag = Tag.find_or_create_by(name: tag_name)

              # Asociar el tag al post
              post.tags << tag unless post.tags.include?(tag)
            end
          end

          render json: post.as_json(include: { tags: { only: [:id, :name] } }), status: :created, location: api_v1_post_url(post)
         
        else
          render json: post.errors.full_messages, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /posts/1
      def update
        post = @current_user.posts.find(params[:id])

        if post.update(post_params)
          render json: post, status: :ok
        else
          render json: post.errors, status: :unprocessable_entity
        end
      end
    
      # DELETE /posts/1
      def destroy
        post = @current_user.posts.find(params[:id])
        if post.destroy
          render json: {message: "Post Eliminado Exitosamente"}, status: :ok
        else
          render json: { error: 'No se pudo eliminar el Post' }, status: :unprocessable_entity
        end

        # @post.destroy!
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_post
          @post = Post.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def post_params
          params.require(:post).permit(:title, :content, :user_id, :category_id, :image_url, :tags_names)
        end
    end
  end
end


