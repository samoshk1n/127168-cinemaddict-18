import FilmDetailsContainerView from '../view/film-details-container-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmCommentsView from '../view/film-comments-view.js';
import CommentsListView from '../view/comments-list-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {render} from '../render.js';

const collectComments = (filmCommentsInformation, commentsContent) => {
  const sortedComments = [];

  for (const filmCommentId of filmCommentsInformation) {
    const currentComment = commentsContent[filmCommentId];
    sortedComments.push(currentComment);
  }

  return sortedComments;
};

const prepareComments = (commentsInformation, commentsModel) => {
  const commentsContent = commentsModel.comments;
  const collectedComments = collectComments(commentsInformation, commentsContent);
  return collectedComments.sort((a, b) => a.date - b.date);
};

export default class PopupPresenter {
  #collectedComments = null;
  #filmCommentsView = null;
  #filmInformation = null;
  #filmsModel = null;
  #popupContainer = null;

  #commentsListView = new CommentsListView();
  #filmDetailsContainer = new FilmDetailsContainerView();

  init = (popupContainer, filmsModel, commentsModel) => {
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
    this.#filmInformation = this.#filmsModel.films[0]; // Передадим в попап информацию о первом фильме
    this.#collectedComments = prepareComments(this.#filmInformation.comments, commentsModel);
    this.#filmCommentsView = new FilmCommentsView(this.#filmInformation.comments.length);

    const bodyElement = document.querySelector('body');
    const innerContainer = this.#filmDetailsContainer.element.querySelector('.film-details__inner');
    const commentsWrap = this.#filmCommentsView.element.querySelector('.film-details__comments-wrap');

    bodyElement.classList.add('hide-overflow');

    render(this.#filmDetailsContainer, this.#popupContainer);
    render(new FilmDetailsView(this.#filmInformation), innerContainer);
    render(this.#filmCommentsView, innerContainer);
    render(this.#commentsListView, innerContainer);

    for (const currentComment of this.#collectedComments) {
      render(new CommentView(currentComment), commentsWrap);
    }

    render(new NewCommentView(), commentsWrap);
  };
}
