async function searchSong() {
    if (!accessToken) {
        alert("Please login first!");
        return;
    }

    let query = document.getElementById("searchInput").value;
    if (!query) {
        alert("Enter a song name to search!");
        return;
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        displayResults(data.tracks.items);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(tracks) {
    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = ""; 

    tracks.forEach(track => {
        let trackElement = document.createElement("div");
        trackElement.innerHTML = `
            <p>${track.name} - ${track.artists[0].name}</p>
            <audio controls src="${track.preview_url}"></audio>`;
        resultDiv.appendChild(trackElement);
    });
}

let audio = document.getElementById("audioPlayer");

function playMusic() {
    audio.play();
}

function pauseMusic() {
    audio.pause();
}
