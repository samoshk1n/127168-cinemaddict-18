import CommentsContainerView from '../view/comments-container-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {remove, render} from '../framework/render.js';
import {prepareComments} from '../utils/popup.js';

import {
  UPDATE_TYPE,
  USER_ACTION
} from '../const.js';

export default class CommentsPresenter {
  #changeData = null;
  #collectedComments = null;
  #commentComponent = null;
  #commentsContainerComponent = null;
  #commentsModel = null;
  #film = null;

  #newCommentComponent = new NewCommentView();

  constructor (film, commentsModel, changeData) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = (container) => {
    if (this.#commentsContainerComponent) {
      remove(this.#commentsContainerComponent);
    }

    this.#commentsContainerComponent = new CommentsContainerView(this.#film.comments.length);
    this.#collectedComments = prepareComments(this.#film.comments, this.#commentsModel);

    this.#renderComponent(container);
  };

  #renderComponent = (container) => {
    render(this.#commentsContainerComponent, container);
    this.#renderComments();
    this.#newCommentComponent.setAddCommentShortcutHandler(this.#foo);
    render(this.#newCommentComponent, this.#commentsContainerComponent.commentsWrap);
  };

  #foo = () => {
    console.log('Ку');
  };

  #renderComments = () => {
    for (const currentComment of this.#collectedComments) {
      this.#commentComponent = new CommentView(currentComment);
      this.#commentComponent.setDeleteCommentClickHandler(this.#handleDeleteComment);
      render(this.#commentComponent, this.#commentsContainerComponent.commentsList);
    }
  };

  #handleDeleteComment = (currentCommentID) => {
    const changededFilm = {...this.#film};
    const commentIndex = changededFilm.comments.indexOf(currentCommentID);

    if (commentIndex !== -1) {
      changededFilm.comments.splice(commentIndex, 1);
    }

    this.#changeData(
      USER_ACTION.DELETE_COMMENT,
      UPDATE_TYPE.PATCH,
      changededFilm
    );
    // this.#commentsModel.deleteComment(currentCommentID);
  };

  get addNewCommentKeydownCallback() {
    return this.#newCommentComponent.addCommentShortcutHandler;
  }
}
