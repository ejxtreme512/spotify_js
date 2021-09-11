import React, { useState, useEffect } from 'react'
import "./Footer.css"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { useDataLayerValue } from "./DataLayer";
import { IconButton } from '@material-ui/core';
function Footer() {
    const [sdkReady, setSDKReady] = useState(false);
    const [player, setPlayer] = useState();
    const [playbackReady, setPlaybackReady] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [{ token, item }, dispatch] = useDataLayerValue();
    const onPlay = () => {
        player.togglePlay();
    }
    const nextTrack = () => {
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });
    }
    const prevTrack = () => {
        player.previousTrack().then(() => {
            console.log('Set to previous track!');
        });
    }
    const setupWebPlaybackEvents = async () => {
        let { Player } = window.Spotify;
        const play = new Player({
            name: 'My app Player',
            volume: 10,
            getOAuthToken: async callback => callback(token)
        });
        play.addListener("ready", data => {
            setPlaybackReady(true);
            setDeviceId(data.device_id);
            console.log(data);
        });
        play.addListener("not_ready", data => {
            console.log('Not ready', data);
        });
        console.log(play);
        play.connect();
        setPlayer(play);
    };
    window.onSpotifyWebPlaybackSDKReady = () => {
        setSDKReady(true);
    }
    useEffect(async () => {
        if (token && sdkReady) {
            await setupWebPlaybackEvents();
        }
    }, [sdkReady, token]);
    useEffect(() => {
        if (playbackReady) {
            console.log('Ready to roll');
        }
    }, [playbackReady]);
    useEffect(() => {
        if (sdkReady && item) {
            play({
                playerInstance: player,
                spotify_uri: item.uri,
            });
        }
    }, [player, item])

    const play = ({
        spotify_uri,
        playerInstance: {
            _options: {
                getOAuthToken
            }
        }
    }) => {
        getOAuthToken(access_token => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
            });
        });
    };


    return (
        <div className="footer">
            <div className="footer__left">
                <img className="footer__albumLogo" src="https://upload.wikimedia.org/wikipedia/en/7/76/Usher-raymond-album-1994.jpg" alt="" />
                <div className="footer__songInfo" >
                    <h4>yea!</h4>
                    <p>Usher</p>
                </div>
            </div>

            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <IconButton onClick={prevTrack}>
                    <SkipPreviousIcon className="footer__icon" />
                </IconButton>
                <IconButton onClick={onPlay}>
                    <PlayCircleOutlineIcon fontSize="large" className="footer_icon" />
                </IconButton>
                <IconButton onClick={nextTrack}>
                    <SkipNextIcon className="footer__icon" />
                </IconButton>
                <RepeatIcon className="footer__green" />
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Footer
