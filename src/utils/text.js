const correctEndOfWord = (word, array) => (array.length === 1)
  ? word
  : `${word}s`;

const cutEndOfDescription = (description,
  maxLength = 140,
  finalSymbol = '…') => (description.length > maxLength)
  ? `${description.slice(0, maxLength - 1)}${finalSymbol}`
  : description;

export {
  correctEndOfWord,
  cutEndOfDescription
};
