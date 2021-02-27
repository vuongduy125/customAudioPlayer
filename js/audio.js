document.addEventListener("DOMContentLoaded", function(event) {

var music = document.getElementById('music');
var pButton = document.getElementById('pButton'); 
const currentTimeContainer = document.getElementById('current-time');
const durationContainer = document.getElementById('duration');
const seekSlider = document.getElementById('seek-slider');
const vButton = document.getElementById('vButton');
const volSlider = document.getElementById('volume-slider');
const volumeReg = document.getElementById('volume-reg');

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${returnedMinutes}:${returnedSeconds}`;
}

const whilePlaying = () => {
    var currentTime = Math.floor(music.currentTime);
    var durrationTime = Math.floor(music.duration);
    var seekValue = Math.floor(currentTime/durrationTime * 100);

    // display current time
    currentTimeContainer.textContent = calculateTime(currentTime);

    // display seekSlider
    seekSlider.value = seekValue;
    if(seekValue == 100){
        setPlayWhenMusicOver();
    }
    raf = requestAnimationFrame(whilePlaying);
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(Math.floor(music.duration));
}

// init
if (music.readyState > 0) {
    // display duration
    displayDuration();
} else {
    music.addEventListener('loadedmetadata', () => {
        displayDuration();
    });
}

// range change
seekSlider.addEventListener('input', () => {
    var durrationTime = Math.floor(music.duration);
    var jumpTime = Math.floor(seekSlider.value/100 * durrationTime);
    currentTimeContainer.textContent = calculateTime(jumpTime);
    cancelAnimationFrame(raf);
});

// volume show/hide
vButton.addEventListener('mouseover', () => {
    volSlider.style.visibility = "visible";
});
volumeReg.addEventListener('mouseleave', () => {
    volSlider.style.visibility = "hidden";
});

volSlider.addEventListener('mouseover', () => {
    if(volSlider.style.visibility.toString() != 'hidden')
    {
        volSlider.style.visibility = "visible";
    }
});

vButton.addEventListener('mouseover', () => {
    volSlider.style.visibility = "visible";
});

// volume change
volSlider.addEventListener('input', () => {
    var volValue = volSlider.value;
    setLevelVolume();
    music.volume = volValue / 100;
});

// volume mute/unmute
vButton.addEventListener('click', () => {
    var volValue = volSlider.value;
    vButton.className = "";
    if(volValue == 0){
        music.volume = 0.5;
        volSlider.value = 50;
        vButton.className = "volume-med";
    }
    else{
        music.volume = 0;
        volSlider.value = 0;
        vButton.className = "mute";
    }
});

// jump music mouse up
seekSlider.addEventListener('mouseup', () => {
    var durrationTime = Math.floor(music.duration);
    var jumpTime = Math.floor(seekSlider.value/100 * durrationTime);
    music.currentTime = jumpTime;
    raf = requestAnimationFrame(whilePlaying);
});

// play button event listenter
pButton.addEventListener("click", play);

// set level volume
function setLevelVolume(){
    var volValue = volSlider.value;
    vButton.className = "";
    if(volValue == 0){
        vButton.className = "mute";
    }
    else if(volValue < 40){
        vButton.className = "volume-low";
    }
    else if(volValue < 70){
        vButton.className = "volume-med";
    }
    else{
        vButton.className = "volume";
    }
}

// play and pause
function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";

        requestAnimationFrame(whilePlaying);
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

function setPlayWhenMusicOver(){
    pButton.className = "";
    pButton.className = "play";
    seekSlider.value = 0;
    currentTimeContainer.textContent = "00:00"
    cancelAnimationFrame(raf);
}

/* DOMContentLoaded*/
});
