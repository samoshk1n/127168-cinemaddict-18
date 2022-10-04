import {generateComment} from '../mock/comment.js';
import {NUMBER_OF_COMMENTS} from '../const.js';
import Observable from '../framework/observable.js';
import {nanoid} from 'nanoid';

const USER_NAME = 'Dima Samoshkin';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: NUMBER_OF_COMMENTS}, (_value, index) => generateComment(index));

  get comments () {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    const newComment = {
      ...update,
      id: nanoid(),
      author: USER_NAME,
      date: new Date()
    };

    this.#comments.push(newComment);

    this._notify(updateType, update);
  };

  deleteComment = (currentID) => {
    const currentComment = this.#comments.find((comment) => comment.id === currentID);
    const commentIndex = this.comments.indexOf(currentComment);

    if (commentIndex !== -1) {
      this.comments.splice(commentIndex, 1);
    }
  };
}
