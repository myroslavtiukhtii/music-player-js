(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const AUDIO = document.querySelector(".audio");
    const PLAYBTN = document.querySelector(".buttons__play");
    const DURATIONTIME = document.querySelector(".end-time");
    const SEEKSLIDER = document.querySelector(".seek-slider");
    const CURRENTTIME = document.querySelector(".current-time");
    const MUTEBTN = document.querySelector(".mute");
    const COVERIMG = document.querySelector(".cover");
    const SONGNAME = document.querySelector(".title__song-name");
    const ARTISTNAME = document.querySelector(".title__song-artist");
    const LOOPBTN = document.querySelector(".loop");
    let data = false;
    let songs = [ {
        artist: "Coldplay",
        songName: "A Sky Full of Stars",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/d/d2/Coldplay_-_A_Sky_Full_of_Stars_sample.ogg",
        imgSrc: "./img/pictures/Coldplay_-_A_Sky_Full_of_Stars_(Single).png"
    }, {
        artist: "Lana Del Rey",
        songName: "Summertime Sadness",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/c/c0/Lana_Del_Rey_-_Summertime_Sadness.ogg",
        imgSrc: "./img/pictures/SummertimeSadnessOfficial.png"
    }, {
        artist: "Linkin Park",
        songName: "In the End",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/4/48/In_the_End.ogg",
        imgSrc: "./img/pictures/LinkinParkIntheEnd.jpg"
    } ];
    AUDIO.addEventListener("loadedmetadata", (() => {
        setSliderMax();
        getDuration();
        data = true;
    }));
    const setSliderMax = () => {
        SEEKSLIDER.max = Math.floor(AUDIO.duration);
    };
    function getDuration() {
        DURATIONTIME.textContent = calculateTime(AUDIO.duration);
    }
    const calculateTime = secs => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };
    PLAYBTN.addEventListener("click", startPlay);
    let playState = false;
    function startPlay() {
        if (false == playState && true == data) {
            playState = true;
            AUDIO.play();
            PLAYBTN.classList.toggle("active");
        } else if (true == playState) {
            AUDIO.pause();
            playState = false;
            PLAYBTN.classList.toggle("active");
        }
    }
    SEEKSLIDER.addEventListener("input", (() => {
        CURRENTTIME.textContent = calculateTime(SEEKSLIDER.value);
    }));
    SEEKSLIDER.addEventListener("change", (() => {
        AUDIO.currentTime = SEEKSLIDER.value;
    }));
    let songTracker = 0;
    AUDIO.addEventListener("timeupdate", (() => {
        SEEKSLIDER.value = Math.floor(AUDIO.currentTime);
        CURRENTTIME.textContent = calculateTime(SEEKSLIDER.value);
        if (AUDIO.ended) {
            AUDIO.currentTime = 0;
            PLAYBTN.classList.toggle("active");
            playState = false;
            songTracker++;
            addPlaylists();
            startPlay();
        }
    }));
    songs.forEach(addPlaylists);
    function addPlaylists() {
        if (songTracker > songs.length - 1) songTracker = 0;
        if (songTracker < 0) songTracker = 0;
        COVERIMG.src = songs[songTracker].imgSrc;
        SONGNAME.innerHTML = songs[songTracker].songName;
        ARTISTNAME.innerHTML = songs[songTracker].artist;
        AUDIO.src = songs[songTracker].audioSrc;
    }
    LOOPBTN.addEventListener("click", toLoopSong);
    let loop = false;
    function toLoopSong() {
        const ICONLOOP = document.querySelector(".loop__icon");
        ICONLOOP.classList.toggle("active");
        if (AUDIO.hasAttribute("loop")) {
            AUDIO.removeAttribute("loop");
            loop = false;
        } else {
            loop = true;
            AUDIO.setAttribute("loop", "true");
        }
    }
    const BTNPREV = document.querySelector(".buttons__prev");
    const BTNNEXT = document.querySelector(".buttons__next");
    BTNNEXT.addEventListener("click", toNextSong);
    BTNPREV.addEventListener("click", toPrevSong);
    function toNextSong() {
        songTracker++;
        addPlaylists();
        if (playState = true) AUDIO.play();
        AUDIO.currentTime = 0;
        PLAYBTN.classList.add("active");
    }
    function toPrevSong() {
        songTracker--;
        addPlaylists();
        if (playState = true) AUDIO.play();
        AUDIO.play();
        AUDIO.currentTime = 0;
        PLAYBTN.classList.add("active");
    }
    MUTEBTN.addEventListener("click", muteMusic);
    function muteMusic() {
        MUTEBTN.classList.toggle("active");
        AUDIO.muted = !AUDIO.muted;
    }
    window["FLS"] = true;
    isWebp();
})();