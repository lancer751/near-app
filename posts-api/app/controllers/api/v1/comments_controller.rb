module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_comment, only: %i[ show update destroy ]


      # GET /comments
      def index
        @comments = Comment.all

        render json: @comments
      end

      # GET /comments/1
      def show
        render json: @comment
      end

      # skip_before_action :authenticate

      # POST /comments
      def create
        # @comment = Comment.new(comment_params)
        # comment = @current_user.comments.create(comment_params)

        # if @comment.save
        if comment = @current_user.comments.create(comment_params)
          # render json: @comment, status: :created, location: api_v1_comment_url(@comment)
          render json: comment.as_json
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /comments/1
      def update
        comment = @current_user.comments.find(params[:id])

        if comment.update(comment_params)
          render json: comment, status: :ok
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # DELETE /comments/1
      def destroy
        # @comment.destroy!

        comment = @current_user.comments.find(params[:id])
        if comment.destroy
          render json: {message: "Commentario Eliminado Exitosamente"}, status: :ok
        else
          render json: { error: 'No se pudo eliminar el Commentario' }, status: :unprocessable_entity
        end

      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_comment
          @comment = Comment.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def comment_params
          params.require(:comment).permit(:content, :post_id)
        end
    end
  end
end


