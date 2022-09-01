const correctEndOfWord = (word, array) => (array.length === 1)
  ? word
  : `${word}s`;

const cutEndOfDescription = (description,
  maxLength = 140,
  finalSymbol = '…') => (description.length > maxLength)
  ? `${description.slice(0, maxLength - 1)}${finalSymbol}`
  : description;

const makeFirstLetterUp = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export {
  correctEndOfWord,
  cutEndOfDescription,
  makeFirstLetterUp
};
