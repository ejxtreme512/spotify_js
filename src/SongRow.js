import React from 'react';
import './SongRow.css';
import { useDataLayerValue } from './DataLayer';


function SongRow({ track }) {
    const [{ item }, dispatch] = useDataLayerValue();
    const setItem = () => {
        dispatch({
            type: 'SET_ITEM',
            item: track,
          });
    }

    return (
        <div className="songRow" onClick={setItem}>
            <img className="songRow__album" src={track.album.images[0].url} alt="" />
            <div className="songRow__info">
                <h1> {track.name}</h1>
                <p>
                    {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                    {track.album.name}
                </p>
            </div>
        </div>
    );
}

export default SongRow
