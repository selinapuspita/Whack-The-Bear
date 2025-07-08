const tanah = document.querySelectorAll('.tanah');
const bear = document.querySelectorAll('.bear');
const score = document.querySelector('.score');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
    const t = Math.floor (Math.random () * tanah.length);
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu (min, max) {
    return Math.round (Math.random () * (max-min) + min);
}

function munculkanBear () {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300,1500);
    tRandom.classList.add('muncul');
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) 
        {
        munculkanBear();
        }
    }, wRandom);
}

function play() {
    selesai = false;
    skor = 0;
    score.textContent = 0;
    munculkanBear();
    setTimeout(() => {
        selesai = true;
    }, 10000);
}

function pukul () {
    skor++;
    score.textContent = skor;
    this.parentNode.classList.remove('muncul');
    pop.play();
}

bear.forEach(t => {
    t.addEventListener('click', pukul)
    });
