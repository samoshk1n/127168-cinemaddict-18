import ApiService from '../framework/api-service.js';
import {HttpMethod} from '../const.js';

export default class CommentsApiService extends ApiService {
  getComments = async (film) => this._load({url: `comments/${film.id}`}).then(ApiService.parseResponse);

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: HttpMethod.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: HttpMethod.DELETE,
    });

    return response;
  };
}
