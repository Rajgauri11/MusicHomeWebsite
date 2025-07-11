const searchBox = document.getElementById('search-box');
const searchIcon = document.getElementById('search-icon');
const searchContainer = document.querySelector('.search-container');

// Highlight when search icon is clicked
searchIcon.addEventListener('click', () => {
  searchBox.focus(); // Focus the input box
  searchContainer.classList.add('highlight'); // Add highlight class
});

// Remove highlight when input loses focus
searchBox.addEventListener('blur', () => {
  searchContainer.classList.remove('highlight');
});

// document.querySelectorAll('.mixes, .playlists').forEach(container => {
//     container.addEventListener('wheel', (e) => {
//       e.preventDefault();
//       container.scrollLeft += e.deltaY;
//     });
//   });

  

// JavaScript for toggling active filter button
const filterButtons = document.querySelectorAll('.filter-btn');

// Add event listener to each button to toggle active state
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add 'active' class to the clicked button
    button.classList.add('active');
  });
});



// Auto-scroll behavior for the Made For You section (optional)
let scrollIndex = 0;
const dailyMixes = document.querySelectorAll('.mix');



// script.js

// Handle tab switching
const tabs = document.querySelectorAll('.filter-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Hide all content sections
    contents.forEach(content => content.classList.remove('active'));

    // Show the clicked tab's content
    const targetContent = document.querySelector(`.${tab.dataset.tab}`);
    targetContent.classList.add('active');
  });
});


/*Play the music*/ 

    // const songs = [
    //   { id: "16", songName: "Jeene Laga Hoon", artist: "Atif Aslam" },
    //   { id: "2", songName: "Brown Rang", artist: "Yo Yo Honey Singh" },
    // ];

    let index = 0;
    let music = new Audio('audio/9.mp3'); // Create a new Audio instance
    let masterPlay = document.getElementById('masterPlay');
    let poster_master_play = document.getElementById('poster_master_play');
    let title = document.getElementById('title');
    let progress = document.getElementById('progress');
    let currentTime = document.getElementById('currentTime');
    let duration = document.getElementById('duration');

    
    // Play/Pause functionality for the master play button
    masterPlay.addEventListener('click', () => {
        if (music.paused || music.currentTime <= 0) {
            music.play();
            masterPlay.classList.remove('bxs-right-arrow');
            masterPlay.classList.add('bx-pause-circle');
        } else {
            music.pause();
            masterPlay.classList.add('bxs-right-arrow');
            masterPlay.classList.remove('bx-pause-circle');
        }
    });
    
    // Playlist play button functionality
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            index = e.target.id; // Get the ID of the clicked button
            console.log("Event triggered on element:", e.target);
        console.log("ID of the clicked element:", e.target.id);
            console.log(index);
            
            music.src = `audio/${index}.mp3`; // Set the correct audio file
            poster_master_play.src = `img/${index}.jpeg`; // Set the correct poster
            music.play(); // Play the selected song
    
            // Update the master play button and wave animation
            masterPlay.classList.remove('bxs-right-arrow');
            masterPlay.classList.add('bx-pause-circle');
            // wave.classList.add('active1');
    
            // Update the song title
            // let songDetails = songs.find((song) => song.id === index); // Find the song details
            // if (songDetails) {
            //     title.innerHTML = songDetails.songName; // Update the title
            // }
        });
    });
      

    // Update progress bar and time
    music.addEventListener('timeupdate', () => {
      const progressPercent = (music.currentTime / music.duration) * 100;
      progress.style.width = `${progressPercent}%`;
      currentTime.innerText = formatTime(music.currentTime);
      duration.innerText = formatTime(music.duration);
    });

    function formatTime(sec) {
      let minutes = Math.floor(sec / 60);
      let seconds = Math.floor(sec % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }