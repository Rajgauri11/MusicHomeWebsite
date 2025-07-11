

// Tracks the index of the currently playing song in the songs array
let currentSongIndex = 0;

// Holds an array of song objects, each containing details like title, artist, source file, image.
const songs = [
    { id: 1, title: "Jeene Laga Hoon", artist: "Atif Aslam", src: "audio/16.mp3", img: "img/16.jpeg" },
    { id: 2, title: "Abhi Mujh Mein Kahin", artist: "Sonu Nigam", src: "audio/2.mp3", img: "img/2.jpeg" },
    { id: 3, title: "Ajab Si", artist: "KK", src: "audio/3.mp3", img: "img/3.jpeg" },
    { id: 4, title: "Allah Maaf Kare", artist: "Pritam, Sonu Nigam", src: "audio/4.mp3", img: "img/4.jpeg" },
    { id: 5, title: "Beete Lamhein", artist: "KK", src: "audio/5.mp3", img: "img/5.jpeg" },
    { id: 6, title: "Bhool Bhulaiyaa", artist: "Pritam", src: "audio/6.mp3", img: "img/6.jpeg" },
    { id: 7, title: "Blue Eyes", artist: "Yo Yo Honey Singh", src: "audio/7.mp3", img: "img/7.jpeg" },
    { id: 8, title: "Call Aundi", artist: "Yo Yo Honey Singh", src: "audio/8.mp3", img: "img/8.jpeg" },
    { id: 9, title: "Dil Diyan Gallan", artist: "Atif Aslam", src: "audio/9.mp3", img: "img/9.jpeg" },
    { id: 10, title: "Dil Ibaadat", artist: "KK", src: "audio/10.mp3", img: "img/10.jpeg" },
    { id: 11, title: "Do Pal", artist: "Sonu Nigam", src: "audio/11.mp3", img: "img/11.jpeg" },
    { id: 12, title: "Gerua", artist: "Pritam", src: "audio/12.mp3", img: "img/12.jpeg" },
    { id: 13, title: "Haan Tu Hain", artist: "KK", src: "audio/13.mp3", img: "img/13.jpeg" },
    { id: 14, title: "I Am In Love", artist: "Pritam,KK", src: "audio/14.mp3", img: "img/14.jpeg" },
    { id: 15, title: "Ishq Bina", artist: "Sonu Nigam", src: "audio/15.mp3", img: "img/15.jpeg" },
    { id: 16, title: "Jiya", artist: "Arjit Singh", src: "audio/17.mp3", img: "img/17.jpeg" },
    { id: 17, title: "Kabhi Jo Baadal Barse", artist: "Arjit Singh", src: "audio/18.mp3", img: "img/18.jpeg" },
    { id: 18, title: "Kahani", artist: "Pritam", src: "audio/19.mp3", img: "img/19.jpeg" },
    { id: 19, title: "Khuda Jaane", artist: "KK", src: "audio/20.mp3", img: "img/20.jpeg" },
    { id: 20, title: "Kudi Tu Butter", artist: "Yo Yo Honey Singh", src: "audio/21.mp3", img: "img/21.jpeg" },
    { id: 21, title: "Labon Ko", artist: "KK", src: "audio/22.mp3", img: "img/22.jpeg" },
    { id: 22, title: "Love Dose", artist: "Yo Yo Honey Singh", src: "audio/23.mp3", img: "img/23.jpeg" },
    { id: 23, title: "Main Agar Kahoon", artist: "Sonu Nigam", src: "audio/24.mp3", img: "img/24.jpeg" },
    { id: 24, title: "Main Hoon Na", artist: "Sonu Nigam", src: "audio/25.mp3", img: "img/25.jpeg" },
    { id: 25, title: "Manwa Laage", artist: "Arjit Singh", src: "audio/26.mp3", img: "img/26.jpeg" },
    { id: 26, title: "Mast Magan", artist: "Arjit Singh", src: "audio/27.mp3", img: "img/27.jpeg" },
    { id: 27, title: "Mera Pyar Tera Pyar", artist: "Arjit Singh", src: "audio/28.mp3", img: "img/28.jpeg" },
    { id: 28, title: "Mere Yaara", artist: "Arjit Singh", src: "audio/29.mp3", img: "img/29.jpeg" },
    { id: 29, title: "Paris Ka Trip", artist: "Yo Yo Honey Singh", src: "audio/30.mp3", img: "img/30.jpeg" },
    { id: 33, title: "Oh Sinchan", artist: "PoadCast", src: "audio/63.mp3", img: "img/63.jpeg" },
    { id: 34, title: "Simple PoadCast", artist: "PoadCast", src: "audio/64.mp3", img: "img/64.jpeg" },
    { id: 35, title: "Mahabharat", artist: "PoadCast", src: "audio/65.mp3", img: "img/65.jpeg" },
    // { id: 30, title: "Oh Sinchan", artist: "PoadCast", src: "audio/63.mp3", img: "img/63.jpeg" },
    
];
// let lastListenedSong = JSON.parse(localStorage.getItem("lastListenedSong")) || null;
// Creates an Audio object to manage song playback.
const audio = new Audio();

// DOM Elements
const playButton = document.getElementById("masterPlay");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const poster = document.getElementById("poster_master_play");
const title = document.getElementById("title");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById('progressContainer');
const searchInput = document.getElementById("search-box");
const searchResults = document.getElementById("searchResults");
const download_music=document.getElementById('download-music');
// const lastListenButton = document.getElementById("lastListen");

// Utility function to format time
// Converts time (in seconds) to MM:SS format for display on the player.
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Sets up and starts playing the selected song by updating the audio source, UI (poster, title), and current index.
// Function to play a song
const playSong = (songIndex) => {
    const song = songs[songIndex];
    if (!song) {
        console.error("Song not found");
        return;
    }

    // Update the player UI
    poster.src = song.img;
    title.innerHTML = `${song.title} <div class="subtitle">${song.artist}</div>`;
    progressBar.style.width = "0%"; // Reset progress bar

    // Update the download button
    download_music.href = song.src; // Set the source of the download link
    download_music.download = `${song.title}.mp3`; // Set the file name for the download

    // Update the current song index
    currentSongIndex = songIndex;

    // Log song details (for debugging)
    console.log(`Playing: ${song.title} by ${song.artist}`);
};

// Update the player UI with the current song
// Updates the player UI with song details but doesn’t auto-play.
const updatePlayer = (index) => {
    const song = songs[index];
    if (!song) {
        console.error("Song not found");
        return;
    }

    // Update UI but don't auto-play the audio
    audio.src = song.src;
    poster.src = song.img;
    title.innerHTML = `${song.title} <div class="subtitle">${song.artist}</div>`;
    progressBar.style.width = "0%"; // Reset progress bar

    // Update the download button
    download_music.href = song.src; // Set the source of the download link
    download_music.download = `${song.title}.mp3`; // Set the file name for the download
};

// Add event listeners to song items
const initializeSongListeners = () => {
    document.querySelectorAll(".play-icon").forEach((icon, index) => {
        icon.addEventListener("click", () => {
            playSong(index); // Pass the song index to the playSong function
        });
    });
};

// Play or pause the song
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.classList.replace("bxs-right-arrow", "bx-pause-circle");
    } else {
        audio.pause();
        playButton.classList.replace("bx-pause-circle", "bxs-right-arrow");
    }
});

// Initialize the player when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    updatePlayer(currentSongIndex); // Initialize with the first song
    initializeSongListeners(); // Ensure play-icon listeners are initialized
});




// Next song
const playNextSong = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer(currentSongIndex);
    audio.play();
    playButton.classList.replace("bxs-right-arrow", "bx-pause-circle");
};

nextButton.addEventListener("click", playNextSong);

// Previous song
prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer(currentSongIndex);
    audio.play();
    playButton.classList.replace("bxs-right-arrow", "bx-pause-circle");
});

//play the automatically next song
audio.addEventListener("ended", playNextSong);

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration || 0);
});

// Function to update the song's progress when clicking on the progress bar
const setProgress = (e) => {
    const width = progressContainer.offsetWidth; // Get the total width of the progress bar container
    const clickX = e.offsetX; // Get the click position relative to the container
    const progress = (clickX / width) * audio.duration; // Calculate the new playback position

    // Update the audio player's current time to the new position
    audio.currentTime = progress;
};

// Add event listener to the progress container to update the song's position when clicked
progressContainer.addEventListener("click", setProgress);


// Handle playlist interaction
// The index parameter keeps track of the current position of the icon in the list, allowing you to identify which play button was clicked.
document.querySelectorAll(".play-icon").forEach((icon, index) => {
    icon.addEventListener("click", () => {
        currentSongIndex = index;
        // console.log(currentSongIndex);
        
        updatePlayer(currentSongIndex);
        audio.play();
        playButton.classList.replace("bxs-right-arrow", "bx-pause-circle");
    });
});



// Tab switching logic
const tabs = document.querySelectorAll(".filter-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove active class from all buttons
        tabs.forEach((btn) => btn.classList.remove("active"));
        // Add active class to the clicked button
        tab.classList.add("active");

        // Hide all tab contents
        tabContents.forEach((content) => content.classList.remove("active"));

        // Show the corresponding tab content
        const tabId = tab.getAttribute("data-tab");
        document.querySelector(`.tab-content.${tabId}`).classList.add("active");
    });
});


// Search functionality
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ""; // Clear previous results

    if (query) {
        const filteredSongs = songs.filter((song) =>
            song.title.toLowerCase().includes(query)
        );

        filteredSongs.forEach((song) => {
            const resultItem = document.createElement("div");
            resultItem.textContent = song.title;
            resultItem.addEventListener("click", () => {
                currentSongIndex = songs.findIndex((s) => s.id === song.id);
                updatePlayer(currentSongIndex);
                audio.play();
                playButton.classList.remove("bxs-right-arrow");
                playButton.classList.add("bx-pause-circle");
                searchResults.style.display = "none";
            });
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = filteredSongs.length ? "block" : "none";
    } else {
        searchResults.style.display = "none";
    }
});

// Sidebar tabs
const menuTabs = document.querySelectorAll(".tab-button");
const songLists = document.querySelectorAll(".song-list");
let lastPlayedSong = null; // To store the last played song

menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove active class from all tabs
        menuTabs.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked tab
        tab.classList.add("active");

        // Show corresponding song list
        const tabId = tab.getAttribute("data-tab");
        songLists.forEach((list) => {
            list.classList.remove("active");
            if (list.classList.contains(tabId)) {
                list.classList.add("active");
            }
        });
// Get necessary DOM elements
const playButtons = document.querySelectorAll('.play-icon'); // All play buttons
const lastListeningContainer = document.querySelector('.lastListening');
const lastSongPlaceholder = document.getElementById('last-song-placeholder');

// Function to handle song play and update last listening
function playSong(event) {
    // Find the parent song-item element
    const songItem = event.target.closest('.song-item');

    // Extract song details
    const songTitle = songItem.querySelector('h5').innerText;
    const songArtist = songItem.querySelector('p').innerText;
    const songImage = songItem.querySelector('img').src;

    // Update the last listening section
    addToLastListening(songTitle, songArtist, songImage);
}

// Function to add a song to the last listening section
function addToLastListening(title, artist, image) {
    // Clear placeholder text
    lastSongPlaceholder.style.display = 'none';

    // Get the existing list of last played songs from localStorage
    let lastPlayedSongs = JSON.parse(localStorage.getItem('lastPlayedSongs')) || [];

    // Check if the song is already in the list (to avoid duplicates)
    const isAlreadyAdded = lastPlayedSongs.some(song => song.title === title && song.artist === artist);
    if (!isAlreadyAdded) {
        // Add the new song to the beginning of the array
        lastPlayedSongs.unshift({ title, artist, image });

        // Keep only the last 5 songs (or any desired number)
        if (lastPlayedSongs.length > 5) {
            lastPlayedSongs.pop();
        }

        // Save the updated list back to localStorage
        localStorage.setItem('lastPlayedSongs', JSON.stringify(lastPlayedSongs));
    }

    // Update the last listening section in the DOM
    updateLastListeningUI(lastPlayedSongs);
}

// Function to update the Last Listening UI
function updateLastListeningUI(lastPlayedSongs) {
    lastListeningContainer.innerHTML = ''; // Clear the container

    // Generate HTML for each song in the list
    lastPlayedSongs.forEach(song => {
        const lastListeningHTML = `
            <div class="song-item">
                <img src="${song.image}" alt="${song.title}">
                <div class="song-info">
                    <h5>${song.title}</h5>
                    <p>${song.artist}</p>
                </div>
                <i class="bx bx-play-circle play-icon"></i>
            </div>
        `;
        lastListeningContainer.innerHTML += lastListeningHTML;
    });
}

// Restore last listening songs on page load
window.addEventListener('DOMContentLoaded', () => {
    const lastPlayedSongs = JSON.parse(localStorage.getItem('lastPlayedSongs')) || [];
    if (lastPlayedSongs.length > 0) {
        updateLastListeningUI(lastPlayedSongs);
    }
});

// Add event listeners to play buttons
playButtons.forEach(button => {
    button.addEventListener('click', playSong);
});


    });
});

// Add event listeners to all song items
const songItems = document.querySelectorAll(".play-icon");
songItems.forEach((item) => {
    item.addEventListener("click", () => {
        const title = item.dataset.title;
        const artist = item.dataset.artist;
        const img = item.dataset.img;

        // Track the last played song
        lastPlayedSong = { title, artist, img };

        // Play the selected song
        playSong(lastPlayedSong);
    });
});




// Initialize player with the first song
updatePlayer(currentSongIndex);

// Progress bar update
progressBar.addEventListener("input", (e) => {
    const progress = e.target.value;
    console.log("Seek to:", progress + "%");
  });
  
  document.querySelector('.heart-icon').addEventListener('click', function () {
    // Get the currently playing song using the currentSongIndex
    const currentSong = songs[currentSongIndex];
    
    if (!currentSong) {
        alert("No song is currently playing.");
        return;
    }

    // Retrieve existing favorites from localStorage, or initialize an empty array if not present
    let favorites = JSON.parse(localStorage.getItem('likedSong')) || [];

    // Check if the current song is already in the favorites
    const isSongAlreadyFavorited = favorites.some(song => song.id === currentSong.id);

    if (!isSongAlreadyFavorited) {
        // Add the current song details to favorites
        favorites.push({
            title: currentSong.title,
            artist: currentSong.artist,
            src: currentSong.src
        });

        // Save the updated favorites back to localStorage
        localStorage.setItem('likedSong', JSON.stringify(favorites));

        alert(`"${currentSong.title}" by ${currentSong.artist} has been added to your favorites!`);
    } else {
        alert(`"${currentSong.title}" is already in your favorites!`);
    }
});




