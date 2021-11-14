import React, { useRef } from 'react';
import Basket from '../../../components/client/basket/Basket';
import BasketHeader from '../../../components/client/basketHeader/basketHeader';
import Header from '../../../components/client/header/Header';

const Cart = () => {
    const basketRef = useRef();

    const refreshCart = () => {
        basketRef.current.refreshView();
    }

    return(
        <>
            <Header />
            <BasketHeader refreshCart={refreshCart} />
            <Basket ref={basketRef} />
        </>
    )
};

export default Cart;
