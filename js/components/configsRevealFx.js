module.exports = function(onStart, onCover){
    return {
        'bt': { // For sections
            easing: 'easeOutExpo',
            direction: 'bt',
            bgcolor: '#e8e8e8',
            onStart: function(contentEl){
                if(onStart) onStart.apply(this, [contentEl]);
            },
            onCover: function(contentEl){
                if(onCover) onCover.apply(this, [contentEl]);
            }
        },
        'rl': {
            direction: 'rl',
            onStart: function(contentEl){
                contentEl.style.opacity = 0;
            },
            onCover: function(contentEl){
                contentEl.style.opacity = 1;
            }
        },
        'lr': {
            direction: 'lr',
            bgcolor: '#f1f1f1',
            onStart: function(contentEl){
                contentEl.style.opacity = 0;
            },
            onCover: function(contentEl){
                contentEl.style.opacity = 1;
            }
        }
    };
}