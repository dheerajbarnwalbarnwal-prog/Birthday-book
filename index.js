
const book = document.getElementById("book");
const pages = document.querySelectorAll(".page");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const pageCount = document.getElementById("pageCount");
const progressBar = document.getElementById("progressBar");

let currentPage = 0;
const totalPages = pages.length;

pages.forEach((page, index) => {
    page.style.zIndex = totalPages - index;
});

function updateBook() {
    pages.forEach((page, index) => {
        if (index < currentPage) {
            page.classList.add("flipped");
            page.style.zIndex = index + 1;
        } else {
            page.classList.remove("flipped");
            page.style.zIndex = totalPages - index;
        }
    });

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;

    if (currentPage === 0) {
        pageCount.textContent = `COVER · 1 / ${totalPages}`;
    } else {
        pageCount.textContent =
            `PAGE ${currentPage} / ${totalPages - 1}`;
    }

    progressBar.style.width =
        `${((currentPage + 1) / totalPages) * 100}%`;
}

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateBook();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updateBook();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") nextBtn.click();
    if (event.key === "ArrowLeft") prevBtn.click();
});

// Music controls
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.innerHTML = "♫ Pause music";
        } catch (error) {
            console.error("Music error:", error);
            alert("Music play nahi ho raha. Song file ka naam aur path check karo.");
        }
    } else {
        music.pause();
        musicBtn.innerHTML = "♫ Play music";
    }
});

// Birthday candle
const flame = document.getElementById("flame");
const wishBtn = document.getElementById("wishBtn");
const wishMessage = document.getElementById("wishMessage");

wishBtn.addEventListener("click", () => {
    flame.classList.add("off");
    wishMessage.textContent =
        "Your wish is on its way. Happy Birthday, Kanak! ♡";
    wishBtn.textContent = "Wish made ✨";
    wishBtn.disabled = true;
});

// Sparkles
const sparkleArea = document.getElementById("sparkles");

for (let i = 0; i < 35; i++) {
    const sparkle = document.createElement("span");

    sparkle.textContent = "✦";
    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.color = "#d9b57e";
    sparkle.style.opacity = Math.random() * 0.5 + 0.1;
    sparkle.style.fontSize = Math.random() * 12 + 5 + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.animation =
        `twinkle ${Math.random() * 3 + 2}s infinite alternate`;

    sparkleArea.appendChild(sparkle);
}

// Touch swipe for mobile
let touchStartX = 0;

book.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
});

book.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].screenX;
    const difference = touchEndX - touchStartX;

    if (difference < -50) nextBtn.click();
    if (difference > 50) prevBtn.click();
});

updateBook();
