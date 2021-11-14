import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {createUseStyles} from "react-jss";
import style from "../../dashboard/dashboard_styles";

const useStyles = createUseStyles(style);

    const SimpleMap = ({center={lat: 50.6333, lng: 3.0667}, zoom= 11}) => {
        const classes = useStyles();

        return (
            <div className={classes.myWidget}>
                <div style={{ height: '25vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key:'xxxxxxxxxxxxxxx'}}
                        defaultCenter={center}
                        defaultZoom={zoom}
                    >
                    </GoogleMapReact>
                </div>
            </div>
        );
};

export default SimpleMap;
