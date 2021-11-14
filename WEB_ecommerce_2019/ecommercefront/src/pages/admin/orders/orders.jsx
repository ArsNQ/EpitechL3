import React, { useEffect, useState } from 'react';
import Header from '../../../components/admin/header/header';
import Order from '../../../components/client/order/Order';
import apiManager from '../../../http/apiManager';
import styles from './orders.module.css'

const OrdersPage = () => {
    const [orders, setOrders] = useState();

    useEffect(() => {
        apiManager.getOrders().then((res) => {
            setOrders(res.data);
        })
    }, [])
    
    return (
        <>
            <Header />
            <div className={styles.myPageSize}>
                <Order orderList={orders} />
            </div>
        </>
    );
}

export default OrdersPage;