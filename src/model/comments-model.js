import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  init = async (id) => {
    try {
      this.#comments = await this.#commentsApiService.getComments(id);
    } catch(err) {
      this.#comments = [];
    }
  };

  get comments () {
    return this.#comments;
  }

  addComment = async (updateType, film, comment) => {
    try {
      const {movie, comments} = await this.#commentsApiService.addComment(film, comment);
      this.#comments = comments;
      this._notify(updateType, movie, comments);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, deletedComment) => {
    const currentComment = this.#comments.find((comment) => comment.id === deletedComment.id);
    const commentIndex = this.comments.indexOf(currentComment);

    try {
      await this.#commentsApiService.deleteComment(deletedComment);
      this.comments.splice(commentIndex, 1);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}
