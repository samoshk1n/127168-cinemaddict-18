import CommentView from '../view/comment-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import NewCommentView from '../view/new-comment-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../render.js';
import {ID_GAP} from '../const.js';
import {
  toggleHideOverflow,
  prepareComments
} from '../utils.js';

export default class PopupPresenter {
  #closeButtonElement = null;
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

  init = (id) => {
    this.#filmInformation = this.#filmsModel.films[id - ID_GAP];
    this.#collectedComments = prepareComments(this.#filmInformation.comments, this.#commentsModel);
    this.#popupComponent = new PopupView(this.#filmInformation.comments.length);
    this.#filmDetailsComponent = new FilmDetailsView(this.#filmInformation);
    this.#closeButtonElement = this.#popupComponent.closeButtonElement;

    toggleHideOverflow();
    this.initListesers();

    render(this.#popupComponent, this.#popupContainer);
    render(this.#filmDetailsComponent, this.#popupComponent.topContainer);
    render(this.#filmDetailsControlsComponent, this.#popupComponent.topContainer);

    for (const currentComment of this.#collectedComments) {
      this.#commentComponent = new CommentView(currentComment);
      render(this.#commentComponent, this.#popupComponent.commentsList);
    }

    render(this.#newCommentComponent, this.#popupComponent.commentsWrap);
  };

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  closePopup = () => {
    this.#popupComponent.element.remove();
    this.#popupComponent.removeElement();
    document.removeEventListener('keydown', this.onEscKeyDown);
    toggleHideOverflow();
  };

  initListesers = () => {
    this.#closeButtonElement.addEventListener('click', () => {
      this.closePopup();
    });
    document.addEventListener('keydown', this.onEscKeyDown);
  };

  get popupComponent() {
    return this.#popupComponent;
  }
}
