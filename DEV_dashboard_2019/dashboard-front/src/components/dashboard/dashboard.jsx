import React from 'react';
import { createUseStyles } from "react-jss";
import style from "./dashboard_styles";
import HeaderDashboard from "../header/headerDashboard";
import { Route, Switch }from "react-router-dom";
import Settings from "./settings/Settings";
import Drawer from "./drawer/drawer";
import Widgets from "./widgets/widgets";

const useStyles = createUseStyles(style);

const  Dashboard = ({match: {url}}) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <HeaderDashboard />
            <div className={classes.body}>
                <Route path={`${url}/:id?`} component={(props) =>  <Drawer {...props} />} />
                <Switch >
                    <Route path={`${url}/settings`} component={(props) => <Settings {...props}/>} />
                    <Route path={`${url}/:id`} component={(props) => <Widgets {...props}/>} />
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard
