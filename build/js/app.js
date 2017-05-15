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
    function isNodeList(nodes) {
        var stringRepr = Object.prototype.toString.call(nodes);

        return typeof nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
            (typeof nodes.length === 'number') &&
            (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
    }
    return {
        /**
         * Ajoute un Reveal
         * @param {} params - items, container, scrollEvent, effect
         * @returns {Array}
         */
        add: function(params) {
            var _this     = this,
                container = (params.container) ? scrollMonitor.createContainer(params.container) : scrollMonitor,
                count     = allReveals.length;

            function addReveal(element, index) {
                var elementWatcher = container.create(element, -225),
                    RevealElement  = new RevealFx(element, {revealSettings: params.effect});

                $(element).data('reveal-id', index);
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
                    allReveals[index].scrollListener = elementWatcher;
                }
            }

            if(isNodeList(params.items)) {
                for(var i = 0; i < params.items.length; i++) {
                    addReveal(params.items[i], (count + i));
                }
            } else if(params.items !== undefined) {
                addReveal(params.items, count);
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
            return allReveals[id].scrollListener.isInViewport;
        }
    };
};
},{}],3:[function(require,module,exports){
module.exports = function(_reveals) {
    return {
        change: function(section) {
            var $body        = $('body'),
                section_name = 'section_' + section,
                workIsShow   = $body.hasClass('work_activate');
            if($body.hasClass(section_name) === false || workIsShow === true) {
                if(workIsShow === true) {
                    var $elActive = $('[data-work-details].activate');
                    $elActive.addClass('transitionEnd');
                    $elActive.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
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
},{"./components/configsRevealFx":1,"./components/reveals":2,"./components/section":3}]},{},[4])