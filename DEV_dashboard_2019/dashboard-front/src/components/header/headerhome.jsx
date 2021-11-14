import React from 'react';
import Logo from "../../images/logo.png";
import {UserOutlined} from '@ant-design/icons';
import '../../fonts/Audiowide-Regular.ttf';
import '../../fonts/Questrial-Regular.ttf';
import { createUseStyles } from "react-jss";
import style from "./header_styles";
const useStyles = createUseStyles(style);

const  HeaderHome = () => {
    const classes = useStyles();
    return (
        <div className={classes.Core2}>
            <span className={classes.TitleHeader}>Dashtech</span>
            <UserOutlined className={classes.Icon2}/>
        </div>
    );
}

export default HeaderHome;
