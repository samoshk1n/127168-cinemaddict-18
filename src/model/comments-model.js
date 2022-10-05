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

  addComment = (newComment) => {
    this.#comments.push(newComment);
  };

  deleteComment = (currentID) => {
    const currentComment = this.#comments.find((comment) => comment.id === currentID);
    const commentIndex = this.comments.indexOf(currentComment);

    if (commentIndex !== -1) {
      this.comments.splice(commentIndex, 1);
    }
  };
}
