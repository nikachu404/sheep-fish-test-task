/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { getAllProducts } from './api/fetchProducts';
import classNames from 'classnames';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { set } from './features/products/productsSlice';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [
    selectedCategories, setSelectedCategories
  ] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

  const categories: string[] = [];

  products.map(product => {
    if (categories.includes(product.category)) {
      return;
    }

    return categories.push(product.category);
  });

  const onSelectCategoryFilter = (category: string): void => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(el => el !== category);
      }

      return [...prev, category];
    });
  };

  const visibleProducts = products.filter(product => {
    const normalizedTitle = product.title.toLowerCase();
    const normalizedCategory = product.category.toLowerCase();
    const normalizedQuery = query.toLowerCase().trim();

    const isQueryTitleMatch = query
      ? normalizedTitle.includes(normalizedQuery)
      : true;

    const isQueryCategoryMatch = query
      ? normalizedCategory.includes(normalizedQuery)
      : true;

    const isCategoriesMatch = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;

    return (isQueryTitleMatch || isQueryCategoryMatch) && isCategoriesMatch;
  });

  useEffect(() => {
    getAllProducts()
      .then(res => {
        dispatch(set(res.products));
        console.log(res.products);
      })
      .catch(error => error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="content">
        <div className="products">
          <input
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />

          <div className="is-flex-wrap-wrap">
            <a
              href="#/"
              className={classNames(
                'button is-success mr-6 my-1',
                { 'is-outlined': selectedCategories.length > 0 }
              )}
              onClick={() => {
                setSelectedCategories([]);
              }}
            >
              All
            </a>

            {categories.map(category => (
              <a
                key={category}
                className={classNames(
                  'button mr-2 my-1',
                  {
                    'is-info': selectedCategories.includes(category)
                  }
                )}
                href="#/"
                onClick={() => {
                  onSelectCategoryFilter(category);
                }}
              >
                {category}
              </a>
            ))}
          </div>

          <div className="box table-container">
            <table id="customers" className="table is-striped is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap is-justify-content-center">
                      <div className="is-inline">📎ID</div>
                      <a href="#/">
                        <span className="icon">
                          <i className="fas fa-sort"></i>
                        </span>
                      </a>
                    </span>
                  </th>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap is-justify-content-center">
                      📌Name
                      <a href="#/">
                        <span className="icon">
                          <i className="fas fa-sort"></i>
                        </span>
                      </a>
                    </span>
                  </th>
                  <th>📋Description</th>
                  <th>💸Price</th>
                  <th>📷Photo</th>
                  <th>✨Rating</th>
                  <th>🛒Stock</th>
                  <th>🔍Category</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.length > 0 && visibleProducts.map(product => (
                  <tr key={product.id}>
                    <td className="has-text-weight-bold">{product.id}</td>
                    <td className="has-text-link has-text-weight-bold is-clickable">{product.title}</td>
                    <td className="descripton">{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="photo"
                      />
                    </td>
                    <td>{product.rating}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="add">
          <div className="box">
            <h2>Add new product</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
