export const getProducts = (): Promise<any> => {
  return fetch('https://dummyjson.com/products?limit=0&select=id,title,description,price,thumbnail,rating,stock,category')
    .then(res => res.json());
};

export const addProduct = (requestBody: RequestInit): Promise<any> => {
  return fetch('https://dummyjson.com/products/add', requestBody)
    .then(res => res.json());
};
