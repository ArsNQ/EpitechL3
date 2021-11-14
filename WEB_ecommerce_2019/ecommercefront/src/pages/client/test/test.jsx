import React from 'react';
import Header from "../../../components/client/header/Header";
import styles from "./test.module.css";
import CardBuy from "../../../components/client/cardbuy/cardBuy";

const Test = () => {


    return(
        <>
            <Header />
            <div className={styles.myPageSize}>
                <CardBuy />
            </div>
        </>
    )
};

export default Test;
