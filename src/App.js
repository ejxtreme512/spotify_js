import React, { useEffect, useState } from "react";
import "./App.css";
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

//creates an instance of spotify inside the app
const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);

  //run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      //gives access token to the spotify api
      spotify.setAccessToken(_token);
      //return a promise
      spotify.getMe().then(user =>{
        console.log("🧔",user);
      });
    }

    console.log("I have a token:point", token);
  }, []);

  return (
    // BEM
    <div className="app">
      {
        token ? (
          <h1> I am logged in</h1>
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
