var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
    gainNode = audioContext.createGain(),
    sampleURL = 'http://at-cdn-s01.audiotool.com/2014/11/06/documents/NuwWTmytBREltgPKnVveLg5ExnlXb/0/368ef1e656224834a531a7565d007b4b.mp3',
    sampleBuffer,
    sound,
    playButton   = document.querySelector('.play'),
    stopButton   = document.querySelector('.stop'),
    muteButton   = document.querySelector('.mute'),
    unmuteButton = document.querySelector('.unmute');

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

unmuteButton.onclick = function () {
    voiceUnmute();
};

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            sampleBuffer = buffer;
            playButton.disabled = false;
            playButton.innerHTML = 'Play';
            unmuteButton.disabled = true;
        });
    };

    request.send();
}

// set our sound buffer, loop, and connect to destination
function setupSound() {
    sound = audioContext.createBufferSource();
    sound.buffer = sampleBuffer;

    sound.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

function playSound() {
    setupSound();
    UI_Play('play');
    sound.start(0);
    sound.onended = function () {
        UI_Play('stop');
    }
}

function stopSound() {
    UI_Play('stop');
    sound.stop(0);
}

function voiceMute() {
    gainNode.gain.value = 0;
    UI_Mute('mute');
}

function voiceUnmute() {
    gainNode.gain.value = 1;
    UI_Mute('unmute');
}

function UI_Play(state){
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

function UI_Mute(state){
    switch(state){
        case 'mute':
            muteButton.disabled = true;
            unmuteButton.disabled = false;
            break;
        case 'unmute':
            muteButton.disabled = false;
            unmuteButton.disabled = true;
            break;
    }
}

/* ios enable sound output */
window.addEventListener('touchstart', function(){

    //create empty buffer
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}, false);





// function voiceMute() {
//     if(muteButton.id == "") {
//     gainNode.gain.value = 0;
//     muteButton.id = "activated";
//     muteButton.innerHTML = "Unmute";
//     } else {
//         gainNode.gain.value = 1;
//         muteButton.id = "";
//         muteButton.innerHTML = "Mute";
//     }
// }


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




