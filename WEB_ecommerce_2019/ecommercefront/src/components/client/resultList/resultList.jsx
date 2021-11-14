import React, { useState, useEffect, useCallback } from 'react';

import ResultCard from '../resultCard/resultCard';
import { Grid, LinearProgress } from '@material-ui/core';
import cookieManager from 'react-cookies';


const ResultList = ({ products }) => {
    const [list, setList] = useState([]);
    const [basket] = useState(cookieManager.load('basket'));

    const buildList = useCallback(() => {
        if (products) {
            const arr = []
            products.forEach((product) => {
                arr.push(<Grid key={product.id} item xs={3} style={{height:"100%"}}><ResultCard addProduct={(id) => { basket.push(id); cookieManager.save('basket', basket) }} price={product.price} name={product.name} picture={product.photo} id={product.id} /></Grid>)
            })
            setList(arr);
        }
    }, [products, basket]);

    useEffect(() => {
        if (basket)
            buildList();
    }, [buildList, basket]);

    useEffect(() => {
        cookieManager.save('basket', basket);
    }, [basket])

    if (products) {
        return (
            <>
                <Grid container spacing={4} alignContent="center">
                    {list}
                </Grid>
            </>
        )
    } else {
        return (<LinearProgress color="secondary" style={{marginTop: 20}} />);
    }
}

export default ResultList;
