import CommentsContainerView from '../view/comments-container-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {sortComments} from '../utils/popup.js';
import {remove, render} from '../framework/render.js';

import {
  UpdateType,
  UserAction
} from '../const.js';

const USER_NAME = 'Dima Samoshkin';

export default class CommentsPresenter {
  #changeData = null;
  #sortedComments = null;
  #commentComponent = null;
  #commentsContainerComponent = null;
  #commentsModel = null;
  #film = null;
  #newCommentComponent = null;


  constructor (film, commentsModel, changeData) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = async (container) => {
    if (this.#commentsContainerComponent) {
      remove(this.#newCommentComponent);
      remove(this.#commentsContainerComponent);
      document.removeEventListener('keydown', this.#newCommentComponent.addCommentShortcutHandler);
    }

    this.#commentsContainerComponent = new CommentsContainerView(this.#film.comments.length);
    this.#newCommentComponent = new NewCommentView();
    await this.#commentsModel.init(this.#film.id);
    this.#sortedComments = sortComments(this.#commentsModel);
    this.#renderComponent(container);
  };

  #renderComponent = (container) => {
    render(this.#commentsContainerComponent, container);
    this.#renderComments();
    this.#newCommentComponent.setAddCommentShortcutHandler(this.#handleAddComment);
    render(this.#newCommentComponent, this.#commentsContainerComponent.commentsWrap);
  };


  #renderComments = () => {
    for (const currentComment of this.#sortedComments) {
      this.#commentComponent = new CommentView(currentComment);
      this.#commentComponent.setDeleteCommentClickHandler(this.#handleDeleteComment);
      render(this.#commentComponent, this.#commentsContainerComponent.commentsList);
    }
  };

  #handleAddComment = (comment) => {
    const changededFilm = {...this.#film};
    const currentDate = new Date();

    const updatedComment = {
      ...comment,
      author: USER_NAME,
      date: currentDate
    };

    this.#commentsModel.addComment(updatedComment);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      changededFilm
    );
  };

  #handleDeleteComment = (currentCommentID) => {
    const changededFilm = {...this.#film};
    const commentIndex = changededFilm.comments.indexOf(currentCommentID);

    if (commentIndex !== -1) {
      changededFilm.comments.splice(commentIndex, 1);
    }

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      changededFilm
    );
    // this.#commentsModel.deleteComment(currentCommentID);
  };

  get addNewCommentKeydownCallback() {
    return this.#newCommentComponent.addCommentShortcutHandler;
  }
}
