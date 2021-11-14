import React from 'react';
import style from './404_styles'
import Logo from '../../images/logo.png'
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(style);

const  NotFound = () => {

    const classes = useStyles();

    return (
        <div className={classes.body}>
            <div className={classes.my404G}>
                <p className={classes.my404}>4</p>
                <img className={classes.img} src={Logo}/>
                <p className={classes.my404}>4</p>
            </div>
            <p className={classes.myPageNotFound}>PAGE NOT FOUND</p>
            <a href="/" className={classes.myBackHome}>go back to home</a>
        </div>
    );
}

export default NotFound
