import {generateComment} from '../mock/comment.js';
import {NUMBER_OF_COMMENTS} from '../const.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: NUMBER_OF_COMMENTS}, (_value, index) => generateComment(index));

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
