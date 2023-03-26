import React from 'react';
import './App.css';
import { useFormik } from 'formik';
import { basicSchema } from './schemas';
import { ProductList } from './components/ProductsList/ProductList';
import classNames from 'classnames';

const App: React.FC = () => {
  const onSubmit: () => void = () => {
    console.log('submitted');
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

  console.log(errors);

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="content">
        <ProductList />

        <div className="add">
          <div className="box">
            <h2>Add new product</h2>

            <form
              onSubmit={handleSubmit}>
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
                <label className="label">Thumbnail</label>
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
                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      { 'is-danger': errors.category && touched.category }
                    )}
                    type="text"
                    name="category"
                    value={values.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {(errors.category && touched.category) && (
                  <p className="help is-danger">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="field has-text-centered">
                <button
                  type="submit"
                  className="button is-link"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
