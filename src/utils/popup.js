import dayjs from 'dayjs';

const sortComments = (commentsModel) => {
  const commentsContent = commentsModel.comments;
  return commentsContent.sort((a, b) => dayjs(a.date) - dayjs(b.date));
};

const toggleHideOverflow = () => {
  const bodyElement = document.querySelector('body');
  bodyElement.classList.toggle('hide-overflow');
};

export {
  sortComments,
  toggleHideOverflow
};
