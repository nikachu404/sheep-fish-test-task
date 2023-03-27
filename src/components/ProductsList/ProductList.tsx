/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProducts } from '../../api/fetchProducts';
import { set, take } from '../../features/products/productsSlice';
import { setUseEffectUsed } from '../../features/IsUseEffectUsedSlice';
import classNames from 'classnames';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const useEffectUsed = useAppSelector(state => state.isUseEffectUsed.isUseEffectUsed);

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const dataFetchedRef = useRef(false);

  const categories: string[] = [];
  products.map(product => {
    if (categories.includes(product.category)) {
      return;
    }

    return categories.push(product.category);
  });

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

    getProducts()
      .then(res => {
        dispatch(set(res.products));
      })
      .catch(error => error);
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
  }, [products, sortType, sortOrder, query, selectedCategories]);

  return (
    <div className="page__products">
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
        <table className="table is-striped is-narrow is-fullwidth">
          <thead>
            <tr>
              <th
                className={classNames(
                  { 'is-underlined': sortType === 'id' }
                )}
                onClick={() => {
                  setSortType('id');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Id{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                className={classNames(
                  { 'is-underlined': sortType === 'title' }
                )}
                onClick={() => {
                  setSortType('title');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Name{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                className={classNames(
                  { 'is-underlined': sortType === 'description' }
                )}
                onClick={() => {
                  setSortType('description');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Description{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                className={classNames(
                  { 'is-underlined': sortType === 'price' }
                )}
                onClick={() => {
                  setSortType('price');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Price{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th>Photo</th>

              <th
                className={classNames(
                  { 'is-underlined': sortType === 'rating' }
                )}
                onClick={() => {
                  setSortType('rating');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Rating{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                className={classNames(
                  { 'is-underlined': sortType === 'stock' }
                )}
                onClick={() => {
                  setSortType('stock');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Stock{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                className={classNames(
                  { 'is-underlined': sortType === 'category' }
                )}
                onClick={() => {
                  setSortType('category');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Category{sortOrder === 'asc' ? '↑' : '↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.length > 0 && visibleProducts.map(product => (
              <tr key={product.id}>
                <td className="has-text-weight-bold is-vcentered">{product.id}</td>
                <td className="has-text-link has-text-weight-bold is-clickable is-vcentered">{product.title}</td>
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
                    onClick={() => dispatch(take(product.id))}
                  />
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
