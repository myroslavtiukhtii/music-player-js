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
    let data = false;
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
    AUDIO.addEventListener("timeupdate", (() => {
        SEEKSLIDER.value = Math.floor(AUDIO.currentTime);
        CURRENTTIME.textContent = calculateTime(SEEKSLIDER.value);
    }));
    MUTEBTN.addEventListener("click", muteMusic);
    function muteMusic() {
        MUTEBTN.classList.toggle("active");
        AUDIO.muted = !AUDIO.muted;
    }
    window["FLS"] = true;
    isWebp();
})();