import CommentsContainerView from '../view/comments-container-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {render} from '../framework/render.js';
import {prepareComments} from '../utils/popup.js';

export default class CommentsPresenter {
  #collectedComments = null;
  #commentComponent = null;
  #commentsContainerComponent = null;
  #commentsModel = null;
  #film = null;

  #newCommentComponent = new NewCommentView();

  constructor (film, commentsModel) {
    this.#film = film;
    this.#commentsModel = commentsModel;
  }

  init = (container) => {
    this.#commentsContainerComponent = new CommentsContainerView(this.#film.comments.length);
    this.#collectedComments = prepareComments(this.#film.comments, this.#commentsModel);

    this.#renderComponent(container);
  };

  #renderComponent = (container) => {
    render(this.#commentsContainerComponent, container);
    this.#renderComments();
    render(this.#newCommentComponent, this.#commentsContainerComponent.commentsWrap);
  };

  #renderComments = () => {
    for (const currentComment of this.#collectedComments) {
      this.#commentComponent = new CommentView(currentComment);
      render(this.#commentComponent, this.#commentsContainerComponent.commentsList);
    }
  };
}
