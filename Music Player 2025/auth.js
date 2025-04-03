function getTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
}

let accessToken = getTokenFromUrl();

if (accessToken) {
    localStorage.setItem("spotify_token", accessToken);
    document.getElementById("loginBtn").style.display = "none";  
} else {
    accessToken = localStorage.getItem("spotify_token");
}

if (!accessToken) {
    document.getElementById("loginBtn").style.display = "block";  
}

// Spotify Login Button URL Setup
const clientId = "397dfef0925c4bdc88fbb4609e1c9107";  // अपनी Spotify Client ID डालें
const redirectUri = "http://localhost:3000/index.html";  
const scopes = "user-read-private user-read-email";

document.getElementById("loginBtn").href = 
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
