import React from 'react';
import './index.css'
import { gql, useQuery, useMutation } from '@apollo/client';
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
      message
    }
  }
`

function Products() {
  const { loading, data, error, refetch } = useQuery(GET_PRODUCTS, { fetchPolicy: 'network-only'})

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  async function handleDelete(id) {
    await deleteProduct({ variables: { id }})
    refetch()
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1>Lista de produtos</h1>
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
            { data.products.map(product => 
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
        <Link to="/new"><button style={{ marginTop: '10px' }}>Cadastrar novo produto</button></Link>
    </div>
  );
}

export default Products;
