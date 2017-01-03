(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
module.exports = function() {
    var allReveals = [];
    return {
        add: function(params) {
            var _this     = this,
                container = (params.container) ? scrollMonitor.createContainer(params.container) : scrollMonitor,
                count     = allReveals.length;
            for(var i = 0; i < params.items.length; i++) {
                var element        = params.items[i],
                    elementWatcher = container.create(element, -225),
                    RevealElement  = new RevealFx(element, {revealSettings: params.effect});

                $(element).data('reveal-id', (count + i));
                allReveals.push({
                    fxElement: RevealElement,
                    scrollListener: null
                });

                //************************ Reveal on scroll ********************************\\
                if(params.scrollEvent === true) {
                    elementWatcher.enterViewport(function() {
                        var $element = $(this.watchItem);
                        if(($element.data('reveal-class') && $('body').hasClass($element.data('reveal-class'))) || !$element.data('reveal-class')) {
                            _this.reveal($element.data('reveal-id'));
                            this.destroy();
                        }
                    });
                    allReveals[(count + i)].scrollListener = elementWatcher;
                }
            }
            return allReveals;
        },
        // remove: function(id) {
        //     return allReveals.splice(id, 1);
        // },
        reveal: function(id) {
            return allReveals[id].fxElement.reveal();
        },
        destroyListener: function(id) {
            return allReveals[id].scrollListener.destroy();
        },
        isInViewport: function(id) {
            console.log(allReveals);
            console.log(allReveals[id]);
            return allReveals[id].scrollListener.isInViewport;
        }
    };
};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./components/configsRevealFx":1,"./components/reveals":2,"./components/section":3}]},{},[4])