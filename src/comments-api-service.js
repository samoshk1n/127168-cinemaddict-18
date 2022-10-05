import ApiService from './framework/api-service.js';
import {HTTP_METHOD} from './const.js';

export default class CommentsApiService extends ApiService {
  getComments = async (filmID) => this._load({url: `comments/${filmID}`}).then(ApiService.parseResponse);

  addComment = async (filmID, comment) => {
    const response = await this._load({
      url: `comments/${filmID}`,
      method: HTTP_METHOD.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (commentID) => {
    const response = await this._load({
      url: `comments/${commentID}`,
      method: HTTP_METHOD.DELETE,
    });

    return response;
  };
}
