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
        _section         = require('./components/section')(_reveals);

    $(document).on('ready load', function() {
        /*** REVEALS FOR IMAGES ***/
        $('[data-work-details]').each(function() {
            var $this   = $(this).get(0),
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
                                var $image = $(this),
                                    id     = $image.data('reveal-id');
                                setTimeout(function() {
                                    console.log($(window).width() / 2)
                                    console.log($image.offset().left)
                                    console.log($image.offset().left - ($(window).width() / 2))
                                    console.log(($(window).width() / 2) === $image.offset().left)
                                    if(_reveals.isInViewport(id) || ($(window).width() / 2) === $image.offset().left || $image.offset().left - ($(window).width() / 2) === -8.5) {
                                        _reveals.reveal(id);
                                        _reveals.destroyListener(id);
                                    }
                                }, 450);
                            });
                        $('.back-button').on('click', function(e) {
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

    // $('a[href^="#vt-"]').on('click', function(e) {
    //     // TODO: SCROLL TO IN "VEILLE TECHNOLOGIQUE"
    //     e.preventDefault();
    //     var page = $(this).attr('href'); // Page cible
    //     var speed = 750; // Durée de l'animation (en ms)
    //     console.log('scroll');
    //     $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
    //     return false;
    // });

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

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $(document).on('click', function(e) {
        if(e.which === 2) e.preventDefault();
    });

});