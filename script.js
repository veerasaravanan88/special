// ==========================================
// 🎈 CONFIGURATION - EDIT YOUR DETAILS HERE
// ==========================================
const config = {
    // 1. Recipient's Name
    personName: "My Special Person",

    // 2. Birthday Date (Format: 'YYYY-MM-DD')
    // Make sure to update the year to the next upcoming birthday!
    birthdayDate: "2026-10-12",

    // 3. Heartfelt Message (Displayed in the opening letter)
    heartfeltMessage: `Today is a beautiful reminder that someone truly special came into this world. 

May your life always be filled with happiness, beautiful memories, endless laughter, and dreams that come true. 

You deserve every wonderful thing life has to offer. Happy Birthday! ❤️`,

    // 4. Modal Surprise Message (Typed out when they click "Open Your Surprise")
    surpriseMessage: "Wishing you a day as radiant and beautiful as your smile. I have prepared a little digital journey to celebrate you. Enjoy every moment!",

    // 5. Final Message (Displayed at the end of the page)
    finalMessage: "Thank you for being you. Here's to many more beautiful years together, making unforgettable memories! 🥂",

    // 6. Gallery Images and Captions
    // Replace the src URLs with local paths like "assets/photo1.jpg" if you add your own images.
    gallery: [
        { src: "photo1.jpeg", caption: "That magical day..." },
        { src: "photo2.jpeg", caption: "Unforgettable moments ✨" },
        { src: "photo3.jpeg", caption: "Smiling with you 😊" },
        { src: "photo4.jpeg", caption: "Perfect  ❤️" }
    ]
};

// ==========================================
// 🚀 INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Set Configured Data
    document.getElementById('personName').textContent = config.personName;
    document.getElementById('heartfeltMessageText').textContent = config.heartfeltMessage;
    document.getElementById('finalSurpriseText').textContent = config.finalMessage;

    initTypewriter();
    initCountdown();
    initGallery();
    initScrollAnimations();
    createFloatingHearts();
    initWishBalloons();
    initEnvelopeClick();
    initCursorEffects();
});

// ==========================================
// ✍️ TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
    const subtitle = document.getElementById('typewriterSubtitle');
    const text = `Wishing you the happiest birthday ever, ${config.personName}...`;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start after a slight delay
    setTimeout(typeWriter, 1000);
}

// ==========================================
// 🎵 MUSIC CONTROLS
// ==========================================
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    // Check if source is actually provided
    if (!bgMusic.querySelector('source').getAttribute('src')) {
        alert("To play music, please replace the audio source path in index.html with a valid music file.");
        return;
    }

    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🎵';
        musicToggle.innerHTML = `<span id="musicIcon">🎵</span> Play Music`;
    } else {
        bgMusic.play().catch(e => {
            console.warn("Audio play failed: ", e);
            alert("Could not play the audio file. Please check if the file path is correct.");
        });
        musicIcon.textContent = '⏸️';
        musicToggle.innerHTML = `<span id="musicIcon">⏸️</span> Pause Music`;
    }
    isPlaying = !isPlaying;
});

// ==========================================
// 🎁 SURPRISE MODAL
// ==========================================
const openBtn = document.getElementById('openSurpriseBtn');
const modal = document.getElementById('surpriseModal');
const closeBtn = document.getElementById('closeModalBtn');
const giftBox = document.getElementById('giftBox');
const modalMessage = document.getElementById('modalMessage');
const typedModalMessage = document.getElementById('typedModalMessage');
let hasTypedModal = false;

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    fireConfetti(1.5);
    playChime(659.25);
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    // We don't reset the typed message immediately so it doesn't look glitchy closing
});

giftBox.addEventListener('click', () => {
    if (!giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');
        fireConfetti(3.5);
        playChime(783.99);

        setTimeout(() => {
            modalMessage.classList.remove('hidden');
            if (!hasTypedModal) {
                typeModalText();
            }
        }, 600);
    }
});

