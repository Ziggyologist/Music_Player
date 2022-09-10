const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const playerContainter = document.querySelector(".player-container");
const extraTab = document.querySelector(".extra-tab");
const expand = document.querySelector("#expand");
const volume = document.querySelector("#volume");
const volumeDownEl = document.querySelector("#volume-down");
const question = document.querySelector("#question");
let isPlaying = false;

// Music
const songs = [
  {
    name: "twisterium-aspire",
    displayName: "Aspire",
    artist: "Twisterium",
  },
  {
    name: "vlad-gluschenko-warm-days",
    displayName: "Warm Days",
    artist: "Vlad Gluschenko",
  },
  {
    name: "wayne-john-bradley-just-breathe",
    displayName: "Just Breathe",
    artist: "Wayne John Bradley",
  },
];

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Event Listeners
// Play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;
// On load - select first song
loadSong(songs[songIndex]);
music.volume = 0.5;

// Next songs
function playNext() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function playPrev() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Update Progress
function updateProgressBar(e) {
  if (isPlaying) {
    const {duration, currentTime} = e.srcElement;
    // console.log(duration, currentTime);
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // console.log(duration);
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds =
      Math.floor(duration % 60) < 10
        ? `0${Math.floor(duration % 60)}`
        : Math.floor(duration % 60);
    // console.log(durationMinutes, durationSeconds);
    // delay switching element to avoid Nan
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for progress
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds =
      Math.floor(currentTime % 60) < 10
        ? `0${Math.floor(currentTime % 60)}`
        : Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    // Progress Bar reaches 100%
  }
}
// Set Progress bar
function setProgressBar(e) {
  // console.log(e);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  // console.log("width: " + width, "X: " + clickX);
  const {duration} = music;
  music.currentTime = (clickX / width) * duration;
}
function volumeUp() {
  // console.log(music.volume);
  music.muted = false;
  music.volume = music.volume + 0.1;
  volumeDownEl.classList.replace("fa-volume-mute", "fa-volume-down");
  if (music.volume >= 0.99) music.volume = 0.9;
}
function volumeDown() {
  // console.log(music.volume);
  music.volume = music.volume - 0.1;
  if (music.volume <= 0.01) {
    music.muted = true;
    music.volume = 0.1;
    volumeDownEl.classList.replace("fa-volume-down", "fa-volume-mute");
  }
}

// EventListener
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", playNext);
expand.addEventListener("click", function () {
  extraTab.classList.remove("hidden");
  expand.style.display = "none";
});
question.addEventListener("click", function () {
  extraTab.classList.add("hidden");
  expand.style.display = "block";
});
volume.addEventListener("click", volumeUp);
volumeDownEl.addEventListener("click", volumeDown);
