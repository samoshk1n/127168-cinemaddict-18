import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());

    const filmsListElement = this.filmsListComponent.getElement();

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), filmsListElement.querySelector('.films-list__container'));
    }

    render(new ShowMoreButtonView(), filmsListElement);
  };
}
