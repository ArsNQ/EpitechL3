import React from 'react';
import styles from "../paypalReturn/paypalreturn.module.css";
import Link from "@material-ui/core/Link";

const PaiementReturn = () => {

    return(
        <div className={styles.divClass}>
        <p className={styles.fontClass}>We thank you for your order.</p>
        <p> Your order has been taken into account and will be processed as soon as possible. You will receive an email confirming your order. </p>
            <Link href="/">
                Return to Home Page
            </Link>
        </div>
    )
}
export default PaiementReturn;
