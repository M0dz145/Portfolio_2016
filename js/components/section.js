module.exports = function(_reveals, _configsRevealFx) {
    return {
        change: function(section) {
            var $body        = $('body'),
                section_name = 'section_' + section,
                workIsShow   = $body.hasClass('work_activate');
            if($body.hasClass(section_name) === false || workIsShow === true) {
                if(workIsShow === true) {
                    var $elActive = $('[data-work-details].activate');
                    $elActive.addClass('transitionEnd');
                    $elActive.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) {
                        console.log('end');
                        $elActive.removeClass('activate transitionEnd');
                        $body.removeClass().addClass(section_name);
                    });
                } else {
                    $body.removeClass().addClass(section_name);
                    var $section = $('[data-reveal-section="' + section + '"]');
                    _reveals.reveal($section.data('reveal-id'));
                }
            }
        }
    };
};