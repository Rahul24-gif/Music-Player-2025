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

document.getElementById("loginBtn").href = 
    "https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email";
