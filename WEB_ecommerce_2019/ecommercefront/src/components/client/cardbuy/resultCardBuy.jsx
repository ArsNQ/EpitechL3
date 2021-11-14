
import React, {useCallback, useEffect, useState} from "react";

const Order_item = ({ orderItem }) => {
    const [list, setList] = useState([]);

    const buildList = useCallback(() => {
        if (orderItem) {
            const arr = []
            orderItem.forEach((order) => {
                arr.push(<cardBuy data={order_} />)
            })
            setList(arr);
        }
    }, [orderList]);

    useEffect(() => {
        buildList();
    }, [buildList]);

    return(
        <>
            <OrderHeader />
            {list}
        </>

    )

};

export default Order;
