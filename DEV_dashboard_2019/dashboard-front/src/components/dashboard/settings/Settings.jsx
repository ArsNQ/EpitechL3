import React, {useCallback, useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import style from './settings_styles';
import {Switch} from 'antd';
import {changeState} from '../../../actions/settings';
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import {
    CalendarOutlined,
    TwitterOutlined,
} from '@ant-design/icons';

import {useDispatch, useSelector} from "react-redux";
import Logo from "../../../images/spotify.png"
import LogoW from "../../../images/wiki.jpg"
import WeatherSetting from "./weather/weather";
import NewsSetting from "./new/news";

import SpotifySetting from "./spotify/spotify";


const useStyles = createUseStyles(style);

const Settings = () => {
    const classes = useStyles();
    const user = useSelector(store => store.user);
    const service = useSelector(store => store.service);

    const dispatch = useDispatch();

    const displayTwitter = service.twitter?.enabled;
    const displayGoogleMap = service.googleMap?.enabled;
    const displayWikipedia = service.wikipedia?.enabled;


    const handleSwitchChange = useCallback((serviceType, event) => {
      const body = {
          service: serviceType,
          state: event,
          id: user._id
      };
      changeState(body)(dispatch);
    },[user]);

    return (
            <div className={classes.container}>
                <p className={classes.text}>Manage your dashboard</p>
                <div className={classes.container2}>
                <div className={classes.LeftSide}>
                <WeatherSetting  />
                <NewsSetting />

                </div>
                    <div className={classes.MiddleLine}></div>
                <div className={classes.RightSide}>
                <div className={classes.vignette}>
                    <div className={classes.imgText}>
                    <TwitterOutlined className={classes.logo}/>
                    <span className={classes.subTitle}>TWITTER</span>
                    </div>
                    <Switch defaultChecked={displayTwitter} onChange={(e) => handleSwitchChange("twitter", e)} className={classes.switch}/>
                </div>
                <SpotifySetting />

                <div className={classes.vignette}>
                    <div className={classes.imgText}>
                    <GoogleOutlined className={classes.logoGoogle}/>
                    <span className={classes.subTitle}>GOOGLE MAP</span>
                    </div>
                    <Switch defaultChecked={displayGoogleMap} onChange={(e) => handleSwitchChange("googleMap", e)} className={classes.switch}/>
                </div>
                <div className={classes.vignette}>
                    <div className={classes.imgText}>
                        <img className={classes.imgW} src={LogoW}/>
                        <span className={classes.subTitle}>WIKIPEDIA</span>
                    </div>
                    <Switch defaultChecked={displayWikipedia} onChange={(e) => handleSwitchChange("wikipedia", e)} className={classes.switch}/>
                </div>
                </div>
                </div>

            </div>
    )
};

export default Settings;
