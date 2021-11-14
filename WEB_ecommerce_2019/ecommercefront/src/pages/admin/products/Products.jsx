import React, {useEffect, useState} from 'react';
import Header from "../../../components/admin/header/header";
import styles from "./products.module.css";
import Stocks from "../../../components/admin/products/Products";
import apiManager from "../../../http/apiManager";


const ProductsPage = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        apiManager.getProducts().then((res) => {
            setProducts(res.data);
        })
    }, []);

    return (
        <>
            <Header/>
            <div className={styles.myPageSize}>
                <Stocks productlist={products}/>
            </div>
        </>
    );
}

export default ProductsPage;
