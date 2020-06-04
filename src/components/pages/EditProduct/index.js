import React, { useState, useEffect } from 'react';
import './index.css'
import { gql } from 'apollo-boost';
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_PRODUCT = gql`
  query product($id: Int) {
    product(id: $id) {
      id name quantity price
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation updateProduct($id: Int, $data: ProductInput) {
    updateProduct(id: $id, data: $data) {
      id name quantity price
    }
  }
`;

function EditProduct() {
  const history = useHistory()
  const { id } = useParams()
  const { loading, data } = useQuery(GET_PRODUCT, { variables: { id: parseInt(id) }})
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)

  const [updateProduct] = useMutation(EDIT_PRODUCT);

  useEffect(() => {
    if(data) {
      setName(data.product.name)
      setQuantity(data.product.quantity)
      setPrice(data.product.price)
    }
  }, [data])

  function handleSubmit(e) {
    e.preventDefault()

    updateProduct({ variables: { id: parseInt(id), data: { name, quantity: parseInt(quantity), price: parseFloat(price) }}})

    history.push('/')
  }

  return (
    <div className="container">
      <h1>Editar Produto</h1>
      { !loading ? (
         <form onSubmit={handleSubmit}>
         <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
         <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
         <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
         <button type="submit">Edit Product</button>
       </form>
      ) : <p>carregando...</p>}
     
    </div>
  )
}

export default EditProduct;