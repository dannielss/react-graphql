import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';

const ADD_PRODUCT = gql`
  mutation newProduct($data: ProductInput) {
    newProduct(data: $data) {
      id name quantity price
    }
  }
`;

function ProductNew() {
  let history = useHistory();
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [newProduct, { data }] = useMutation(ADD_PRODUCT);

  function handleSubmit(e) {
    e.preventDefault()

    newProduct({ variables: { data: { name, quantity: parseInt(quantity), price: parseFloat(price) }}})

    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input placeholder="Price" value={price} value={price} onChange={e => setPrice(e.target.value)} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductNew;