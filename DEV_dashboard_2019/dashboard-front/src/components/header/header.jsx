import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import '../../fonts/Audiowide-Regular.ttf';
import '../../fonts/Questrial-Regular.ttf';
import { createUseStyles } from "react-jss";
import style from "./header_styles";
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';
const useStyles = createUseStyles(style);

const  Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.Core}>
            <Link to={"/login"}>
                <Tooltip title="Login">
                    <UserOutlined className={classes.Icon}/>
                </Tooltip>
            </Link>
        </div>
    );
}

export default Header
