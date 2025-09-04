const playlist = ["./audio/audio_1.mp3"];
let currentTrack = parseInt(localStorage.getItem("track") || "0");
let currentTime = parseFloat(localStorage.getItem("time") || "0");
let isPlaying = localStorage.getItem("isPlaying") !== "false";

const container = document.getElementById("music-player-container");
container.innerHTML = `
  <audio id="bg-music" autoplay></audio>
  <div class="music-toggle">
    <button id="music-btn">${isPlaying ? "🔊" : "🔇"}</button>
  </div>
`;

const audio = document.getElementById("bg-music");
const button = document.getElementById("music-btn");

audio.src = playlist[currentTrack];
audio.currentTime = currentTime;
if (!isPlaying) audio.pause();

setInterval(() => {
    localStorage.setItem("time", audio.currentTime);
}, 1000);

audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    localStorage.setItem("track", currentTrack);
    localStorage.setItem("time", 0);
    audio.src = playlist[currentTrack];
    audio.play();
});

button.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        button.textContent = "🔊";
        localStorage.setItem("isPlaying", "true");
    } else {
        audio.pause();
        button.textContent = "🔇";
        localStorage.setItem("isPlaying", "false");
    }
});
