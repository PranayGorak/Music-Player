// 🔥 MANUAL SONG LIST (Put your exact file names here)
let songs = [
    "Kushagra-Bharath-Saaheal-Finding - Copy (2).mp3",
    "Mithoon-Arijit-Singh-Sanam-Re-Fr.mp3",
    "Shreya-Ghoshal-Ankit-Tiwari-Sun - Copy (2).mp3",
    "Shreya-Ghoshal-Ankit-Tiwari-Sun.mp3",
    "Vishal-Dadlani-Shalmali-Kholgade - Copy (2).mp3",
    "Vishal-Dadlani-Shalmali-Kholgade.mp3"
];

function formatTime(totalSeconds) {
    totalSeconds = Math.floor(totalSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

let currentSong = new Audio();

const playMusic = (track, pause = false) => {

    currentSong.src = "songs/" + track; // ✅ FIXED PATH

    if (!pause) {
        currentSong.play();
        play.src = "svgs/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {

    playMusic(songs[0], true);

    let songUL = document.querySelector(".songList ul");

    songs.forEach(song => {
        songUL.innerHTML += `
        <li>
            <img class="invert" src="svgs/music.svg">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Pranay</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="svgs/playnow.svg">
            </div>
        </li>`;
    });

    Array.from(document.querySelectorAll(".songList li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "svgs/pause.svg";
        } else {
            currentSong.pause();
            play.src = "svgs/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range input").addEventListener("input", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
    });

    // 🔥 Cards play random song
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            let randomIndex = Math.floor(Math.random() * songs.length);
            playMusic(songs[randomIndex]);
        });
    });
}

main();
