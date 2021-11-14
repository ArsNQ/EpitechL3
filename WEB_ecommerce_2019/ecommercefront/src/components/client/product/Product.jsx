import React from 'react';
import styles from "./product.module.css";
import { Col, Row } from "react-bootstrap";
import { Button, Grid } from "@material-ui/core";
import cookieManager from "react-cookies";

const Product = ({ product }) => {
    let products = cookieManager.load('basket');

    if (!products) {
        cookieManager.save('basket', [], { path: '/' });
        products = [];
    }

    const addToBasket = (id) => {
        products.push(id);
        cookieManager.save('basket', products, { path: '/' });
    }

    console.log(product);

    return(
        <>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className={styles.myPaper}>
                    <h1>{product.name}</h1>
                </div>
            </Grid>
            <Row>
                <Col>
                    <img src={product.photo} className={styles.myPicture} alt="product"></img>
                </Col>
                <Col>
                    <card className={styles.myDesc}>
                        <p>Description : {product.description}</p>
                        <p>Price : {product.price}€</p>
                        <p>Weight : {product.weight}</p>
                        <Button variant="contained" color="secondary" onClick={() => addToBasket(product.id)}>basket</Button>
                    </card>
                </Col>
            </Row>
        </Grid>
        </>
    )
};

export default Product;
