import React, { useState } from 'react';
import { Card, Button, Row, Col} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { Snackbar, IconButton } from '@material-ui/core';
import { Button as MButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./resultcard.module.css";
import {Link} from "react-router-dom";


const ResultCard = ({ picture, name, price, id, addProduct}) => {
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState();

    const handleClose = (event) => {
        console.log(event);
        if (event === 'clickaway') {
            return;
        }
        setOpen(false);
    }


    const addToBasket = (id) => {
        setOpen(true);
        addProduct(id)
    }

    const routeTo = (path) => {
        setRedirect(path);
    }

    if (!redirect) {
        return (
            <>
                <Card className={styles.card}>
                    <Card.Img className={styles.imgCard} variant="top" src={picture} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text className={styles.price}>{price} €</Card.Text>
                        <Row>
                            <Col>
                                <Button className={styles.button} onClick={() => addToBasket(id)} variant="warning">Basket</Button>
                            </Col>
                            <Col>
                                <Link to={`/product/${id}`} className={styles.myNavItem}><Button className={styles.button} variant="warning">Description</Button></Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Product added to basket"
                    action={
                    <React.Fragment>
                        <MButton color="secondary" variant="contained" size="small" onClick={() => { routeTo('/cart')}}>
                            See basket
                        </MButton>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>}
                />
            </>
        )
    } else {
        return (<Redirect to={redirect} />)
    }
}

export default ResultCard;
