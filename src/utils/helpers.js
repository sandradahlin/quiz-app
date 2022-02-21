/**
 * @method getStorageTheme
 * @param {string} initialTheme - initial theme.
 * @returns {string} - defaults to initial theme or returns theme set on local storage.
 */

export const getStorageTheme = (initialTheme) => {
  let theme = initialTheme;
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

/**
 * @method shuffleQuestions
 * @param {array} quizQuestions - array of items.
 * @returns {array} - shuffles array of items in a random order.
 */

export const shuffleQuestions = (quizQuestions) => {
  let cloneQuestions = quizQuestions.map((item) => {
    return { ...item };
  });
  for (let i = cloneQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloneQuestions[i], cloneQuestions[j]] = [
      cloneQuestions[j],
      cloneQuestions[i],
    ];
  }
  return cloneQuestions;
};
