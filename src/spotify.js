export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/callback/";
const clientId = "fca162e1b48440199e1386f40d70e7b7"

const scopes = [
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-read-playback-position",
    "app-remote-control",
    "user-read-email",
    "user-read-private",
    "playlist-modify-public",
    "user-modify-playback-state",
    "user-follow-modify",
    "user-read-currently-playing",
    "user-follow-read",
    "user-library-modify"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;    

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial;
        }, {})
}
