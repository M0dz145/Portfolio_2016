module.exports = {
    'bt': {
        easing: 'easeOutExpo',
        direction: 'bt',
        onStart: function(contentEl) {
            anime.remove(contentEl);
            contentEl.style.opacity = 0;
        },
        onCover: function(contentEl) {
            anime({
                targets: contentEl,
                duration: 800,
                delay: 80,
                easing: 'easeOutExpo',
                translateY: [40, 0],
                opacity: [0, 1]
            });
        }
    },
    'rl': {
        direction: 'rl',
        onStart: function(contentEl) {
            contentEl.style.opacity = 0;
        },
        onCover: function(contentEl) {
            contentEl.style.opacity = 1;
        }
    },
    'lr': {
        direction: 'lr',
        onStart: function(contentEl) {
            contentEl.style.opacity = 0;
        },
        onCover: function(contentEl) {
            contentEl.style.opacity = 1;
        }
    }
};