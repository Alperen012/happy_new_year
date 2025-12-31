/**
 * ============================================
 * YENI YIL KUTLAMA KARTI - SCRIPT.JS
 * Tüm etkileşimler, efektler ve animasyonlar
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Global değişkenler
    const snowContainer = document.getElementById('snowContainer');
    let defaultSnowInterval = null; // Varsayılan kar efekti interval'i
    // ============================================
    // 1. TEMA YÖNETİMİ
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    // Kayıtlı tema tercihini kontrol et
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
            if (themeLabel) themeLabel.textContent = 'Açık Tema';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            if (themeLabel) themeLabel.textContent = 'Koyu Tema';
        }
        localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // ============================================
    // 2. PARILTI EFEKTİ
    // ============================================
    function createSparkles(count = 15) {
        const container = document.getElementById('sparkleContainer');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';

            // Rastgele boyut
            const size = 3 + Math.random() * 5;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            container.appendChild(sparkle);
        }
    }

    // Parıltıları başlat
    createSparkles(20);

    // ============================================
    // 3. KAR TANESİ EFEKTİ
    // ============================================
    function createSnowflakes() {
        if (!snowContainer) return;

        const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];

        function addSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.fontSize = (0.5 + Math.random() * 1) + 'rem';
            snowflake.style.opacity = 0.3 + Math.random() * 0.5;
            snowflake.style.animationDuration = (5 + Math.random() * 10) + 's';

            snowContainer.appendChild(snowflake);

            // Animasyon bitince kaldır
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
            });
        }

        // İlk kar tanelerini ekle
        for (let i = 0; i < 10; i++) {
            setTimeout(() => addSnowflake(), i * 300);
        }

        // Sürekli yeni kar taneleri ekle
        setInterval(addSnowflake, 800);
    }

    // Kar tanelerini başlat (sadece slider YOKSA varsayılan kar)
    const hasSnowSlider = document.getElementById('snowIntensity');
    if (!hasSnowSlider) {
        createSnowflakes();
    }

    // ============================================
    // 4. KONFETİ EFEKTİ (Viewer için)
    // ============================================
    function createConfetti(count = 50) {
        const container = document.getElementById('confettiContainer');
        if (!container) return;

        const colors = ['#d4af37', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
        const shapes = ['square', 'circle'];

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');

                // Rastgele renk ve şekil
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];

                confetti.style.backgroundColor = color;
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else {
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                }

                // Rastgele boyut
                const size = 5 + Math.random() * 10;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';

                container.appendChild(confetti);

                // Animasyon bitince kaldır
                confetti.addEventListener('animationend', () => {
                    confetti.remove();
                });
            }, i * 50);
        }
    }

    // ============================================
    // 5. SAYFA MODU TESPİTİ
    // ============================================
    const isCreatorMode = document.body.classList.contains('creator-mode');
    const isViewerMode = document.body.classList.contains('viewer-mode');

    // ============================================
    // 6. KİŞİSELLEŞTİRME SEÇENEKLERİ
    // ============================================
    let selectedStyle = 'gold';
    let selectedEmojis = ['🎄']; // Çoklu emoji seçimi için dizi
    let snowIntensity = 50; // Kar yoğunluğu (0-100)

    // Stil seçimi
    const styleOptions = document.getElementById('styleOptions');
    if (styleOptions) {
        styleOptions.addEventListener('click', (e) => {
            const btn = e.target.closest('.style-btn');
            if (!btn) return;

            // Aktif sınıfını güncelle
            styleOptions.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Seçilen stili kaydet ve uygula
            selectedStyle = btn.dataset.style;
            document.documentElement.setAttribute('data-card-style', selectedStyle);
        });
    }

    // Emoji seçimi (çoklu seçim)
    const emojiOptions = document.getElementById('emojiOptions');
    if (emojiOptions) {
        emojiOptions.addEventListener('click', (e) => {
            const btn = e.target.closest('.emoji-btn');
            if (!btn) return;

            const emoji = btn.dataset.emoji;
            const index = selectedEmojis.indexOf(emoji);

            if (index > -1) {
                // Emoji zaten seçili, kaldır (en az 1 emoji seçili kalmalı)
                if (selectedEmojis.length > 1) {
                    selectedEmojis.splice(index, 1);
                    btn.classList.remove('active');
                }
            } else {
                // Emoji seçili değil, ekle
                selectedEmojis.push(emoji);
                btn.classList.add('active');
            }
        });
    }

    // Kar yoğunluğu slider'ı
    const snowSlider = document.getElementById('snowIntensity');
    const snowValueText = document.getElementById('snowValueText');
    const snowSliderFill = document.getElementById('snowSliderFill');

    // Kar önizleme için mevcut kar intervali
    let snowPreviewInterval = null;

    function updateSnowPreview(intensity) {
        // Varsayılan kar efektini durdur
        if (defaultSnowInterval) {
            clearInterval(defaultSnowInterval);
            defaultSnowInterval = null;
        }

        // Mevcut kar tanelerini temizle
        if (snowContainer) {
            snowContainer.innerHTML = '';
        }

        // Önceki interval'i temizle
        if (snowPreviewInterval) {
            clearInterval(snowPreviewInterval);
            snowPreviewInterval = null;
        }

        if (intensity === 0 || !snowContainer) return;

        // Yoğunluğa göre interval süresini hesapla
        // 0 = kar yok, 100 = çok yoğun (her 20ms'de bir kar tanesi)
        const intervalTime = Math.max(20, 300 - (intensity * 2.8));
        const snowSize = 0.8 + (intensity / 100) * 0.8; // 0.8 - 1.6 arasında boyut

        snowPreviewInterval = setInterval(() => {
            createPreviewSnowflake(snowSize, intensity);
        }, intervalTime);
    }

    function createPreviewSnowflake(sizeMultiplier, intensity) {
        if (!snowContainer) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';

        const size = (8 + Math.random() * 12) * sizeMultiplier;
        const startX = Math.random() * 100;
        const duration = 4 + Math.random() * (8 - (intensity / 25)); // Yoğunlukta hızlanır
        const delay = Math.random() * 0.5;

        snowflake.style.cssText = `
            position: fixed;
            left: ${startX}%;
            top: -20px;
            font-size: ${size}px;
            color: rgba(255, 255, 255, ${0.6 + Math.random() * 0.4});
            animation: snowfall ${duration}s linear ${delay}s forwards;
            pointer-events: none;
            z-index: 1000;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        `;

        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, (duration + delay) * 1000);
    }

    if (snowSlider) {
        // Slider değer değişimi
        snowSlider.addEventListener('input', (e) => {
            snowIntensity = parseInt(e.target.value);

            // Değer göstergesini güncelle
            if (snowValueText) {
                snowValueText.textContent = snowIntensity;
            }

            // Fill animasyonunu güncelle
            if (snowSliderFill) {
                snowSliderFill.style.width = snowIntensity + '%';
            }

            // Kar önizlemesini güncelle
            updateSnowPreview(snowIntensity);
        });

        // Sayfa yüklendiğinde varsayılan değeri uygula
        if (snowSliderFill) {
            snowSliderFill.style.width = '50%';
        }

        // İlk önizlemeyi başlat
        setTimeout(() => {
            updateSnowPreview(50);
        }, 1000);
    }


    // ============================================
    // 7. CREATOR MODE (index.html) MANTIĞI
    // ============================================
    if (isCreatorMode) {
        const form = document.getElementById('messageForm');
        const resultArea = document.getElementById('resultArea');
        const shareLinkInput = document.getElementById('shareLink');
        const copyBtn = document.getElementById('copyBtn');
        const createBtn = document.getElementById('createBtn');
        const copiedMsg = document.getElementById('copiedMsg');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Butonu devre dışı bırak ve metni değiştir
            createBtn.disabled = true;
            const originalText = createBtn.textContent;
            createBtn.textContent = '⏳ Oluşturuluyor...';

            // Form verilerini al ve temizle
            const recipient = document.getElementById('recipientName').value.trim();
            const message = document.getElementById('messageBody').value.trim();
            const sender = document.getElementById('senderName').value.trim();

            // Validasyon
            if (!recipient || !message || !sender) {
                alert('Lütfen tüm alanları doldurun.');
                createBtn.disabled = false;
                createBtn.textContent = originalText;
                return;
            }

            // Verileri URL için encode et (kişiselleştirme dahil)
            const lockMessage = document.getElementById('lockMessage').checked;

            // Verileri JSON olarak birleştir ve Base64 ile şifrele
            const cardData = {
                to: recipient,
                msg: message,
                from: sender,
                style: selectedStyle,
                emoji: selectedEmojis.join(''),
                locked: lockMessage ? '1' : '0',
                snow: snowIntensity.toString()
            };


            // Base64 encode (Unicode desteği için)
            const encodedData = btoa(encodeURIComponent(JSON.stringify(cardData)));

            // view.html için URL oluştur
            const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
            const finalLink = `${baseUrl}view.html?d=${encodedData}`;

            // Sonucu göster
            shareLinkInput.value = finalLink;
            resultArea.classList.remove('hidden');

            // Formu resetle ve butonu eski haline getir
            setTimeout(() => {
                form.reset();
                createBtn.disabled = false;
                createBtn.textContent = originalText;
            }, 500);

            // Sonuç alanına kaydır
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        // Kopyalama fonksiyonu
        copyBtn.addEventListener('click', async () => {
            try {
                // Modern clipboard API
                await navigator.clipboard.writeText(shareLinkInput.value);
                showCopiedMessage();
            } catch (err) {
                // Fallback: select and copy
                shareLinkInput.select();
                shareLinkInput.setSelectionRange(0, 99999);

                try {
                    document.execCommand('copy');
                    showCopiedMessage();
                } catch (e) {
                    alert('Kopyalama başarısız oldu. Lütfen linki manuel olarak kopyalayın.');
                }
            }
        });

        function showCopiedMessage() {
            copiedMsg.classList.remove('hidden');
            copyBtn.textContent = '✅ Kopyalandı!';

            setTimeout(() => {
                copiedMsg.classList.add('hidden');
                copyBtn.textContent = '📋 Kopyala';
            }, 2500);
        }
    }

    // ============================================
    // 8. VIEWER MODE (view.html) MANTIĞI
    // ============================================
    if (isViewerMode) {
        const cardContainer = document.getElementById('cardContainer');
        const viewerCard = document.getElementById('viewerCard');
        const viewRecipient = document.getElementById('viewRecipient');
        const viewMessage = document.getElementById('viewMessage');
        const viewSender = document.getElementById('viewSender');
        const errorMessage = document.getElementById('errorMessage');
        const emojiDecoration = document.getElementById('emojiDecoration');

        // URL parametrelerini oku ve çöz
        const params = new URLSearchParams(window.location.search);
        const encodedData = params.get('d');

        let recipient, message, sender, cardStyle, cardEmoji, isLocked, cardSnowIntensity;

        if (encodedData) {
            // Yeni format: Base64 encoded JSON
            try {
                const decodedJson = decodeURIComponent(atob(encodedData));
                const cardData = JSON.parse(decodedJson);
                recipient = cardData.to;
                message = cardData.msg;
                sender = cardData.from;
                cardStyle = cardData.style || 'gold';
                cardEmoji = cardData.emoji || '🎄';
                isLocked = cardData.locked === '1';
                cardSnowIntensity = parseInt(cardData.snow) || 50;
            } catch (e) {
                console.error('İçerik çözümlenemedi:', e);
                recipient = null;
                message = null;
                sender = null;
                cardSnowIntensity = 50;
            }
        } else {
            // Eski format: Ayrı parametreler (geriye uyumluluk)
            recipient = params.get('to');
            message = params.get('msg');
            sender = params.get('from');
            cardStyle = params.get('style') || 'gold';
            cardEmoji = params.get('emoji') || '🎄';
            isLocked = params.get('locked') === '1';
            cardSnowIntensity = parseInt(params.get('snow')) || 50;
        }


        // Kilitli mesaj için ek elementler
        const lockedContainer = document.getElementById('lockedContainer');
        const lockedSender = document.getElementById('lockedSender');
        const lockedRecipient = document.getElementById('lockedRecipient');

        // Yeni yıl hedef tarihi (1 Ocak 2026, 00:00:00)
        const newYearDate = new Date('2026-01-01T00:00:00');
        const now = new Date();
        const isNewYearReached = now >= newYearDate;

        // Verilerin varlığını kontrol et
        if (recipient && message && sender) {
            // Kilitli mesaj kontrolü
            if (isLocked && !isNewYearReached) {
                // Mesaj kilitli ve henüz yeni yıl gelmedi
                if (viewerCard) viewerCard.classList.add('hidden');
                if (cardContainer) cardContainer.classList.add('hidden');
                if (lockedContainer) lockedContainer.classList.remove('hidden');

                // Gönderen ve alıcı bilgilerini göster
                if (lockedSender) lockedSender.textContent = sender;
                if (lockedRecipient) lockedRecipient.textContent = recipient;

                // Sayfa başlığını güncelle
                document.title = `🔒 Kilitli Mesaj - ${recipient}`;

                // Geri sayım başlat
                startCountdown(newYearDate);

                // Giriş animasyonunu tetikle
                setTimeout(() => {
                    lockedContainer.classList.add('loaded');
                }, 200);
            } else {
                // Mesaj açık veya yeni yıl geldi
                showMessageCard();
            }
        } else {
            // Veri eksikse kartı gizle, hata mesajını göster
            if (viewerCard) viewerCard.classList.add('hidden');
            if (errorMessage) errorMessage.classList.remove('hidden');

            // Hata mesajı için de animasyon
            setTimeout(() => {
                cardContainer.classList.add('loaded');
            }, 100);
        }

        // Mesaj kartını gösterme fonksiyonu
        function showMessageCard() {
            if (lockedContainer) lockedContainer.classList.add('hidden');
            if (cardContainer) cardContainer.classList.remove('hidden');
            if (viewerCard) viewerCard.classList.remove('hidden');

            // XSS koruması: textContent kullan
            viewRecipient.textContent = recipient;
            viewMessage.textContent = message;
            viewSender.textContent = sender;

            // Kart stilini uygula
            document.documentElement.setAttribute('data-card-style', cardStyle);

            // Emoji dekorasyonunu güncelle (çoklu emoji desteği)
            if (emojiDecoration) {
                // Birden fazla emoji varsa araya ✨ koy
                const emojis = [...cardEmoji]; // String'i emoji dizisine çevir
                const decorationText = emojis.length > 1
                    ? emojis.join(' ✨ ')
                    : `${cardEmoji} ✨ ${cardEmoji} ✨ ${cardEmoji}`;
                emojiDecoration.textContent = decorationText;
            }

            // Sayfa başlığını güncelle
            document.title = `🎉 ${recipient} için bir mesaj var!`;

            // Meta description güncelle
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', `${sender} size özel bir yeni yıl mesajı gönderdi!`);
            }

            // Giriş animasyonunu tetikle
            setTimeout(() => {
                cardContainer.classList.add('loaded');

                // Konfeti efektini başlat
                setTimeout(() => {
                    createConfetti(60);
                }, 500);

                // Kar yoğunluğuna göre kar efektini başlat
                startCustomSnow(cardSnowIntensity);
            }, 200);
        }

        // Özel kar yoğunluğu fonksiyonu
        function startCustomSnow(intensity) {
            if (intensity === 0 || !snowContainer) return;

            // Mevcut kar efektlerini temizle
            snowContainer.innerHTML = '';

            // Yoğunluğa göre interval süresini hesapla
            const intervalTime = Math.max(20, 300 - (intensity * 2.8));
            const snowSizeMultiplier = 0.8 + (intensity / 100) * 0.8;

            setInterval(() => {
                createIntensitySnowflake(snowSizeMultiplier, intensity);
            }, intervalTime);
        }

        function createIntensitySnowflake(sizeMultiplier, intensity) {
            if (!snowContainer) return;

            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = '❄';

            const size = (8 + Math.random() * 12) * sizeMultiplier;
            const startX = Math.random() * 100;
            const duration = 4 + Math.random() * (8 - (intensity / 25));
            const delay = Math.random() * 0.5;

            snowflake.style.cssText = `
                position: fixed;
                left: ${startX}%;
                top: -20px;
                font-size: ${size}px;
                color: rgba(255, 255, 255, ${0.6 + Math.random() * 0.4});
                animation: snowfall ${duration}s linear ${delay}s forwards;
                pointer-events: none;
                z-index: 1000;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            `;

            snowContainer.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, (duration + delay) * 1000);
        }


        // Geri sayım fonksiyonu
        function startCountdown(targetDate) {
            const daysEl = document.getElementById('countdownDays');
            const hoursEl = document.getElementById('countdownHours');
            const minutesEl = document.getElementById('countdownMinutes');
            const secondsEl = document.getElementById('countdownSeconds');

            function updateCountdown() {
                const now = new Date();
                const diff = targetDate - now;

                if (diff <= 0) {
                    // Yeni yıl geldi, mesajı göster
                    showMessageCard();
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
                if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
                if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
                if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

                requestAnimationFrame(() => {
                    setTimeout(updateCountdown, 1000);
                });
            }

            updateCountdown();
        }
    }

    // ============================================
    // 9. YENİ YIL GEÇİŞ ANİMASYONU - MODERN
    // ============================================
    function initNewYearAnimation() {
        const overlay = document.getElementById('newYearOverlay');
        if (!overlay) return;

        // Element referansları
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas ? canvas.getContext('2d') : null;
        const countdownCircle = document.getElementById('countdownCircle');
        const countdownNumber = document.getElementById('countdownNumber');
        const progressCircle = document.getElementById('progressCircle');
        const yearContainer = document.getElementById('yearContainer');
        const flipContainer = document.getElementById('flipContainer');
        const celebrationMessage = document.getElementById('celebrationMessage');

        // Canvas boyutlandırma
        function resizeCanvas() {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Parçacık sistemi
        const particles = [];
        const colors = ['#ffd700', '#ff6b6b', '#00ffc8', '#ff6b9d', '#4d96ff', '#c9b1ff', '#ff9f43', '#fff'];

        class Particle {
            constructor(x, y, type = 'normal') {
                this.x = x || Math.random() * (canvas ? canvas.width : window.innerWidth);
                this.y = y || Math.random() * (canvas ? canvas.height : window.innerHeight);
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
                if (!ctx) return;
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
            const x = Math.random() * (canvas ? canvas.width : window.innerWidth);
            particles.push(new Particle(x, -20, 'confetti'));
        }

        // Animasyon döngüsü
        let animationId;
        function animate() {
            if (!ctx) return;
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
        const bgParticleInterval = setInterval(addBackgroundParticles, 200);

        // Geri sayım mantığı
        let countdown = 3;
        const circumference = 2 * Math.PI * 90;

        function updateCountdown() {
            if (countdownNumber) {
                countdownNumber.textContent = countdown;
                countdownNumber.style.animation = 'none';
                countdownNumber.offsetHeight; // Reflow
                countdownNumber.style.animation = 'nyPulse 1s infinite';
            }

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
            if (countdownCircle) {
                countdownCircle.style.opacity = '0';
                countdownCircle.style.transform = 'scale(0.5)';
                countdownCircle.style.transition = 'all 0.5s ease';
            }

            setTimeout(() => {
                if (countdownCircle) countdownCircle.style.display = 'none';
                if (yearContainer) {
                    yearContainer.classList.remove('hidden');
                    yearContainer.style.animation = 'nyFadeUp 0.8s ease forwards';
                }

                // Havai fişekler
                createFirework((canvas ? canvas.width : window.innerWidth) * 0.3, (canvas ? canvas.height : window.innerHeight) * 0.3);
                createFirework((canvas ? canvas.width : window.innerWidth) * 0.7, (canvas ? canvas.height : window.innerHeight) * 0.4);

                // 1 saniye sonra flip
                setTimeout(() => {
                    if (flipContainer) {
                        const flipper = flipContainer.querySelector('.ny-flipper');
                        if (flipper) flipper.classList.add('flipped');
                    }

                    // Flip sırasında havai fişek
                    createFirework((canvas ? canvas.width : window.innerWidth) * 0.5, (canvas ? canvas.height : window.innerHeight) * 0.3);

                    // Kutlama metnini göster
                    setTimeout(showCelebration, 1000);
                }, 1000);
            }, 500);
        }

        function showCelebration() {
            // Yıl container'ı yukarı taşı
            if (yearContainer) {
                yearContainer.style.transition = 'all 0.8s ease';
                yearContainer.style.transform = 'translateY(-30px) scale(0.8)';
            }

            // Kutlama mesajını göster
            if (celebrationMessage) {
                celebrationMessage.classList.remove('hidden');

                // Harfleri sırayla animasyonla
                const letters = celebrationMessage.querySelectorAll('.ny-letter');
                letters.forEach((letter, index) => {
                    letter.style.animationDelay = `${index * 0.05}s`;
                });
            }

            // Konfeti yağmuru başlat
            const confettiInterval = setInterval(createConfetti, 50);

            // Ekstra havai fişekler
            setTimeout(() => createFirework((canvas ? canvas.width : window.innerWidth) * 0.2, (canvas ? canvas.height : window.innerHeight) * 0.5), 500);
            setTimeout(() => createFirework((canvas ? canvas.width : window.innerWidth) * 0.8, (canvas ? canvas.height : window.innerHeight) * 0.4), 800);
            setTimeout(() => createFirework((canvas ? canvas.width : window.innerWidth) * 0.5, (canvas ? canvas.height : window.innerHeight) * 0.2), 1200);

            // 6 saniye sonra overlay'ı kapat ve mesajı göster
            setTimeout(() => {
                clearInterval(confettiInterval);
                clearInterval(bgParticleInterval);
                cancelAnimationFrame(animationId);

                overlay.style.transition = 'all 1s ease';
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(1.1)';

                setTimeout(() => {
                    overlay.remove();
                }, 1000);
            }, 5000);
        }

        // Geri sayımı başlat
        setTimeout(updateCountdown, 500);

        console.log('🎆 Yeni Yıl Animasyonu Başlatıldı');
    }

    // Sadece viewer modunda animasyonu başlat
    if (isViewerMode) {
        initNewYearAnimation();
    }

    // ============================================
    // 10. SAYFA YÜKLENME ANİMASYONU
    // ============================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    console.log('🎄 Mutlu Yıllar! - Happy New Year Card System Loaded');
});
