(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/**
 * Copyright chevalier-xavier.fr
 * Created on 15/03/2016.
 */

$(function() {
    var $nav            = $('nav[role="navigation"]'),
        $links          = $nav.find('li a'),
        $work           = $('[data-work].work_figure'),
        $body           = $('body'),
        allRevealFx     = [],
        configsRevealFx = require('./components/configsRevealFx');

    $(document).on('ready load', function() {
        addReveals({
            items: document.querySelectorAll('.images'),
            container: document.querySelector('.works_details'),
            effect: configsRevealFx.lr,
            scrollEvent: true
        });
        addReveals({
            items: document.querySelectorAll('[data-reveal-section]'),
            effect: configsRevealFx.bt,
            scrollEvent: false
        });

        if(location.hash != "") {
            changeSection(location.hash.replace('#', ''));
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

        changeSection(href);
    });

    // $nav.on('click', function() {
    //     $body.removeClass('work_active');
    // });

    $(document).on('click', function(e) {
        if(e.which === 2) e.preventDefault();
    });

    function changeSection(section) {
        var isSameSection = $body.hasClass('section_' + section);
        $body.removeClass().addClass('section_' + section);

        if(isSameSection === false) {
            var $section = $('[data-reveal-section="' + section + '"]');
            allRevealFx[$section.data('reveal-id')].reveal();
        }
    }

    // TODO: Fix bug count...
    function addReveals(params) { // items, container, effect, scrollEvent
        var container = (params.container) ? scrollMonitor.createContainer(params.container) : scrollMonitor,
            count     = (params.items.length + allRevealFx.length);
        //************************ Reveal on scroll ********************************\\
        for(var i = allRevealFx.length; i < count; i++) {
            var element        = params.items[i],
                elementWatcher = container.create(element, -225);

            var RevealElement = new RevealFx(element, {revealSettings: params.effect});

            $(element).data('reveal-id', i);
            allRevealFx.push(RevealElement);

            if(params.scrollEvent === true) {
                elementWatcher.enterViewport(function() {
                    var $element = $(this.watchItem);
                    if($body.hasClass($element.data('reveal-class'))) {
                        allRevealFx[$element.data('reveal-id')].reveal();
                        this.destroy();
                    }
                });
            }
        }
    }
});
},{"./components/configsRevealFx":1}]},{},[2])