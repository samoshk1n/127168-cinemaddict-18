const NUMBER_OF_SEPARATION = 3;

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

const separateNumber = (number, count = NUMBER_OF_SEPARATION) => {
  const stringNumber = String(number);
  const numOfSeparation = Math.floor(stringNumber.length / count);
  let updatedNum = '';
  let startSlice = count;
  let endSlice = stringNumber.length;

  for (let i = numOfSeparation; i >= 0; i--) {
    updatedNum = ` ${stringNumber.slice(-startSlice, endSlice) + updatedNum}`;
    startSlice += 3;
    endSlice -= 3;
  }

  return updatedNum.trim();
};

export {
  correctEndOfWord,
  cutEndOfDescription,
  makeFirstLetterUp,
  separateNumber
};
