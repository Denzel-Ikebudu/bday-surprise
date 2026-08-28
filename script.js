window.PageHome = (function () {
    let floatInterval = null;
    let mouseMoveHandler = null;
    let charIndex = 0;

    const greetingText = "To the most beautiful, adorable woman there is and there would ever be 💖";

    function typeGreeting() {
        const greetingElement = document.querySelector('.page-home .greeting');
        if (charIndex < greetingText.length && greetingElement) {
            greetingElement.textContent += greetingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeGreeting, 100);
        }
    }

    function createFloating() {
        const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
        const homeRoot = document.querySelector('.page-home');
        if (!homeRoot) return; // safety: don't run if this page isn't active

        const element = document.createElement('div');
        element.className = 'floating';
        element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        element.style.fontSize = (Math.random() * 20 + 20) + 'px';
        homeRoot.appendChild(element);

        gsap.to(element, {
            y: -500,
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            duration: Math.random() * 5 + 5,
            opacity: 1,
            ease: "none",
            onComplete: () => element.remove()
        });
    }

    function init() {
        charIndex = 0;
        const greetingElement = document.querySelector('.page-home .greeting');
        if (greetingElement) greetingElement.textContent = '';

        const cursor = document.querySelector('.page-home .cursor');
        if (cursor) {
            mouseMoveHandler = (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            };
            document.addEventListener('mousemove', mouseMoveHandler);
        }

        gsap.to('.page-home h1', { opacity: 1, duration: 1, y: 20, ease: "bounce.out" });
        gsap.to('.page-home .cta-button', { opacity: 1, duration: 1, y: -20, ease: "back.out" });

        typeGreeting();
        floatInterval = setInterval(createFloating, 1000);

        document.querySelectorAll('.page-home .cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.1, duration: 0.3 }));
            button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));

            button.addEventListener('click', () => {
                const bgMusic = document.getElementById('bgMusic');
                bgMusic.play();

                gsap.to('.page-home .container', {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => window.goToPage('cause')
                });
            });
        });
    }

    function destroy() {
        clearInterval(floatInterval);
        if (mouseMoveHandler) document.removeEventListener('mousemove', mouseMoveHandler);
        document.querySelectorAll('.page-home .floating').forEach(el => el.remove());
    }

    return { init, destroy };
})();