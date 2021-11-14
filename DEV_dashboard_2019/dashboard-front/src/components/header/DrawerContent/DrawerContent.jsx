import React from 'react';
import { createUseStyles } from "react-jss";
import style from "./drawercontent_styles";
const useStyles = createUseStyles(style);

const  DrawerContent = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>

        </div>
    );
}

export default DrawerContent
