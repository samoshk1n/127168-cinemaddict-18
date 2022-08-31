const collectComments = (filmCommentsInformation, commentsContent) => {
  const sortedComments = [];

  for (const filmCommentId of filmCommentsInformation) {
    const currentComment = commentsContent[filmCommentId];
    sortedComments.push(currentComment);
  }

  return sortedComments;
};

const prepareComments = (commentsInformation, commentsModel) => {
  const commentsContent = commentsModel.comments;
  const collectedComments = collectComments(commentsInformation, commentsContent);
  return collectedComments.sort((a, b) => a.date - b.date);
};

const toggleHideOverflow = () => {
  const bodyElement = document.querySelector('body');
  bodyElement.classList.toggle('hide-overflow');
};

export {
  prepareComments,
  toggleHideOverflow
};
