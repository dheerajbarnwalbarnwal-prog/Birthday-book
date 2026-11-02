const pages = [...document.querySelectorAll('.page')];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCount = document.getElementById('pageCount');
let current = 0;

function renderBook() {
  pages.forEach((page, index) => {
    page.style.zIndex = index < current ? index + 1 : pages.length - index;
    page.classList.toggle('flipped', index < current);
  });
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === pages.length - 1;
  pageCount.textContent = `${current === 0 ? 'Cover' : 'Page'} · ${current + 1} / ${pages.length}`;
}
function nextPage(){ if(current < pages.length - 1){ current++; renderBook(); } }
function previousPage(){ if(current > 0){ current--; renderBook(); } }
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', previousPage);
document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') nextPage();
  if(e.key === 'ArrowLeft') previousPage();
});
renderBook();

// Birthday candle interaction
const wishBtn = document.getElementById('wishBtn');
const flame = document.getElementById('flame');
const wishMessage = document.getElementById('wishMessage');
wishBtn.addEventListener('click', () => {
  flame.classList.add('out');
  wishMessage.textContent = 'Wish made! May it come true, Kanak. ♡';
  wishBtn.textContent = 'Wish sent ✨';
  wishBtn.disabled = true;
});

// Music starts only after the visitor presses Play (browser autoplay restriction).
const musicBtn = document.getElementById('musicBtn');
let birthdayMusic = null;
musicBtn.addEventListener('click', async () => {
  if (!birthdayMusic) {
    birthdayMusic = new Audio('assets/music/birthday.mp3');
    birthdayMusic.loop = true;
  }
  if (birthdayMusic.paused) {
    try {
      await birthdayMusic.play();
      musicBtn.textContent = '♫ Pause music';
    } catch (error) {
      musicBtn.textContent = 'Add birthday.mp3';
      alert('Add your MP3 song inside assets/music and name it birthday.mp3.');
    }
  } else {
    birthdayMusic.pause();
    musicBtn.textContent = '♫ Play music';
  }
});

// Pause videos when turning to another page.
function pauseHiddenVideos() {
  pages.forEach((page, index) => {
    if (index !== current) page.querySelectorAll('video').forEach(video => video.pause());
  });
}
nextBtn.addEventListener('click', pauseHiddenVideos);
prevBtn.addEventListener('click', pauseHiddenVideos);
