import React, { useEffect, useState } from 'react';
import ResultList from "../../../components/client/resultList/resultList";
import Header from '../../../components/client/header/Header';
import styles from "./home.module.css";
import apiManager from '../../../http/apiManager';

const Home = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        apiManager.getProducts().then((res) => {
            res.data = res.data.filter((elem) => elem.homepage === 1)
            setProducts(res.data);
        })
    }, [])

    return(
        <>
            <Header/>
            <div className={styles.myPageSize}>
                <div className={styles.topSelling}>TOP SELLING</div>
            <ResultList products={products} />
            </div>
        </>
    )
};

export default Home;
