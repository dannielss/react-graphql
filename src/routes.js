import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './components/pages/Products';
import ProductNew from './components/pages/newProduct';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/new" component={ProductNew} />
      </Switch>
    </BrowserRouter>
  )
}