/**
 * ============================================
 * ALTERNATİF KUTLAMA ANİMASYONU - MODERN TASARIM
 * Canvas parçacık sistemi + Geri sayım + Flip efekti
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Element referansları
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const countdownCircle = document.getElementById('countdownCircle');
    const countdownNumber = document.getElementById('countdownNumber');
    const progressCircle = document.getElementById('progressCircle');
    const yearContainer = document.getElementById('yearContainer');
    const flipContainer = document.getElementById('flipContainer');
    const celebrationMessage = document.getElementById('celebrationMessage');
    const continueBtn = document.getElementById('continueBtn');

    // Canvas boyutlandırma
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Parçacık sistemi
    const particles = [];
    const colors = ['#ffd700', '#ff6b6b', '#00ffc8', '#ff6b9d', '#4d96ff', '#c9b1ff', '#ff9f43', '#fff'];

    class Particle {
        constructor(x, y, type = 'normal') {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.type = type;

            if (type === 'firework') {
                this.size = 3 + Math.random() * 4;
                this.speedX = (Math.random() - 0.5) * 8;
                this.speedY = (Math.random() - 0.5) * 8;
                this.life = 1;
                this.decay = 0.015 + Math.random() * 0.01;
            } else if (type === 'confetti') {
                this.size = 6 + Math.random() * 8;
                this.speedX = (Math.random() - 0.5) * 3;
                this.speedY = 2 + Math.random() * 3;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 10;
                this.life = 1;
                this.decay = 0.005;
            } else {
                this.size = 1 + Math.random() * 3;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = -0.5 - Math.random() * 1;
                this.life = 0.5 + Math.random() * 0.5;
                this.decay = 0.003;
            }

            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;

            if (this.type === 'firework') {
                this.speedY += 0.1; // Gravity
            }
            if (this.type === 'confetti') {
                this.rotation += this.rotationSpeed;
                this.speedX *= 0.99;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;

            if (this.type === 'confetti') {
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow efekti
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // Havai fişek patlaması
    function createFirework(x, y) {
        const count = 30 + Math.floor(Math.random() * 20);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y, 'firework'));
        }
    }

    // Konfeti yağmuru
    function createConfetti() {
        const x = Math.random() * canvas.width;
        particles.push(new Particle(x, -20, 'confetti'));
    }

    // Animasyon döngüsü
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Parçacıkları güncelle ve çiz
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        animationId = requestAnimationFrame(animate);
    }
    animate();

    // Arka plan parçacıkları
    function addBackgroundParticles() {
        if (particles.length < 50) {
            particles.push(new Particle());
        }
    }
    setInterval(addBackgroundParticles, 200);

    // Geri sayım mantığı
    let countdown = 3;
    const circumference = 2 * Math.PI * 90;

    function updateCountdown() {
        countdownNumber.textContent = countdown;
        countdownNumber.style.animation = 'none';
        countdownNumber.offsetHeight; // Reflow
        countdownNumber.style.animation = 'pulse 1s infinite';

        // Progress circle güncellemesi
        const offset = circumference * (1 - countdown / 3);
        if (progressCircle) {
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        if (countdown > 0) {
            countdown--;
            setTimeout(updateCountdown, 1000);
        } else {
            // Geri sayım bitti, yıl geçişini başlat
            startYearTransition();
        }
    }

    function startYearTransition() {
        // Geri sayım çemberini gizle
        countdownCircle.style.opacity = '0';
        countdownCircle.style.transform = 'scale(0.5)';
        countdownCircle.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            countdownCircle.style.display = 'none';
            yearContainer.classList.remove('hidden');
            yearContainer.style.animation = 'fadeUp 0.8s ease forwards';

            // Havai fişekler
            createFirework(canvas.width * 0.3, canvas.height * 0.3);
            createFirework(canvas.width * 0.7, canvas.height * 0.4);

            // 1 saniye sonra flip
            setTimeout(() => {
                const flipper = flipContainer.querySelector('.flipper');
                flipper.classList.add('flipped');

                // Flip sırasında havai fişek
                createFirework(canvas.width * 0.5, canvas.height * 0.3);

                // Kutlama metnini göster
                setTimeout(showCelebration, 1000);
            }, 1000);
        }, 500);
    }

    function showCelebration() {
        // Yıl container'ı yukarı taşı
        yearContainer.style.transition = 'all 0.8s ease';
        yearContainer.style.transform = 'translateY(-30px) scale(0.8)';

        // Kutlama mesajını göster
        celebrationMessage.classList.remove('hidden');

        // Harfleri sırayla animasyonla
        const letters = celebrationMessage.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.05}s`;
        });

        // Konfeti yağmuru başlat
        const confettiInterval = setInterval(createConfetti, 50);

        // Ekstra havai fişekler
        setTimeout(() => createFirework(canvas.width * 0.2, canvas.height * 0.5), 500);
        setTimeout(() => createFirework(canvas.width * 0.8, canvas.height * 0.4), 800);
        setTimeout(() => createFirework(canvas.width * 0.5, canvas.height * 0.2), 1200);

        // Butonu göster
        setTimeout(() => {
            continueBtn.classList.remove('hidden');
        }, 2500);

        // 8 saniye sonra konfeti durdur
        setTimeout(() => {
            clearInterval(confettiInterval);
        }, 8000);
    }

    // Başlat
    setTimeout(updateCountdown, 500);

    // Buton tıklama
    continueBtn.addEventListener('click', () => {
        const overlay = document.getElementById('celebrationOverlay');
        overlay.style.transition = 'all 1s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.1)';

        setTimeout(() => {
            overlay.remove();
            cancelAnimationFrame(animationId);
            // Burada mesaj kartına yönlendirme yapılabilir
            alert('Bu demo versiyonudur. Onaylanırsa ana sisteme entegre edilecektir.');
        }, 1000);
    });

    console.log('🎆 Alternatif Kutlama Animasyonu Yüklendi');
});
