import React, { useState } from 'react';
import './index.css'
import { gql } from 'apollo-boost';
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';

const ADD_PRODUCT = gql`
  mutation newProduct($data: ProductInput) {
    newProduct(data: $data) {
      id name quantity price
    }
  }
`;

function ProductNew() {
  const history = useHistory();
  const { create } = useParams();
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [newProduct, data] = useMutation(ADD_PRODUCT);

  function handleSubmit(e) {
    e.preventDefault()

    newProduct({ variables: { data: { name, quantity: parseInt(quantity), price: parseFloat(price) }}})

    history.push('/')
  }

  return (
    <div className="container">
      <h1>Novo Produto</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductNew;