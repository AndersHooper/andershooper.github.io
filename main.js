const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

/* ================ AUDIO PLAYER START =================== */

const audioPlayer = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const volumeSlider = document.getElementById("volume");
const songTitleElement = document.querySelector(".song-info__title");
const progressFilled = document.getElementById("progress-filled");
const songList = document.getElementById("song-list");
const progressBar = document.querySelector(".player__progress");

const songs = [
  {
    title: "Goblin",
    src: "./clips/goblin.wav",
    duration: "0:07"
  },
  {
    title: "Voice Sound Effects",
    src: "./clips/vsoundeffects.wav",
    duration: "0:16"
  },
  {
    title: "Esentric Voice",
    src: "./clips/esentric.wav",
    duration: "0:04"
  },
  {
    title: "Loud Type of Voice (not recorded on microphone)",
    src: "./clips/loudvoice.wav",
    duration: "0:14"
  }
];

let currentSongIndex = 0;

function loadSong(songIndex) {
  audioPlayer.src = songs[songIndex].src;
  songTitleElement.textContent = songs[songIndex].title;
  updateSongList();
}

function playOrPauseSong() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.querySelector("img").src =
      "https://img.icons8.com/ios/50/000000/pause.png";
  } else {
    audioPlayer.pause();
    playPauseButton.querySelector("img").src =
      "https://img.icons8.com/ios/50/000000/play--v1.png";
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playOrPauseSong();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playOrPauseSong();
}

function updateVolume() {
  audioPlayer.volume = volumeSlider.value;
}

function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressFilled.style.width = `${progress}%`;
}
function seekAudio(event) {
  const progressBarWidth = progressBar.offsetWidth;
  const clickPosition = event.offsetX;
  const audioduration = audioPlayer.duration;
  const seekTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}
function createSongList() {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const songItem = document.createElement("li");
    songItem.classList.add("song-item");
    songItem.innerHTML = `
      <span class="song-item__title">${song.title}</span>
      <span class="song-item__duration">${song.duration}</span>
    `;
    songItem.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playOrPauseSong();
    });
    songList.appendChild(songItem);
  });
}

function updateSongList() {
  const songItems = document.querySelectorAll(".song-item");
  songItems.forEach((item, index) => {
    if (index === currentSongIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

loadSong(currentSongIndex);
createSongList();

audioPlayer.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", seekAudio);

playPauseButton.addEventListener("click", playOrPauseSong);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
volumeSlider.addEventListener("input", updateVolume);

/* ================ AUDIO PLAYER END ====================== */

/* ================= VOICE OVER VIDEO START================= */

const videoContainer = document.querySelector(".video-container");
const videoItems = document.querySelectorAll(".video-item");

videoContainer.addEventListener("scroll", () => {
  videoItems.forEach((videoItem) => {
    const rect = videoItem.getBoundingClientRect();
    const containerRect = videoContainer.getBoundingClientRect();
    const scrollHeight = containerRect.height / 2;
    const videoItemCenter = rect.top + rect.height / 2;

    const scale = Math.max(
      0.5,
      1 - (2 * Math.abs(videoItemCenter - scrollHeight)) / containerRect.height
    );
    videoItem.style.transform = `scale(${scale})`;

    const video = videoItem.querySelector("video");
    if (Math.abs(videoItemCenter - scrollHeight) < containerRect.height / 4) {
      video.play();
    } else {
      video.pause();
    }
  });
});

/* ================= VOICE OVER VIDEO END================= */
