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

  init = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmInformations = [...this.#filmsModel.films];

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);

    const filmsListElement = this.#filmsListComponent.element;

    for (let i = 0; i < NUMBER_OF_FILMS; i++) {
      render(new FilmCardView(this.#filmInformations[i]), filmsListElement.querySelector('.films-list__container'));
    }

    render(new ShowMoreButtonView(), filmsListElement);
  };
}
