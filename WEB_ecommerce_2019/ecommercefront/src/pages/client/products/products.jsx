import React, { useEffect, useState } from 'react';
import Search from "../../../components/client/search/Search";
import Header from "../../../components/client/header/Header";
import styles from "./products.module.css";
import ResultList from '../../../components/client/resultList/resultList';
import apiManager from '../../../http/apiManager';

const Products = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        apiManager.getProducts().then((res) => {
            setProducts(res.data);
        })
    }, [])

    const filterProducts = (key) => {
        apiManager.getProducts().then((res) => {
            res.data = res.data.filter((e) => e.categoryId.toString() === key);
            setProducts(res.data);
        })
    }
    
    const search = (query) => {
        if (query === "") {
            apiManager.getProducts().then((res) => {
                setProducts(res.data);
            })
        } else {
            apiManager.searchProduct(query).then((res) => {
                setProducts(res.data);
            })
        }
    }

    return(
        <>
            <Header/>
            <div className={styles.myPageSize}>
                <h1>Search here</h1>
                <div className={styles.myPageStyle}>
                    <Search onSearch={(val) => search(val)} onSelect={(e) => filterProducts(e)} />
                </div>
            <ResultList products={products}/>
            </div>
        </>
    )
};

export default Products;
