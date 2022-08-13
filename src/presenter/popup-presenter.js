import FilmDetailsContainerView from '../view/film-details-container-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmCommentsView from '../view/film-comments-view.js';
import CommentsListView from '../view/comments-list-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {render} from '../render.js';

const NUMBER_OF_COMMENTS = 4;

export default class PopupPresenter {
  filmDetailsContainer = new FilmDetailsContainerView();
  filmCommentsView = new FilmCommentsView();
  commentsListView = new CommentsListView();

  init = (popupContainer) => {
    this.popupContainer = popupContainer;
    const bodyElement = document.querySelector('body');
    const innerContainer = this.filmDetailsContainer.getElement().querySelector('.film-details__inner');
    const commentsWrap = this.filmCommentsView.getElement().querySelector('.film-details__comments-wrap');

    bodyElement.classList.add('hide-overflow');

    render(this.filmDetailsContainer, this.popupContainer);
    render(new FilmDetailsView(), innerContainer);
    render(this.filmCommentsView, innerContainer);
    render(this.commentsListView, innerContainer);

    for (let i = 0; i < NUMBER_OF_COMMENTS; i++) {
      render(new CommentView(), commentsWrap);
    }

    render(new NewCommentView(), commentsWrap);
  };
}
