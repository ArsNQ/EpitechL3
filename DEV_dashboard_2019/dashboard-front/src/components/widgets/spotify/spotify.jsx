import React, {useCallback, useEffect, useState} from 'react';
import style from './spotify_style';
import { createUseStyles} from "react-jss";
import {Card} from "../../../design_system/card/card";
import {useSpotifyToken} from "../../../hooks/useSpotifyToken";
import Logo from "../../../images/spotify.png";
import {Spring} from "react-spring/renderprops";


const useStyle = createUseStyles(style);

const Spotify = () => {
    const classes = useStyle();
    const token = useSpotifyToken();
    const [music, setMusic] = useState(null);

    useEffect(() => {
        if (token) {
            getCurrentlyPlaying().then((res) => {
                if (res) {
                    setMusic({...res?.item, progress_ms:res?.progress_ms});
                } else {
                    setMusic(null);
                }
            })
        }
    },[token]);

    const getCurrentlyPlaying = useCallback(() => {
        return fetch("https://api.spotify.com/v1/me/player", {
            method: 'GET',
            headers: new Headers({
                "Authorization": `Bearer ${token}`
            })
        })
            .then((res) => {
                try {
                     return res.json();
                }catch (e) {
                    throw ({message: 'error'})
                }
            })
            .catch((err) => {console.log(err)})

    },[token]);

    if (!music) {
        return(
            <Card className={classes.card}>
                    <img className={classes.img} src={Logo}/>
            </Card>
        )
    }

    return(
        <Card className={classes.card}>
            <img className={classes.nowPlayingImg2} src={music?.album?.images && music.album.images[0].url} />
                <div className={classes.nowPlayingSide}>
                    <div className={classes.rightSide}>
                        <div className={classes.nowPlayingName}>{music?.name}</div>
                        <div className={classes.nowPlayingArtist}>
                            {music?.artists && music.artists[0].name}
                        </div>

                        {music && (
                            <Spring config={{ duration: music?.duration_ms - music?.progress_ms }} from={{ width: `${music?.progress_ms * 100 / music?.duration_ms}%` }}  to={{ width: '100%' }}>
                                {
                                    (props) => {
                                        return(
                                            <div className={classes.progress}>
                                                <div className={classes.progressBar} style={{...props}} />
                                            </div>
                                        )
                                    }
                                }
                            </Spring>
                        )}


                    </div>
                </div>
        </Card>
    )
};

export default Spotify;
