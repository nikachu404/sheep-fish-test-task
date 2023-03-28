/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'bulma/css/bulma.css';
import store from './app/store';
import { ProductList } from './components/ProductsList/ProductList';
import { AddProductForm } from './components/AddProductForm/AddProductForm';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<ProductList />} />
            <Route path="add" element={<AddProductForm />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
