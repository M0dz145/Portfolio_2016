module.exports = function(_reveals) {
    return {
        change: function(section){
            var $body = $('body'),
                section_name = 'section_' + section;
            if($body.hasClass(section_name) === false) {
                $body.removeClass().addClass(section_name);
                var $section = $('[data-reveal-section="' + section + '"]');
                _reveals.reveal($section.data('reveal-id'));
            }
        }
    };
};