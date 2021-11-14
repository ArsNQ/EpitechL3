import React from 'react';
import { createUseStyles } from "react-jss";
import style from "./leftpart_styles";
import Leftpartitem from "../leftpartitem/leftpartitem";
const useStyles = createUseStyles(style);

const Leftpart = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {props.items.map((item) => {
                return (<Leftpartitem name={item} />)
            })}
        </div>
    );
};

export default Leftpart
