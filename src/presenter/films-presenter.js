import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';
import {NUMBER_OF_FILMS} from '../const.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();

  #filmInformations = [];

  constructor (filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#filmInformations = [...this.#filmsModel.films];

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);

    for (let i = 0; i < NUMBER_OF_FILMS; i++) {
      this.#renderFilm(this.#filmInformations[i]);
    }

    render(new ShowMoreButtonView(), this.filmsListElementContainer);
  };

  #renderFilm = (filmInformation) => {
    const filmComponent = new FilmCardView(filmInformation);

    render (filmComponent, this.filmsListElementContainer);
  };

  get filmsListElementContainer () {
    const filmsListElement = this.#filmsListComponent.element;

    return filmsListElement.querySelector('.films-list__container');
  }
}
