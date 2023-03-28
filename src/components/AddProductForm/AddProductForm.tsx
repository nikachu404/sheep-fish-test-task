/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { basicSchema } from '../../schemas';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct } from '../../api/fetchProducts';
import { add } from '../../features/productsSlice';
import { getProductCategories } from '../../api/fetchProductCategories';
import { set as setProductCategories } from '../../features/productCategoriesSlice';
import './AddProductForm.scss';

export const AddProductForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categories);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getProductCategories().then(res => {
      dispatch(setProductCategories(res));
    })
      .catch(error => error);
  }, []);

  const onSubmit: (values: any, { resetForm }: { resetForm: () => void }) => void = (values, { resetForm }) => {
    const requestBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        price: values.price,
        thumbnail: values.thumbnail,
        rating: values.rating,
        stock: values.stock,
        category: values.category
      })
    };

    addProduct(requestBody)
      .then(newProduct => {
        dispatch(add(newProduct));
        resetForm();
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch(error => error);
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      thumbnail: '',
      rating: '',
      stock: '',
      category: ''
    },
    validationSchema: basicSchema,
    onSubmit
  });

  return (
    <div className="page__add-form">
      <div className="field">
        <h1
          className="has-text-centered
          has-text-light
          is-size-3
          has-text-weight-semibold"
        >
          Add new product
        </h1>
      </div>

      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': errors.title && touched.title }
                )}
                type="text"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {(errors.title && touched.title) && (
              <p className="help is-danger">
                {errors.title}
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': errors.description && touched.description }
                )}
                type="text"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {(errors.description && touched.description) && (
              <p className="help is-danger">
                {errors.description}
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': errors.price && touched.price }
                )}
                type="number"
                name="price"
                value={values.price}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {(errors.price && touched.price) && (
              <p className="help is-danger">
                {errors.price}
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Thumbnail (path)</label>
            <div className="control">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': errors.thumbnail && touched.thumbnail }
                )}
                type="text"
                name="thumbnail"
                value={values.thumbnail}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {(errors.thumbnail && touched.thumbnail) && (
              <p className="help is-danger">
                {errors.thumbnail}
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Rating</label>
            <div className="control">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': errors.rating && touched.rating }
                )}
                type="number"
                name="rating"
                value={values.rating}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {(errors.rating && touched.rating) && (
              <p className="help is-danger">
                {errors.rating}
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Stock</label>
            <div className="control">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': errors.stock && touched.stock }
                )}
                type="number"
                name="stock"
                value={values.stock}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {(errors.stock && touched.stock) && (
              <p className="help is-danger">
                {errors.stock}
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="select is-fullwidth">
              <select
                name="category"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                required
              >
                <option hidden>Select category</option>
                {categories.map(category => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            {(errors.category && touched.category) && (
              <p className="help is-danger">
                {errors.category}
              </p>
            )}
          </div>

          <div className="field has-text-centered">
            <button type="submit" className="button is-link">
              Add product
              {success && (
                <article className={classNames(
                  'message is-success',
                  { 'message__is-success': success }
                )}>
                  <div className="message-header">
                    <p>New product has been added! :)</p>
                  </div>
                  <div className="message-body">
                    Go to the &quot;Products&quot; page to see the added product
                  </div>
                </article>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
