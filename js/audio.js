document.addEventListener("DOMContentLoaded", function(event) {

var music = document.getElementById('music');
var pButton = document.getElementById('pButton'); 
var currentTimeContainer = document.getElementById('current-time');
var durationContainer = document.getElementById('duration');
var seekSlider = document.getElementById('seek-slider');
var vButton = document.getElementById('vButton');
var volSlider = document.getElementById('volume-slider');
var volumeReg = document.getElementById('volume-reg');
var raf;

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if(isIE11){
    seekSlider.style.marginTop = "18px";
}

// get display time
function calculateTime (secs) {
    var minutes = Math.floor(secs / 60);
    var seconds = Math.floor(secs % 60);
    var returnedSeconds = seconds.toString();
    if(seconds < 10){
        returnedSeconds = '0' + returnedSeconds;
    }
    
    var returnedMinutes = minutes.toString();
    if(minutes < 10){
        returnedMinutes = '0' + returnedMinutes;
    }
    return returnedMinutes + ':' + returnedSeconds;
}

// animation
function whilePlaying() {
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

// duration music
function displayDuration() {
    durationContainer.textContent = calculateTime(Math.floor(music.duration));
}

// init
if (music.readyState > 0) {
    // display duration
    displayDuration();
} else {
    music.addEventListener('loadedmetadata', function() {
        displayDuration();
    });
}

// range change
seekSlider.addEventListener('change', function() {
    cancelAnimationFrame(raf);
    var durrationTime = Math.floor(music.duration);
    var jumpTime = Math.floor(seekSlider.value/100 * durrationTime);
    currentTimeContainer.textContent = calculateTime(jumpTime);
});

// jump music mouse up
seekSlider.addEventListener('mouseup', function() {
    var durrationTime = Math.floor(music.duration);
    var jumpTime = Math.floor(seekSlider.value/100 * durrationTime);
    music.currentTime = jumpTime;
    raf = requestAnimationFrame(whilePlaying);
});

// volume show/hide
vButton.addEventListener('mouseover', function() {
    volSlider.style.visibility = "visible";
});
volumeReg.addEventListener('mouseleave', function() {
    volSlider.style.visibility = "hidden";
});

volSlider.addEventListener('mouseover', function() {
    if(volSlider.style.visibility.toString() != 'hidden')
    {
        volSlider.style.visibility = "visible";
    }
});

vButton.addEventListener('mouseover', function() {
    volSlider.style.visibility = "visible";
});

// volume change
volSlider.addEventListener('change', function() {
    var volValue = volSlider.value;
    setLevelVolume();
    music.volume = volValue / 100;
});

// volume mute/unmute
vButton.addEventListener('click', function() {
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
