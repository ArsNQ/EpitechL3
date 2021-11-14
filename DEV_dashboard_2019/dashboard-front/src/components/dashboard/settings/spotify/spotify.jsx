import React, {useCallback} from 'react'
import {createUseStyles} from "react-jss";
import style from './spotify_styles';
import Logo from "../../../../images/spotify.png";
import {Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {changeState} from "../../../../actions/settings";
import {parse} from "querystring";
import Cookies from 'universal-cookie';



const useStyles = createUseStyles(style);

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "71065ebe26e54f9fbcb24c05da4a382f";
const redirectUri = "http://127.0.0.1:3000/spotify-callback";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
];


const cookies = new Cookies();

const SpotifySetting = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const service = useSelector(store => store.service);

    const displaySpotify = service.spotify?.enabled;

    const polling = useCallback((pop) => {
        const polling = setInterval(()=> {
            try {
                if(pop.location.pathname.includes("/spotify-callback")) {
                    const hash = pop.location.hash.replace('#',"");
                    const parsedHash = parse(hash);
                    cookies.set('sp_t',parsedHash.access_token, {path: '/'});
                    clearInterval(polling);
                    pop.close();
                }
            } catch(err) {
            }
        },500);
    },[]);

    const openPopup = useCallback(async (url) => {
        const w = 800;
        const h = 600;
        const left = window.screen.width / 2 - w / 2;
        const top = window.screen.height / 2 - h / 2;
        return window.open(
            url,
            "",
            `toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, 
            width=${w}, height=${h}, top=${top}, left=${left}`
        );
    },[]);

    const handleSwitch = useCallback(async (event) => {
        if (event) {
            let localPopUp = await openPopup(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`);
            polling(localPopUp);
        } else {
            cookies.remove('sp_t', {path: '/'});
        }
        return changeState({
            service: "spotify",
            state: event,
            id: user._id
        })(dispatch);
    },[user]);

    return(
        <div className={classes.vignette}>
            <div className={classes.imgText}>
                <img className={classes.img} src={Logo}/>
                <span className={classes.subTitle}>SPOTIFY</span>
            </div>
            <Switch checked={displaySpotify} onChange={handleSwitch} className={classes.switch}/>
        </div>
    )
};

export default SpotifySetting;
