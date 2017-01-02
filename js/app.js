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