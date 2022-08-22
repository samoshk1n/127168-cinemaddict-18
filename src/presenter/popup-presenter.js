import CommentView from '../view/comment-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import NewCommentView from '../view/new-comment-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../render.js';
import {hideOverflow} from '../utils.js';

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
  #commentComponent = null;
  #commentsModel = null;
  #filmDetailsComponent = null;
  #filmInformation = null;
  #filmsModel = null;
  #popupContainer = null;
  #popupComponent = null;

  #filmDetailsControlsComponent = new FilmDetailsControlsView();
  #newCommentComponent = new NewCommentView();

  constructor (popupContainer, filmsModel, commentsModel) {
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmInformation = this.#filmsModel.films[0]; // Передадим в попап информацию о первом фильме
    this.#collectedComments = prepareComments(this.#filmInformation.comments, this.#commentsModel);
    this.#popupComponent = new PopupView(this.#filmInformation.comments.length);
    this.#filmDetailsComponent = new FilmDetailsView(this.#filmInformation);

    hideOverflow();

    render(this.#popupComponent, this.#popupContainer);
    render(this.#filmDetailsComponent, this.#popupComponent.topContainer);
    render(this.#filmDetailsControlsComponent, this.#popupComponent.topContainer);

    for (const currentComment of this.#collectedComments) {
      this.#commentComponent = new CommentView(currentComment);
      render(this.#commentComponent, this.#popupComponent.commentsList);
    }

    render(this.#newCommentComponent, this.#popupComponent.commentsWrap);
  };
}
