window.PageLast = (function () {
    function init() {
        const replayBtn = document.getElementById('replayBtn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                gsap.to('.page-last .final-message, .page-last .memory-container, .page-last .welcome', {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => window.goToPage('home')
                });
            });
        }
    }

    function destroy() {
        // nothing to clean up
    }

    return { init, destroy };
})();