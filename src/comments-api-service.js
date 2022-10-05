import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {
  #id = null;

  get comments() {
    return this._load({url: `comments/${this.#id}`})
      .then(ApiService.parseResponse);
  }
}
