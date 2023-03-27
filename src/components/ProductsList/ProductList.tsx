/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProducts } from '../../api/fetchProducts';
import { set, take } from '../../features/products/productsSlice';
import classNames from 'classnames';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

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

    dataFetchedRef.current = true;

    getProducts()
      .then(res => {
        dispatch(set(res.products));
      })
      .catch(error => error);
  }, []);

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
              <th
                onClick={() => {
                  setSortType('id');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Id{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                onClick={() => {
                  setSortType('title');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Name{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                onClick={() => {
                  setSortType('description');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Description{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                onClick={() => {
                  setSortType('price');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Price{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th>Photo</th>

              <th
                onClick={() => {
                  setSortType('rating');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Rating{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
                onClick={() => {
                  setSortType('stock');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                Stock{sortOrder === 'asc' ? '↑' : '↓'}
              </th>

              <th
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
                <td>
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
