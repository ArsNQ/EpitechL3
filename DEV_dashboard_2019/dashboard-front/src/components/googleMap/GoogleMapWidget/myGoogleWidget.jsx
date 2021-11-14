import React, { useState, useCallback, useEffect } from 'react';
import style from "../GoogleMapWidget/myGoogleWidget_styles"
import SimpleMap from "../GoogleMapComp/myGoogleMap"
import {createUseStyles} from "react-jss";
import {Card} from "../../../design_system/card/card";

const useStyles = createUseStyles(style);

const  GoogleMapWidget = () => {
    const classes = useStyles();

    return (
        <Card className={classes.container}>
            <SimpleMap/>
        </Card>
    );
};

export default GoogleMapWidget