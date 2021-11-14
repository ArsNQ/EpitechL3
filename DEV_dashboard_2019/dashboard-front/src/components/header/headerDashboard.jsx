import React, {useCallback, useState} from 'react';
import {UserOutlined} from '@ant-design/icons';
import { createUseStyles } from "react-jss";
import style from "./header_styles";
import {Dropdown} from "../../design_system/dropdown/dropdown";
import {Card} from "../../design_system/card/card";
import {LogoutOutlined, SettingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {logout} from "../../actions/auth";
import {useDispatch} from "react-redux";

const useStyles = createUseStyles(style);

const  HeaderDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState();

    const mouseEnterHandler = useCallback(() => {
        setIsOpen(true);
    },[]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    },[]);

    const handleLogout = useCallback(()=> {
        logout()(dispatch)
    },[]);

    return (
        <div className={classes.Core2}>
            <span className={classes.TitleHeader}>Dashtech</span>
            <div className={classes.dropdownContainer} onMouseEnter={mouseEnterHandler} >
                <UserOutlined className={classes.Icon2} />
                <Dropdown
                    open={isOpen} position={{top: 70, right: 10}}
                    animations={{x:0,y:-10}}
                    closeOnMouseLeave
                    onClose={handleClose}
                >
                    <Card className={classes.card}>
                        <Link to={"/dashboard/settings"}>
                            <div className={classes.cardItem} onClick={handleClose}>
                                <SettingOutlined className={classes.icon} />
                                <span className={classes.text} >Settings</span>
                            </div>
                        </Link>
                        <div className={classes.cardItem} onClick={handleLogout}>
                            <LogoutOutlined className={classes.icon}  />
                            <span className={classes.text}>Log Out</span>
                        </div>
                    </Card>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderDashboard;
