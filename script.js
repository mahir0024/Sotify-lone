console.log("Welcome to Spotify");

// Songs array
const songs = [
    {songName: "Tu Hai Kahan", filePath: "songs/2.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tu Hai Kahan slowed-reverb", filePath: "songs/1.mp3", coverPath: "covers/2.jpg"},
   
    // Add more songs here
];

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath); // Initialize with the first song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('previous');
let gif = document.getElementById('gif'); // Add this line

// Dynamically generate song list
const songListContainer = document.querySelector('.songItemContainer');
songs.forEach((song, i) => {
    const songItem = document.createElement('div');
    songItem.classList.add('songItem');
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${i + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">04:52 <i class="far fa-play-circle" id="${i}"></i></span>
        </span>
    `;
    songListContainer.appendChild(songItem);
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    console.log("Play/Pause clicked");
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show GIF
        console.log("Playing: " + songs[songIndex].filePath);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide GIF
        console.log("Paused: " + songs[songIndex].filePath);
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    console.log("Seekbar changed");
});

// Load and play the song at the given index
const loadSong = (index) => {
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1; // Show GIF
    console.log("Loaded: " + songs[index].filePath);
    // Update song name and cover
    document.querySelector('.songName').innerText = songs[index].songName;
    document.querySelector('.songInfo img').src = songs[index].coverPath;
};

// Event listeners for next and previous buttons
nextButton.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    console.log("Next clicked");
});

prevButton.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    console.log("Previous clicked");
});
