import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

const NUMBER_OF_FILMS = 5;

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();

  init = (filmsContainer, filmsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.filmInformations = [...this.filmsModel.getFilms()];

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());

    const filmsListElement = this.filmsListComponent.getElement();

    for (let i = 0; i < NUMBER_OF_FILMS; i++) {
      render(new FilmCardView(this.filmInformations[i]), filmsListElement.querySelector('.films-list__container'));
    }

    render(new ShowMoreButtonView(), filmsListElement);
  };
}
