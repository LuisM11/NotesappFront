export const extractCategories = (formCategories, fetchCategories) => {
  let newCategories = [];
  const categories1 = formCategories.filter((category) => {
    if (
      !isNaN(category) &&
      verifyCategory(fetchCategories, parseInt(category))
    ) {
      return true;
    } else {
      newCategories.push(category);
      return false;
    }
  });
  newCategories = newCategories.map((category) => {
    return { name: category }
  });
  return { categories1, newCategories };
};

const verifyCategory = (array, id) => {
  return array.some((category) => category.id === id);
};
