import CommentView from '../view/comment-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import NewCommentView from '../view/new-comment-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../framework/render.js';
import {
  toggleHideOverflow,
  prepareComments
} from '../utils/popup.js';

export default class PopupPresenter {
  #collectedComments = null;
  #commentComponent = null;
  #commentsModel = null;
  #filmDetailsComponent = null;
  #filmDetailsControlsComponent = null;
  #popupContainer = null;
  #popupComponent = null;

  #newCommentComponent = new NewCommentView();

  constructor (popupContainer, commentsModel) {
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    toggleHideOverflow();
    this.#preparePopup(film);
    this.#initListesers();
    this.#renderPopup();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  #preparePopup = (film) => {
    this.#collectedComments = prepareComments(film.comments, this.#commentsModel);
    this.#popupComponent = new PopupView(film.comments.length);
    this.#filmDetailsComponent = new FilmDetailsView(film);
    this.#filmDetailsControlsComponent = new FilmDetailsControlsView(film);
    this.#filmDetailsControlsComponent.updateControlsButton();
  };

  #renderPopup = () => {
    render(this.#popupComponent, this.#popupContainer);
    render(this.#filmDetailsComponent, this.#popupComponent.topContainer);
    render(this.#filmDetailsControlsComponent, this.#popupComponent.topContainer);
    this.#renderComments();
    render(this.#newCommentComponent, this.#popupComponent.commentsWrap);
  };

  #renderComments = () => {
    for (const currentComment of this.#collectedComments) {
      this.#commentComponent = new CommentView(currentComment);
      render(this.#commentComponent, this.#popupComponent.commentsList);
    }
  };

  #initListesers = () => {
    this.#popupComponent.setCloseButtonHandler(() => this.closePopup());
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  closePopup = () => {
    this.#popupComponent.element.remove();
    this.#popupComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
    toggleHideOverflow();
  };

  get popupComponent() {
    return this.#popupComponent;
  }
}
