/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProducts } from '../../api/fetchProducts';
import { getProductCategories } from '../../api/fetchProductCategories';
import { set as setProducts, take as takeProducts } from '../../features/productsSlice';
import { set as setProductCategories } from '../../features/productCategoriesSlice';
import { setUseEffectUsed } from '../../features/isUseEffectUsedSlice';
import classNames from 'classnames';

import './ProductList.scss';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { categories } = useAppSelector(state => state.categories);
  const useEffectUsed = useAppSelector(state => state.isUseEffectUsed.isUseEffectUsed);

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [isLoading, setIsLoading] = useState(false);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }

    if (!useEffectUsed) {
      dispatch(setUseEffectUsed());
    }

    if (useEffectUsed) {
      return;
    }

    dataFetchedRef.current = true;

    setIsLoading(true);

    getProducts()
      .then(res => {
        dispatch(setProducts(res.products));
      })
      .catch(error => error);

    getProductCategories().then(res => {
      dispatch(setProductCategories(res));
    })
      .catch(error => error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, useEffectUsed]);

  const onSelectCategoryFilter = (category: string): void => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(el => el !== category);
      }

      return [...prev, category];
    });
  };

  const visibleProducts = useMemo(() => {
    const sortedProducts = [...products];

    switch (sortType) {
      case 'title':
      case 'description':
      case 'category':
        sortedProducts.sort((a, b) => a[sortType].localeCompare(b[sortType]));
        break;

      case 'price':
      case 'rating':
      case 'stock':
        sortedProducts.sort((a, b) => a[sortType] - b[sortType]);
        break;

      default:
        break;
    }

    if (sortOrder === 'desc') {
      sortedProducts.reverse();
    }

    return sortedProducts.filter(product => {
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
  }, [products, sortType, sortOrder, query, selectedCategories, categories]);

  return (
    <div className="page__products">
      <div className="field">
        <h1
          className="has-text-centered
          has-text-light
          is-size-3
          has-text-weight-semibold"
        >
          Products page
        </h1>
      </div>

      <div className="field">
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </div>

      {isLoading
        ? (
          <div className="loader-wrapper is-centered">
            <div className="loader"></div>
          </div>
          )
        : (
          <>
            <div className=" field is-flex is-flex-wrap-wrap">
              <a
                href="#/"
                className={classNames(
                  'button mr-6 my-1',
                  { 'is-dark': selectedCategories.length > 0 },
                  { 'is-success': selectedCategories.length === 0 }
                )}
                onClick={() => {
                  setSelectedCategories([]);
                }}
              >
                All
              </a>

              {categories && categories.map(category => (
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
            {visibleProducts.length
              ? (
                <div className="box table-container">
                  <table className="table is-striped is-narrow is-fullwidth">
                    <thead>
                      <tr>
                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'id' }
                          )}
                          onClick={() => {
                            setSortType('id');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Id{sortType === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>

                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'title' }
                          )}
                          onClick={() => {
                            setSortType('title');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Name{sortType === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>

                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'description' }
                          )}
                          onClick={() => {
                            setSortType('description');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Description{sortType === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>

                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'price' }
                          )}
                          onClick={() => {
                            setSortType('price');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Price{sortType === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>

                        <th>Photo</th>

                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'rating' }
                          )}
                          onClick={() => {
                            setSortType('rating');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Rating{sortType === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>

                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'stock' }
                          )}
                          onClick={() => {
                            setSortType('stock');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Stock{sortType === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>

                        <th
                          className={classNames(
                            'is-clickable',
                            { 'is-underlined': sortType === 'category' }
                          )}
                          onClick={() => {
                            setSortType('category');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          Category{sortType === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleProducts.map(product => (
                        <tr key={product.id}>
                          <td className="has-text-weight-bold is-vcentered">{product.id}</td>
                          <td className="has-text-link has-text-weight-bold is-vcentered">{product.title}</td>
                          <td className="descripton is-vcentered">{product.description}</td>
                          <td className="is-vcentered">{product.price}</td>
                          <td>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="photo"
                            />
                          </td>
                          <td className="is-vcentered">{product.rating}</td>
                          <td className="is-vcentered">{product.stock}</td>
                          <td className="is-vcentered">{product.category}</td>
                          <td className="is-vcentered">
                            <button
                              className="delete"
                              onClick={() => dispatch(takeProducts(product.id))}
                            />
                          </td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                </div>
                )
              : (
                <div className="field">
                  <h2 className="has-text-light  has-text-weight-semibold has-text-centered is-size-4">No products ;(</h2>
                </div>
                )}
          </>
          )}
    </div>
  );
};
