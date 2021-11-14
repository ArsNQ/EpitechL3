import React from "react";
import style from './Player_styles'
import {createUseStyles} from "react-jss";
import Logo from "../../../images/spotify.png";

const useStyles = createUseStyles(style);


const Player = props => {
    const classes = useStyles();
    const backgroundStyles = {
        backgroundImage: props?.item?.album?.images && `url(${props?.item?.album?.images[0].url})`,
    };

    const progressBarStyles = {
        width: (props?.progress_ms * 100 / props.item?.duration_ms) + '%'
    };

    console.log(props)

    return (
        <div className={classes.App}>
            <div className={classes.mainWrapper}>
                <div className={classes.leftSide}>
                    <div className={classes.nowPlayingImg}>
                        <img className={classes.nowPlayingImg2} src={props?.item?.album?.images && props.item.album.images[0].url} />
                    </div>
                </div>
                    <div className={classes.nowPlayingSide}>
                        <div className={classes.rightSide}>
                            <img className={classes.img} src={Logo}/>
                            <div className={classes.nowPlayingName}>{props?.item?.name}</div>
                                <div className={classes.nowPlayingArtist}>
                                    {props?.item?.artists && props.item.artists[0].name}
                                </div>
                                <div className={classes.nowPlayingStatus}>
                                    {props.is_playing ? "Playing" : "Paused"}
                                </div>
                                <div className={classes.progress}>
                                    <div className={classes.progressBar} style={progressBarStyles}/>
                            </div>
                    </div>
                </div>
                <div className={classes.background} style={backgroundStyles} />{" "}
            </div>
        </div>
    );
}
export default Player;
