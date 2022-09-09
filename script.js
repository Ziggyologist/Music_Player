const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
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
  }
}

// EventListener
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);
music.addEventListener("timeupdate", updateProgressBar);
