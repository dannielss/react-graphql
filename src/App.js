import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_PRODUCTS = gql`
  {
    products {
      id name quantity price
    }
  }
`;

function App() {
  const { loading, data } = useQuery(GET_PRODUCTS)
  
  return (
    <div>
      { !loading ? (
        <div>
          { data.products.map(product => (
            <div key={product.id}>
              { console.log(product)}
              <p>{product.name}</p>
            </div>
            ))
          }
        </div>        
        ) : <p>carregando...</p>
      }
    </div>
  );
}

export default App;
