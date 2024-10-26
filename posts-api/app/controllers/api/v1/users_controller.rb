module Api
  module V1
    class UsersController < ApplicationController
      
      before_action :set_user, only: %i[ show update destroy ]
      skip_before_action :authenticate
    
    
      # GET /users
      def index
        # @users = User.all
        users = User.left_joins(:posts).distinct  # INNER JOIN para asegurarnos de obtener solo usuarios con posts y evitar duplicados
        
        render json: users.as_json(
          only: [:id, :name, :email],    # Especifica los atributos del usuario
          include: {
            posts: {
              only: [:id, :title, :content, :created_at, :image_url, :category_id]  # Atributos de los posts
            }
          }
        ), status: :ok
        
        # posts = @users.posts
    
        # render json: @users
      end
    
    
      # GET /users/1
      def show
        user = User.left_joins(:posts).find(params[:id])  # LEFT JOIN para incluir usuarios sin posts

        # Responder con los datos del usuario y sus posts
        render json: user.to_json(
          only: [:id, :name, :email],
          include: {
            posts: {
              only: [:id, :title, :content, :created_at]
            }
          }
        ), status: :ok
        # render json: @user
      end
    
      # POST /users
      def create
        @user = User.new(user_params)
    
        if @user.save
          render json: @user.as_json, status: :created, location: api_v1_user_url(@user)
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /users/1
      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
    
      # DELETE /users/1
      def destroy
        if @user.destroy
          render json: { message: 'Usuario eliminado exitosamente' }, status: :ok
        else
          render json: { error: 'No se pudo eliminar el usuario' }, status: :unprocessable_entity
        end
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
          @user = User.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def user_params
          params.require(:user).permit(:name, :email, :password, :role, :username)
        end
    end
    
  end
end
