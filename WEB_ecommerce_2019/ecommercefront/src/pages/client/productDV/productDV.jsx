import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../components/client/header/Header';
import Product from "../../../components/client/product/Product";

import styles from "../home/home.module.css";
import apiManager from '../../../http/apiManager';

const ProductDV = () => {
    let [params, setParams] = useState(useParams());
    let [product, setProduct] = useState({});

    useEffect(() => {
        apiManager.getProduct(params.id).then((res) => {
            setProduct(res.data);
        })
    }, [setParams, params])

    return(
        <>
            <Header />
            <div className={styles.myPageSize}>
                <Product product={product}/>
            </div>
        </>
    )
};

export default ProductDV;
