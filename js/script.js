const player = document.querySelector('#music-audio');
const musicName = document.querySelector('#music-name');
const playMusic = document.querySelector('#play-button');
const backMusic = document.querySelector('#back-button');
const nextMusic = document.querySelector('#next-button');
const currentTime = document.querySelector('#current-time');
const durationMusic = document.querySelector('#duration');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const videoIcon = document.querySelector('#music-icon video');

import songs from "./songs.js";

const buttonPlay = '<span class="material-symbols-outlined">play_arrow</span>';
const buttonPause = '<span class="material-symbols-outlined">pause</span>';

let index = 0;

backMusic.onclick = () => prevNextMusic('back');
nextMusic.onclick = () => prevNextMusic();
playMusic.onclick = () => playPause();
progressBar.onclick = (e) => {
    /* Clicando e indo => */
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
}

player.ontimeupdate = updateTime;
/* Tempo e Progreçao da Musica */
function updateTime() {
    const atualTimeM = Math.floor(player.currentTime / 60);
    const atualTimeS = Math.floor(player.currentTime % 60);
    const atualTime = atualTimeM + ':' + zeroF(atualTimeS);

    currentTime.textContent = atualTime;

    const durationF = isNaN(player.duration) ? 0 : player.duration;
    const durationM = Math.floor(durationF / 60);
    const durationS = Math.floor(durationF % 60);

    const RealDuration = durationM + ':' + zeroF(durationS);
    durationMusic.innerHTML = RealDuration;

    const progressWidth = durationF ? (player.currentTime / durationF) * 100 : 0;

    progress.style.width = progressWidth + '%';

}

/* Coloca o zero antes do numero */
function zeroF(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return n;
    }
}

/* Pulando ou Voltando a musica */
const prevNextMusic = (type = 'next') => {
    if ((type == 'next' && index + 1 === songs.length) || type === 'init') {
        index = 0;
    } else if (type === 'back' && index === 0) {
        index = songs.length - 1;
    } else {
        index = type === 'back' ? (index === 0 ? songs.length - 1 : index - 1) : (index + 1) % songs.length;
    }

    player.src = songs[index].src;
    videoIcon.src = songs[index].icon;
    musicName.innerHTML = songs[index].name;
    
    player.play();
    videoIcon.play();

    playMusic.innerHTML = buttonPause;

    if (type !== 'init') {
        updateTime();
    }
}

/* Muta e coloca o video em loop */
videoIcon.addEventListener('loadedmetadata', function() {
    videoIcon.muted = true;
    videoIcon.loop = true;
});

/* Pausa e Starta */
function playPause() {
    if (player.paused) {
        player.play();
        videoIcon.play();
        playMusic.innerHTML = buttonPause;
    } else {
        player.pause();
        videoIcon.pause();
        playMusic.innerHTML = buttonPlay;
    }
}

prevNextMusic('init');
