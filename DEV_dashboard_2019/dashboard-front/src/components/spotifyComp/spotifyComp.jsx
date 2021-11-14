import React, { useEffect, useState} from "react";
import Player from "./player/Player";
import "../spotifyComp/spotifyComp_styles";
import {parse} from 'query-string';
import {createUseStyles} from "react-jss";
import style from "../spotifyComp/spotifyComp_styles";
import Logo from "../../images/spotify.png";

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const useStyles = createUseStyles(style);
const clientId = "71065ebe26e54f9fbcb24c05da4a382f";
const redirectUri = "http://127.0.0.1:3000/dashboard";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
];

const  SpotifyComp = () => {
    const [token, setToken] = useState(null);
    const [item, setItem] = useState(null);
    const [is_playing, setIs_playing] = useState(null);
    const [progress_ms, setProgress_ms] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        const hash = window.location.hash.replace("#","");
        if (hash) {
            const parsedHash = parse(hash);
            setToken(parsedHash.access_token);
            getCurrentlyPlaying(parsedHash.access_token);
        }
    },[]);

    const getCurrentlyPlaying = (token) => {
        return fetch("https://api.spotify.com/v1/me/player", {
            method: 'GET',
            headers: new Headers({
                "Authorization": `Bearer ${token}`
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    console.log(res)
                    setIs_playing(res.is_playing);
                    setItem(res.item);
                    setProgress_ms(res.progress_ms);
                }
            }).catch(() => {})

    };
        return (
            <div className={classes.App}>
                    {!token && (
                        <div className={classes.SpotCo}><a
                        className={classes.BtnHeader}
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                        >
                            <img className={classes.img} src={Logo}/>
                            <div className={classes.login}>Login to Spotify</div>
                        </a></div>
                    )}
                    {(token && item )&& (
                        <Player
                            item={item}
                            is_playing={is_playing}
                            progress_ms={progress_ms}
                        />
                    )}
            </div>
        );
    };

export default SpotifyComp;
