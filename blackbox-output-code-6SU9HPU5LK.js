// Konfigurasi - GANTI SESUAI KEINGINAN ANDA
const CONFIG = {
    secretToken: 'LOVE-YOU-FOREVER-2024', // Token rahasia untuk QR code
    anniversaryDate: '2025-05-01', // Tanggal anniversary berikutnya
    photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571622095338-8b4f8a9a9a9a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1518627019693-e11f5e989e48?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-7b8a6c5e7e40?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587206?w=400&h=300&fit=crop'
    ],
    birthdayMessages: [
        "Kamu adalah alasan aku tersenyum setiap hari 💕",
        "Setiap detik bersamamu adalah kebahagiaan ❤️",
        "Aku beruntung sekali punya kamu sebagai calon istriku 💍",
        "Love you more than yesterday, less than tomorrow 💖",
        "Kamu adalah mimpi yang jadi kenyataan ✨"
    ]
};

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    initLandingPage();
    initMainPage();
    initAnimations();
    initInteractiveEffects();
});

// Landing Page
function initLandingPage() {
    // Generate QR Code
    const secretUrl = `${window.location.href}#${CONFIG.secretToken}`;
    QRCode.toCanvas(document.getElementById('qrcode'), secretUrl, {
        width: 200,
        margin: 2,
        color: {
            dark: '#ff1493',
            light: '#fff'
        }
    });

    // Check if secret token exists
    const hash = window.location.hash.slice(1);
    if (hash === CONFIG.secretToken) {
        setTimeout(() => {
            document.getElementById('landing').classList.remove('active');
            document.getElementById('mainPage').classList.add('active');
            initMainPage();
        }, 1000);
    }

    // Falling hearts animation
    createFallingHearts();
}

// Main Page
function initMainPage() {
    initTypingEffect();
    initCountdown();
    initGallery();
    initMusic();
    initNavigation();
    initEnvelope();
    initTimelineAnimation();
    initHeartCanvas();
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    const messages = CONFIG.birthdayMessages;
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentMessage.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Countdown Timer
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    const targetDate = new Date(CONFIG.anniversaryDate).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Hari</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${hours}</div>
                <div class="countdown-label">Jam</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${minutes}</div>
                <div class="countdown-label">Menit</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${seconds}</div>
                <div class="countdown-label">Detik</div>
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    CONFIG.photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${photo}" alt="Kenangan ${index + 1}" loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-heart"></i>
            </div>
        `;
        galleryItem.addEventListener('click', () => {
            galleryItem.style.transform = 'scale(0.9)';
            setTimeout(() => {
                galleryItem.style.transform = '';
            }, 200);
        });
        galleryGrid.appendChild(galleryItem);
    });
}

// Music Control
function initMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    // Ganti src dengan lagu romantis Anda
    bgMusic.src = 'https://www.soundjay.com/misc/sounds/romantic-piano.mp3'; // Ganti link lagu
    
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log('Autoplay prevented'));
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.dataset.page;

            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update active page
            pageContents.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Envelope Animation
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });
}

// Timeline Animation
function initTimelineAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                    entry.target.style.animationPlayState = 'running';
                }, 100);
            }
        });
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Falling Hearts (Landing)
function createFallingHearts() {
    const container = document.getElementById('heartsContainer');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);
}

// Background Heart Canvas
function initHeartCanvas() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];
    let animationId;

    function Heart(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = 1;
    }

    Heart.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
        this.size *= 0.99;
    };

    Heart.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff69b4';
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('💕', this.x, this.y);
        ctx.restore();
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.1) {
            hearts.push(new Heart(Math.random() * canvas.width, canvas.height));
        }

        hearts = hearts.filter(heart => heart.opacity > 0);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Click to create heart
function initInteractiveEffects() {
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            createClickHeart(e.clientX, e.clientY);
        }
    });
}

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// Smooth Animations
function initAnimations() {
    // Intersection Observer untuk animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.page-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}