import React, { useEffect, useState } from "react";
import "./App.css";
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

//creates an instance of spotify inside the app
const spotify = new SpotifyWebApi();

function App() {
  const[{user,token },dispatch] = useDataLayerValue();
  

  //run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })

      //gives access token to the spotify api
      spotify.setAccessToken(_token);
      //return a promise
      spotify.getMe().then(user =>{
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) =>{
        dispatch({
          type:"SET_PLAYLISTS",
          playlists:playlists,
        });
      })
      spotify.getPlaylist('37i9dQZEVXcJ0yAcFGWoYY').then((response)=>{
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        });
      });
    };
  }, []);

  return <div className="app">{token ?
    <Player spotify={spotify} /> :
    <Login />}</div>;
}

export default App;
