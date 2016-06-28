var audioFile;
var storyImg;
var intv;
window.onload = function () {
    document.addEventListener('deviceready', init, false);
    init();
}

function init() {
    var btnPlay = document.getElementById('btnPlay');
    var btnPause = document.getElementById('btnPause');
    var btnStop = document.getElementById('btnStop');

    btnPlay.addEventListener('click', playAudio, false);
    btnPause.addEventListener('click', pauseAudio, false);
    btnStop.addEventListener('click', stopAudio, false);

    //audioFile = document.getElementById('audioFile');
    var src = cordova.file.applicationDirectory + "www/assets/threepigs.mp3";
    audioFile = new Media(src);
    storyImg = document.getElementById('storyImg');
}

function changeStory(story) {
    var src = cordova.file.applicationDirectory + "www/assets/" + story + ".mp3";
    audioFile = new Media(src);
    storyImg.src = "img/" + story + ".jpg";
}

function playAudio() {
    audioFile.play();
}

function pauseAudio() {
    audioFile.pause();
}

function stopAudio() {
    //pauseAudio();
    //audioFile.currentTime = 0;
    audioFile.stop(); //Media object
}

function startTimer() {
    intv = setInterval(updateTime, 1000);
}

function stopTimer() {
    clearInterval(intv);
    updateTime();
}

function updateTime() {
    document.getElementById('timeOut').innerHTML = "Elapsed Time: " + secsToMins(story.currentTime);
}

function secsToMins(seconds) {
    var minutes = Math.floor(seconds / 60);
    var theSeconds = seconds - minutes * 60;
    if (theSeconds > 9) {
        return minutes + ":" + Math.round(theSeconds);
    } else {
        return minutes + ":0" + Math.round(theSeconds);
    }
}