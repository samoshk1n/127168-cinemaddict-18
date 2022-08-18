import FilmDetailsContainerView from '../view/film-details-container-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmCommentsView from '../view/film-comments-view.js';
import CommentsListView from '../view/comments-list-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {render} from '../render.js';

export default class PopupPresenter {
  filmDetailsContainer = new FilmDetailsContainerView();
  commentsListView = new CommentsListView();

  init = (popupContainer, filmsModel, commentsModel) => {
    this.popupContainer = popupContainer;
    this.filmsModel = filmsModel;
    this.filmInformation = this.filmsModel.getFilms()[0]; // Передадим в попап информацию о первом фильме
    this.filmCommentsInformation = this.filmInformation.comments;
    this.commentsModel = commentsModel;
    this.commentsContent = commentsModel.getComments();

    this.filmCommentsView = new FilmCommentsView(this.filmCommentsInformation.length);

    const bodyElement = document.querySelector('body');
    const innerContainer = this.filmDetailsContainer.getElement().querySelector('.film-details__inner');
    const commentsWrap = this.filmCommentsView.getElement().querySelector('.film-details__comments-wrap');

    bodyElement.classList.add('hide-overflow');

    render(this.filmDetailsContainer, this.popupContainer);
    render(new FilmDetailsView(this.filmInformation), innerContainer);
    render(this.filmCommentsView, innerContainer);
    render(this.commentsListView, innerContainer);

    for (const filmCommentId of this.filmCommentsInformation) {
      const currentComment = this.commentsContent[filmCommentId];
      render(new CommentView(currentComment), commentsWrap);
    }

    render(new NewCommentView(), commentsWrap);
  };
}
