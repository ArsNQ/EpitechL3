import React from 'react';
import styles from './notFound.module.css'
import Link from "@material-ui/core/Link";
import Header from '../../components/client/header/Header';

const NotFound = () => {
    return (<>
        <Header />
        <div className={styles.divClass}>
            <p className={styles.fontClass}>404 Not found</p>
            <Link href="/">
                Return to Home Page
            </Link>
        </div>
    </>
    )
}

export default NotFound;