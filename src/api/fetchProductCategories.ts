export const getProductCategories = (): Promise<any> => {
  return fetch('https://dummyjson.com/products/categories')
    .then(res => res.json());
};
