import { Card } from "react-bootstrap";
import styles from "../cardbuy/cardbuy.module.css";
import React from "react";

const CardBuy = () => {

return (
        <>
            <Card className={styles.card}>
                <Card.Img variant="top" src={"../../images/Log.png"}/>
                <Card.Body>
                    <Card.Title>NOM</Card.Title>
                    <Card.Text className={styles.price}>PRIX €</Card.Text>
                    <Card.Text className={styles.price}>WEIGHT</Card.Text>
                    <Card.Text className={styles.price}>QUANTITY</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default CardBuy;
