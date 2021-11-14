import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import './App.css';
import Home from './pages/client/home/Home';
import SignIn from './pages/signin/SignIn';
import Products from './pages/client/products/products';
import ProductDV from './pages/client/productDV/productDV';
import Cart from './pages/client/cart/Cart';
import Test from './pages/client/test/test';
import Profile from './pages/client/Profile/Profile';
import OrderPage from "./pages/client/order/OrderPage";
import Success from './pages/client/success/success';
import OrdersPage from './pages/admin/orders/orders';
import UsersPage from './pages/admin/users/users';
import apiManager from './http/apiManager';
import StocksPage from "./pages/admin/products/Products";
import NotFoundPage from "./pages/notFound/notFound";

const  App = () => {
  return (
    <div className='App'>
        <Router>
            <Route path={'/'}  exact={true}>
                <Home  />
            </Route>
            <Route path='/products'>
                <Products/>
            </Route>
            <Route path='/success'>
                <Success />
            </Route>
            <Route path={'/login'}>
                <SignIn />
            </Route>
            <Route path='/product/:id' children={<ProductDV />}>
                <ProductDV />
            </Route>
            <Route path='/cart'>
                <Cart />
            </Route>
            <Route path='/Test'>
                <Test />
            </Route>
            <Route path='/OrderPage'>
                <OrderPage />
            </Route>
            <Route path='/profile'>
                <Profile />
            </Route>
            <PrivateRoute path='/admin/orders'>
                <OrdersPage />
            </PrivateRoute>
            <PrivateRoute path='/admin/stocks'>
                <StocksPage />
            </PrivateRoute>
            <PrivateRoute path='/admin/users'>
                <UsersPage />
            </PrivateRoute>
            <Route>
                <NotFoundPage />
            </Route>
        </Router>
    </div>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiManager.getUser().then((res) => {
            if (res.data[0].roles !== '["ROLE_ADMIN"]') {
                setLogged(false);
                setLoading(false);
            } else {
                setLogged(true);
                setLoading(false);
            }
        })
    }, [])

    if (loading) {
        return (<></>)
    }
    else if (!loading && logged) {
        return (
            <Route {...rest} >
                {children}
            </Route>
        )
    } else if (!logged) {
        return (<Redirect to='/' />);
    }
}

export default App;