function typeModalText() {
    hasTypedModal = true;
    let i = 0;
    typedModalMessage.textContent = '';
    function type() {
        if (i < config.surpriseMessage.length) {
            typedModalMessage.textContent += config.surpriseMessage.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// ==========================================
// 🎉 CONFETTI EFFECT
// ==========================================
function fireConfetti(durationSeconds = 3) {
    if (typeof confetti === 'function') {
        const duration = durationSeconds * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff1493', '#d4af37', '#e6e6fa']
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff1493', '#d4af37', '#e6e6fa']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

// ==========================================
// ⏳ COUNTDOWN TIMER
// ==========================================
function initCountdown() {
    const bdayParts = config.birthdayDate.split('-');
    // Parse as local midnight
    let birthdayDate = new Date(bdayParts[0], bdayParts[1] - 1, bdayParts[2]).getTime();

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        // If distance is negative but within 24h, it's the actual day
        const oneDay = 1000 * 60 * 60 * 24;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = String(days).padStart(2, '0');
            document.getElementById("hours").textContent = String(hours).padStart(2, '0');
            document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
            document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
        } else if (distance <= 0 && distance > -oneDay) {
            // It's the birthday!
            document.getElementById("countdownContainer").classList.add("hidden");
            document.getElementById("birthdayMessage").classList.remove("hidden");
            document.querySelector("#countdownSection .section-title").classList.add("hidden");
            clearInterval(x);
        } else {
            // Birthday passed for the year.
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            clearInterval(x);
        }
    }, 1000);
}

// ==========================================
// 📸 LIGHTBOX GALLERY
// ==========================================
let currentImgIndex = 0;

function initGallery() {
    const grid = document.querySelector('.gallery-grid');
    grid.innerHTML = '';

    config.gallery.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card polaroid';
        card.setAttribute('onclick', `openLightbox(${index})`);
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${item.src}" alt="Memory ${index + 1}" loading="lazy">
            </div>
            <p class="caption">${item.caption}</p>
        `;
        grid.appendChild(card);
    });
}

// Expose lightbox functions to global scope for inline onclick usage
window.openLightbox = function (index) {
    currentImgIndex = index;
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");
    const caption = document.getElementById("lightboxCaption");

    lightbox.style.display = "block";
    // small timeout to allow display:block before opacity transition if we added one
    setTimeout(() => {
        img.src = config.gallery[currentImgIndex].src;
        caption.textContent = config.gallery[currentImgIndex].caption;
    }, 10);
};

window.closeLightbox = function () {
    document.getElementById("lightbox").style.display = "none";
};

window.changeLightbox = function (step) {
    currentImgIndex += step;
    if (currentImgIndex >= config.gallery.length) {
        currentImgIndex = 0;
    } else if (currentImgIndex < 0) {
        currentImgIndex = config.gallery.length - 1;
    }
    const img = document.getElementById("lightboxImg");
    img.src = config.gallery[currentImgIndex].src;
    document.getElementById("lightboxCaption").textContent = config.gallery[currentImgIndex].caption;
};

// Close lightbox on outside click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById("lightbox").style.display === "block") {
        closeLightbox();
    }
    if (e.key === 'ArrowRight' && document.getElementById("lightbox").style.display === "block") {
        changeLightbox(1);
    }
    if (e.key === 'ArrowLeft' && document.getElementById("lightbox").style.display === "block") {
        changeLightbox(-1);
    }
});

// ==========================================
// ✉️ SCROLL TRIGGERED ANIMATIONS (Letter)
// ==========================================
function initScrollAnimations() {
    const envelope = document.getElementById('envelope');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        envelope.classList.add('open');
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.getElementById('letter'));
    } else {
        // Fallback for older browsers
        envelope.classList.add('open');
    }
}

// ==========================================
// 🎂 INTERACTIVE CAKE
// ==========================================
const candles = document.querySelectorAll('.candle');
let candlesBlown = 0;

candles.forEach((candle, idx) => {
    candle.addEventListener('click', function () {
        if (!this.classList.contains('out')) {
            this.classList.add('out');
            candlesBlown++;

            // Candle smoke puff animation
            const puff = document.createElement('div');
            puff.className = 'smoke-puff';
            this.appendChild(puff);
            setTimeout(() => puff.remove(), 1200);

            // Pleasant musical chime
            playChime(440 + candlesBlown * 80);

            if (candlesBlown === candles.length) {
                setTimeout(() => {
                    fireConfetti(4);
                    // Celebratory chord progression
                    setTimeout(() => playChime(523.25), 100);
                    setTimeout(() => playChime(659.25), 250);
                    setTimeout(() => playChime(783.99), 400);
                    document.getElementById('wishMessage').classList.remove('hidden');
                    document.querySelector('.instruction').classList.add('hidden');
                }, 400);
            }
        }
    });
});

// ==========================================
// ✨ FINAL SURPRISE
// ==========================================
const finalBtn = document.getElementById('finalSurpriseBtn');
const finalMessage = document.getElementById('finalMessage');

finalBtn.addEventListener('click', () => {
    finalBtn.style.display = 'none';
    finalMessage.classList.remove('hidden');
    fireConfetti(5);
    playChime(659.25);

    // Smooth scroll slightly to show full message
    setTimeout(() => {
        window.scrollBy({ top: 200, behavior: 'smooth' });
    }, 100);
});

// ==========================================
// 🎈 POP A WISH BALLOONS
// ==========================================
function initWishBalloons() {
    const cards = document.querySelectorAll('.balloon-card');
    const chimeNotes = [523.25, 587.33, 659.25, 698.46, 783.99]; // C5, D5, E5, F5, G5

    cards.forEach((card, idx) => {
        card.addEventListener('click', function () {
            if (this.classList.contains('popped')) return;
            this.classList.add('popped');

            // Play pleasant chime note
            playChime(chimeNotes[idx % chimeNotes.length], 'triangle');

            // Burst confetti centered on this balloon
            const rect = this.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 3) / window.innerHeight;
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 30,
                    spread: 60,
                    origin: { x, y },
                    colors: ['#ff1493', '#d4af37', '#00b4d8', '#df9eff', '#fff']
                });
            }

            // Reveal secret wish card
            const reveal = this.querySelector('.wish-reveal');
            if (reveal) {
                setTimeout(() => {
                    reveal.classList.remove('hidden');
                }, 220);
            }
        });
    });
}

// ==========================================
// ✉️ ENVELOPE & WAX SEAL INTERACTION
// ==========================================
function initEnvelopeClick() {
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('waxSeal');
    if (!envelope) return;

    function toggleEnvelope() {
        envelope.classList.toggle('open');
        playChime(659.25);
        if (envelope.classList.contains('open')) {
            fireConfetti(2);
        }
    }

    envelope.addEventListener('click', toggleEnvelope);
    if (waxSeal) {
        waxSeal.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEnvelope();
        });
    }
}

// ==========================================
// 🌟 INTERACTIVE CURSOR TRAIL & CLICK BURST
// ==========================================
function initCursorEffects() {
    const symbols = ['✨', '💖', '⭐', '❤️', '🌸', '💫'];
    let lastSpawn = 0;

    function spawnSparkle(x, y) {
        const span = document.createElement('span');
        span.className = 'sparkle-trail';
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = `${x - 10}px`;
        span.style.top = `${y - 10}px`;
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 900);
    }

    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSpawn > 50) {
            lastSpawn = now;
            spawnSparkle(e.clientX, e.clientY);
        }
    });

    window.addEventListener('touchmove', (e) => {
        const now = Date.now();
        if (e.touches.length > 0 && now - lastSpawn > 60) {
            lastSpawn = now;
            spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    // Click burst: floating radiant hearts
    window.addEventListener('click', (e) => {
        const burstSymbols = ['💖', '✨', '❤️', '🌸', '⭐'];
        for (let i = 0; i < 6; i++) {
            const burst = document.createElement('span');
            burst.className = 'click-burst';
            burst.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];
            const angle = (i / 6) * Math.PI * 2;
            const dist = 35 + Math.random() * 30;
            const tx = Math.cos(angle) * dist + 'px';
            const ty = Math.sin(angle) * dist + 'px';
            burst.style.setProperty('--tx', tx);
            burst.style.setProperty('--ty', ty);
            burst.style.left = `${e.clientX - 10}px`;
            burst.style.top = `${e.clientY - 10}px`;
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        }
    });
}

// ==========================================
// 🎶 CELEBRATION CHIME (Web Audio API)
// ==========================================
let audioCtx = null;
function playChime(freq = 587.33, type = 'sine') {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
        // AudioContext silent fallback
    }
}

// ==========================================
// ❤️ FLOATING HEARTS BACKGROUND
// ==========================================
function createFloatingHearts() {
    const container = document.getElementById('particles');
    const heartSymbols = ['❤️', '✨', '💖', '⭐', '🌸'];

    // Limit particles on smaller screens for performance
    const particleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, heartSymbols);
    }
}

function createParticle(container, symbols) {
    const particle = document.createElement('div');
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.animation = `float ${Math.random() * 4 + 3}s ease-in-out infinite alternate`;

    // Add some parallax feel by changing animation delay
    particle.style.animationDelay = `-${Math.random() * 5}s`;

    container.appendChild(particle);
}
