async function searchSong() {
    let accessToken = localStorage.getItem("spotify_token");

    if (!accessToken) {
        alert("Please login first!");
        return;
    }

    let query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Please enter a song name!");
        return;
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Spotify API Response:", data);
        displayResults(data.tracks.items);
    } catch (error) {
        console.error("Error fetching songs:", error);
        alert("Failed to fetch songs. Please try again.");
    }
}

function displayResults(tracks) {
    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";

    // ✅ Filter only playable songs (having preview_url)
    let playableTracks = tracks.filter(track => track.preview_url);

    if (playableTracks.length === 0) {
        resultDiv.innerHTML = "<p>No playable previews available. Try searching another song.</p>";
        return;
    }

    playableTracks.forEach(track => {
        let trackElement = document.createElement("div");
        trackElement.innerHTML = `
            <p><strong>${track.name}</strong> - ${track.artists[0].name}</p>
            <audio controls src="${track.preview_url}"></audio>
        `;
        resultDiv.appendChild(trackElement);
    });
}


// 🎵 Play Selected Song
function playMusic(url) {
    let audio = document.getElementById("audioPlayer");

    if (!url) {
        alert("Preview not available for this track.");
        return;
    }

    audio.src = url;
    audio.play();
}


function pauseMusic() {
    let audio = document.getElementById("audioPlayer");
    audio.pause();
}
