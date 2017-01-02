module.exports = {
    'bt': { // For sections
        easing: 'easeOutExpo',
        direction: 'bt',
        bgcolor: '#e8e8e8',
        onStart: function(contentEl) {
            anime.remove(contentEl);
            contentEl.style.opacity = 0;
        },
        onCover: function(contentEl) {
            if($(contentEl).parent().hasClass('works')){
                var $work = $('[data-work].work_figure');
                $work.off('click');
                $work.on('click', function(e) {
                    e.preventDefault();
                    $('[data-work-details]').removeClass();
                    $('[data-work-details="'+ $(this).data('work') +'"]').addClass('activate');
                });
            }

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
        bgcolor: '#f1f1f1',
        onStart: function(contentEl) {
            contentEl.style.opacity = 0;
        },
        onCover: function(contentEl) {
            contentEl.style.opacity = 1;
        }
    }
};