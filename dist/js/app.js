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
    const PLAYBTN = document.querySelector(".buttons__play");
    PLAYBTN.addEventListener("click", startPlay);
    function startPlay() {
        PLAYBTN.classList.toggle("active");
    }
    const MUTEBTN = document.querySelector(".mute");
    MUTEBTN.addEventListener("click", muteMusic);
    function muteMusic() {
        MUTEBTN.classList.toggle("active");
    }
    const AUDIO = document.querySelector(".audio");
    const DURATIONTIME = document.querySelector(".end-time");
    const calculateTime = secs => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };
    const displayDuration = () => {
        DURATIONTIME.textContent = calculateTime(AUDIO.duration);
    };
    if (AUDIO.readyState > 0) displayDuration(); else AUDIO.addEventListener("loadedmetadata", (() => {
        displayDuration();
    }));
    window["FLS"] = true;
    isWebp();
})();