window.PageCause = (function () {
    const reasons = [
        { text: "You're such a sweet and wonderful person, and I feel lucky to share such a good bond with you. 💖", emoji: "🌟", gif: "gif1.gif" },
        { text: "May your life be filled with love, laughter, and endless joy. 🌸 ", emoji: "💗", gif: "gif2.gif" },
        { text: "Wishing you success, happiness, and everything your heart desires. ✨ ", emoji: "💕", gif: "gif1.gif" },
        { text: "Thank you for being mine. Have the happiest year ahead my Lovee! 🥳 ", emoji: "🌟", gif: "gif2.gif" }
    ];

    let currentReasonIndex = 0;
    let isTransitioning = false;
    let floatInterval = null;
    let mouseMoveHandler = null;

    function createReasonCard(reason) {
        const card = document.createElement('div');
        card.className = 'reason-card';

        const text = document.createElement('div');
        text.className = 'reason-text';
        text.innerHTML = `${reason.emoji} ${reason.text}`;

        const gifOverlay = document.createElement('div');
        gifOverlay.className = 'gif-overlay';
        gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

        card.appendChild(text);
        card.appendChild(gifOverlay);

        gsap.from(card, { opacity: 0, y: 50, duration: 0.5, ease: "back.out" });
        return card;
    }

    function createFloatingElement() {
        const causeRoot = document.querySelector('.page-cause');
        if (!causeRoot) return; // safety: don't run if this page isn't active

        const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
        const element = document.createElement('div');
        element.className = 'floating';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = Math.random() * window.innerHeight + 'px';
        element.style.fontSize = (Math.random() * 20 + 10) + 'px';
        causeRoot.appendChild(element);

        gsap.to(element, { y: -500, duration: Math.random() * 10 + 10, opacity: 0, onComplete: () => element.remove() });
    }

    function displayNewReason() {
        if (isTransitioning) return;
        isTransitioning = true;

        const reasonsContainer = document.querySelector('.page-cause #reasons-container');
        const shuffleButton = document.querySelector('.page-cause .shuffle-button');
        const reasonCounter = document.querySelector('.page-cause .reason-counter');

        if (currentReasonIndex < reasons.length) {
            const card = createReasonCard(reasons[currentReasonIndex]);
            reasonsContainer.appendChild(card);
            reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
            currentReasonIndex++;

            if (currentReasonIndex === reasons.length) {
                gsap.to(shuffleButton, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "elastic.out",
                    onComplete: () => {
                        shuffleButton.textContent = "Onto The Next 💫";
                        shuffleButton.classList.add('story-mode');
                        shuffleButton.addEventListener('click', () => {
                            gsap.to('.page-cause .container', {
                                opacity: 0,
                                duration: 1,
                                onComplete: () => window.goToPage('last')
                            });
                        }, { once: true });
                    }
                });
            }

            createFloatingElement();
            setTimeout(() => { isTransitioning = false; }, 500);
        }
    }

    function init() {
        currentReasonIndex = 0;
        isTransitioning = false;

        const reasonsContainer = document.querySelector('.page-cause #reasons-container');
        const reasonCounter = document.querySelector('.page-cause .reason-counter');
        if (reasonsContainer) reasonsContainer.innerHTML = '';
        if (reasonCounter) reasonCounter.textContent = '';

        const shuffleButton = document.querySelector('.page-cause .shuffle-button');
        if (shuffleButton) {
            shuffleButton.textContent = 'Click Here... 💕';
            shuffleButton.classList.remove('story-mode');

            shuffleButton.addEventListener('click', () => {
                gsap.to(shuffleButton, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
                displayNewReason();
            });
        }

        const cursor = document.querySelector('.page-cause .custom-cursor');
        if (cursor) {
            mouseMoveHandler = (e) => {
                gsap.to(cursor, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.2 });
            };
            document.addEventListener('mousemove', mouseMoveHandler);
        }

        floatInterval = setInterval(createFloatingElement, 2000);
    }

    function destroy() {
        clearInterval(floatInterval);
        if (mouseMoveHandler) document.removeEventListener('mousemove', mouseMoveHandler);
        document.querySelectorAll('.page-cause .floating').forEach(el => el.remove());
    }

    return { init, destroy };
})();