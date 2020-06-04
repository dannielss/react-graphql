import React, { useState, useEffect, useCallback } from 'react';
import './index.css'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_PRODUCTS = gql`
  {
    products {
      id name quantity price
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Int) {
    deleteProduct(id: $id) {
      id name quantity price
    }
  }
`

function Products() {
  const [products, setProducts] = useState([])
  const { loading, data } = useQuery(GET_PRODUCTS, { pollInterval: 500 })

  useEffect(() => {
    if(data && data.products) {
      setProducts(data.products)
    }
  }, [data])
  
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  function handleDelete(id) {
    deleteProduct({ variables: { id }})
    const response = products.filter(product => product.id !== id)
    setProducts(response)
  }

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { products.map(product => 
              (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>R$ {product.price}</td>
                  <td>
                    <button type="button" style={{ marginRight: '5px' }} onClick={() => handleDelete(product.id)}>Excluir</button>
                    <Link to={`product/${product.id}`}><button>Alterar</button></Link>
                  </td>
                </tr>
              )
            )
            }
          </tbody>
        </table>
        ) : <p>carregando</p> }
        <Link to="/new"><button style={{ marginTop: '10px' }}>Cadastrar novo produto</button></Link>
    </div>
  );
}

export default Products;
