var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
    gainNode = audioContext.createGain(),
    sampleURL = 'https://dl.dropboxusercontent.com/s/47hgqffhjcsli6r/dinky-jam.mp3',
    sampleBuffer,
    sound,
    playButton = document.querySelector('.play'),
    stopButton = document.querySelector('.stop'),
    muteButton = document.querySelector('.mute');

// load our sound
init();

function init() {
    loadSound(sampleURL);
}

playButton.onclick = function () {
    playSound();
};

stopButton.onclick = function () {
    stopSound();
};

muteButton.onclick = function () {
    voiceMute();
};

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            sampleBuffer = buffer;
            playButton.disabled = false;
            playButton.innerHTML = 'play';
        });
    };

    request.send();
}

// set our sound buffer, loop, and connect to destination
function setupSound() {

    sound = audioContext.createBufferSource();
    sound.buffer = sampleBuffer;

    sound.connect(audioContext.destination);
}

// play sound and enable / disable buttons
function playSound() {
    setupSound();
    UI('play');
    sound.start(0);
    sound.onended = function () {
        UI('stop');
    }
}
// stop sound and enable / disable buttons
function stopSound() {
    UI('stop');
    sound.stop(0);
}

function voiceMute() {
    if(muteButton.id == "") {
        gainNode.gain.value = 0;
        muteButton.id = "activated";
        muteButton.innerHTML = "Unmute";
    } else {
        gainNode.gain.value = 1;
        muteButton.id = "";
        muteButton.innerHTML = "Mute";
    }
}

function UI(state){
    switch(state){
        case 'play':
            playButton.disabled = true;
            stopButton.disabled = false;
            break;
        case 'stop':
            playButton.disabled = false;
            stopButton.disabled = true;
            break;
    }
}

/* ios enable sound output */
window.addEventListener('touchstart', function(){

    // sound.connect(gainNode);
    // gainNode.connect(audioContext.destination);
    //create empty buffer
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}, false);






//
// class AudioPlayer {
//     constructor(audioUrl) {
//
//     }
// }
//
//
//
//
//
//
//
//
// this.player = new AudioPlayer('');
//
//
// this.player.play()
// this.player.pause();




