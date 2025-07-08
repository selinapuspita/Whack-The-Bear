const tanah = document.querySelectorAll('.tanah');
const bear = document.querySelectorAll('.bear');
const score = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;
let countdown; // interval untuk timer

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        return randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanBear() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300, 1500);
    tRandom.classList.add('muncul');
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanBear();
        }
    }, wRandom);
}

function mulaiTimer(detik) {
    timerDisplay.textContent = detik;
    countdown = setInterval(() => {
        detik--;
        timerDisplay.textContent = detik;
        if (detik <= 0) {
            clearInterval(countdown);
            selesai = true;
            setTimeout(() => {
                alert('Waktu habis! Skor kamu: ' + skor);
                location.reload(); // 🔁 auto refresh setelah alert
            }, 300); // kasih jeda sedikit sebelum reload
        }
    }, 1000);
}

function play() {
    selesai = false;
    skor = 0;
    score.textContent = 0;
    mulaiTimer(20); // 💡 ubah durasi jika perlu
    munculkanBear();
}

function pukul() {
    skor++;
    score.textContent = skor;
    this.parentNode.classList.remove('muncul');
    pop.play();
}

bear.forEach(t => {
    t.addEventListener('click', pukul);
});
