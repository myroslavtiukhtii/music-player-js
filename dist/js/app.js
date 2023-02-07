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
    const BLURIMG = document.querySelector(".cover__blur");
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
    }, {
        artist: "Eminem",
        songName: "Godzilla",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/e/ec/Eminem_-_Godzilla_featuring_Juice_Wrld.ogg",
        imgSrc: "./img/pictures/Godzilla.jpg"
    }, {
        artist: "Dua Lipa",
        songName: "Don't Start Now",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/7/7e/Dua_Lipa_Don%27t_Start_Now.ogg",
        imgSrc: "./img/pictures/Dua_Lipa_-_Don't_Start_Now.png"
    }, {
        artist: "Mark Ronson",
        songName: "Uptown Funk",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/f/fd/Uptown_Funk.ogg",
        imgSrc: "./img/pictures/Mark_Ronson_-_Uptown_Funk_(feat._Bruno_Mars)_(Official_Single_Cover).png"
    }, {
        artist: "Adele",
        songName: "Hello",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/f/f4/Adele_-_Hello_Clip.ogg",
        imgSrc: "./img/pictures/Adele_-_Hello_(Official_Single_Cover).png"
    }, {
        artist: "Beatles",
        songName: "All you need is love",
        audioSrc: "https://upload.wikimedia.org/wikipedia/en/2/29/All_You_Need_Is_Love.ogg",
        imgSrc: "./img/pictures/All_You_Need_Is_Love_(Beatles_single_-_cover_art).jpg"
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
            COVERIMG.classList.toggle("active");
        } else if (true == playState) {
            AUDIO.pause();
            playState = false;
            PLAYBTN.classList.toggle("active");
            COVERIMG.classList.toggle("active");
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
            COVERIMG.classList.toggle("active");
            playState = false;
            songTracker++;
            addPlaylists();
            startPlay();
        }
    }));
    const LIKEBTN = document.querySelector(".main__like");
    let likedSong = [];
    LIKEBTN.addEventListener("click", (() => {
        if (likedSong.includes(songTracker)) {
            for (let i = 0; i < likedSong.length; i++) if (likedSong[i] === songTracker) {
                likedSong.splice(i, 1);
                LIKEBTN.classList.remove("active");
            }
        } else {
            LIKEBTN.classList.add("active");
            likedSong.push(songTracker);
        }
    }));
    songs.forEach(addPlaylists);
    function addPlaylists() {
        if (songTracker > songs.length - 1) songTracker = 0;
        if (songTracker < 0) songTracker = 0;
        if (likedSong.includes(songTracker)) LIKEBTN.classList.add("active"); else if (!likedSong.includes(songTracker)) LIKEBTN.classList.remove("active");
        BLURIMG.src = songs[songTracker].imgSrc;
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
        COVERIMG.classList.add("active");
    }
    function toPrevSong() {
        songTracker--;
        addPlaylists();
        if (playState = true) AUDIO.play();
        AUDIO.play();
        AUDIO.currentTime = 0;
        PLAYBTN.classList.add("active");
        COVERIMG.classList.add("active");
    }
    MUTEBTN.addEventListener("click", muteMusic);
    function muteMusic() {
        MUTEBTN.classList.toggle("active");
        AUDIO.muted = !AUDIO.muted;
    }
    const PLAYLISTBTN = document.querySelector(".main__btnplaylist");
    const PLAYLISTMENU = document.querySelector(".main_playlist");
    PLAYLISTBTN.addEventListener("click", script_menuOpen);
    function script_menuOpen() {
        PLAYLISTMENU.classList.toggle("active");
    }
    songs.forEach(((item, index) => {
        let li = document.createElement("li");
        li.classList.add("playlist__item");
        li.insertAdjacentHTML("afterbegin", `\n    <div class="playlist__number">${index + 1}</div>\n    <img class="playlist__cover" src="${item.imgSrc}" alt="Picture cover">\n    <div class="playlist__titles">\n        <h2 class="playlist__song-name">${item.songName}</h2>\n        <h3 class="playlist__song-artist">${item.artist}</h3>\n    </div>`);
        PLAYLISTMENU.appendChild(li);
    }));
    const PLAYLISTITEM = document.querySelectorAll(".playlist__item");
    for (let i = 0; i < PLAYLISTITEM.length; i++) PLAYLISTITEM[i].addEventListener("click", (() => {
        songTracker = i;
        addPlaylists();
        if (playState = true) AUDIO.play();
        AUDIO.currentTime = 0;
        PLAYBTN.classList.add("active");
        COVERIMG.classList.add("active");
        script_menuOpen();
    }));
    document.addEventListener("mousemove", parallax);
    function parallax(event) {
        this.querySelectorAll(".mouse").forEach((shift => {
            const position = shift.getAttribute("value");
            const x = (window.innerWidth - event.pageX * position) / 90;
            const y = (window.innerHeight - event.pageY * position) / 90;
            shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }));
    }
    window["FLS"] = true;
    isWebp();
})();