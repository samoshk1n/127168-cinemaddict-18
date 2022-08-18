import {generateComment} from '../mock/comment.js';
import {NUMBER_OF_COMMENTS} from '../const.js';


export default class CommentsModel {
  comments = Array.from({length: NUMBER_OF_COMMENTS}, (_value, index) => generateComment(index + 1));

  getComments = () => this.comments;
}
