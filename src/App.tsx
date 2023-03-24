/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState } from 'react';
import { getAllProducts } from './api/fetchProducts';
import { type Product } from './api/types/Product';
import './App.css';
// import { ProductsList } from './components/ProductsList';

const App: React.FC = () => {
  const [products, setProduts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then(res => {
        setProduts(res.products);
        console.log(res.products);
      })
      .catch(error => error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="box">
          <table id="customers" className="table is-striped">
            <thead>
              <tr>
                <th className='id'>ID</th>
                <th>📌Name</th>
                <th>📋Description</th>
                <th>💸Price</th>
                <th>📷Photo</th>
                <th>✨Rating</th>
                <th>🛒Stock</th>
                <th>🔍Category</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 && products.map(product => (
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
      </header>
    </div>
  );
};

export default App;
