import React from 'react';
import './index.css'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_PRODUCTS = gql`
  {
    products {
      id name quantity price
    }
  }
`;

function Products() {
  const { loading, data } = useQuery(GET_PRODUCTS)
  
  return (
    <div className="container">
      <h1>Lista de produtos</h1>
        {!loading ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { data.products.map(product => 
              (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>R$ {product.price}</td>
                </tr>
              )
            )
            }
          </tbody>
        </table>
        ) : <p>carregando</p> }
    </div>
  );
}

export default Products;
