import React, { useEffect, useState } from 'react';
import Header from '../../../components/client/header/Header';
import styles from "./orderpage.module.css";
import Order from "../../../components/client/order/Order";
import apiManager from '../../../http/apiManager';

const OrderPage = () => {
    const [orders, setOrders] = useState();
    
    useEffect(() => {
        apiManager.getUserOrders().then((res) => {
            console.log(res.data);
            setOrders(res.data);
        })
    }, [])
    
    return(
        <>
            <Header/>
            <div className={styles.myPageSize}>
                <Order orderList={orders} />
            </div>
        </>
    )
};

export default OrderPage;
