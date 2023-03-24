export const getAllProducts = (): Promise<any> => {
  return fetch('https://dummyjson.com/products?limit=0&select=id,title,description,price,thumbnail,rating,stock,category')
    .then(res => res.json());
};
