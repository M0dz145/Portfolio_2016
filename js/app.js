/**
 * Copyright chevalier-xavier.fr
 * Created on 15/03/2016.
 */

$(function() {
    var $nav             = $('nav[role="navigation"]'),
        $links           = $nav.find('li a'),
        $body            = $('body'),
        worksHasEvent    = false,
        _configsRevealFx = require('./components/configsRevealFx'),
        _reveals         = require('./components/reveals')(),
        _section         = require('./components/section')(_reveals, _configsRevealFx);

    $(document).on('ready load', function() {
        /*** REVEALS FOR IMAGES ***/
        $('[data-work-details]').each(function(){
            var $this = $(this).get(0),
                $images = $this.children[1].children; // Récupère les images

            _reveals.add({
                items: $images,
                container: $this,
                scrollEvent: true,
                effect: _configsRevealFx(function(contentEl) {
                    contentEl.style.opacity = 0;
                }, function(contentEl) {
                    contentEl.style.opacity = 1;
                }).lr
            });
        });

        /*** REVEALS FOR SECTION ***/
        _reveals.add({
            items: document.querySelectorAll('[data-reveal-section]'),
            scrollEvent: false,
            effect: _configsRevealFx(function(contentEl) {
                anime.remove(contentEl);
                contentEl.style.opacity = 0;
            }, function(contentEl) {
                // Work click listener
                if($(contentEl).parent().hasClass('works') && worksHasEvent === false) {
                    worksHasEvent = true;
                    $('[data-work].work_figure').on('click', function(e) {
                        e.preventDefault();
                        $body.addClass('work_activate');
                        $('[data-work-details]').removeClass();
                        $('[data-work-details="' + $(this).data('work') + '"]')
                            .addClass('activate')
                            .find('[data-reveal-image]')
                            .each(function() {
                                var id = $(this).data('reveal-id');
                                if(_reveals.isInViewport(id)){
                                    _reveals.reveal(id);
                                    _reveals.destroyListener(id);
                                };
                            });
                        $('.back-button').on('click', function(e){
                            e.preventDefault();
                            _section.change('works');
                        });
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
            }).bt
        });

        if(location.hash != "") {
            _section.change(location.hash.replace('#', ''));
        }
    });

    $links.on('click', function(e) {
        var href = $(this).attr('href').replace('#', '');
        if(href === 'accueil') {
            e.preventDefault();
            history.pushState("", document.title, window.location.pathname + window.location.search);
            $body.removeClass();
            return;
        }

        _section.change(href);
    });

    // $nav.on('click', function() {
    //     $body.removeClass('work_active');
    // });

    $(document).on('click', function(e) {
        if(e.which === 2) e.preventDefault();
    });

});