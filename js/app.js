/**
 * Copyright chevalier-xavier.fr
 * Created on 15/03/2016.
 */

$(function() {
    var $nav            = $('nav[role="navigation"]'),
        $links          = $nav.find('li a'),
        $work           = $('.work_figure'),
        $work_selected  = $('#work_selected'),
        $back           = $('#back'),
        $body           = $('body'),
        allRevealFx     = [],
        configsRevealFx = require('./components/configsRevealFx');

    $(document).on('ready load', function() {
        var effects = configsRevealFx.lr;
        effects.bgcolor = '#f1f1f1';
        addReveals({
            items: document.querySelectorAll('[data-reveal]'),
            container: document.querySelector('.works'),
            effect: effects,
            scrollEvent: true
        });
        addReveals({
            items: document.querySelectorAll('[data-reveal-section]'),
            effect: configsRevealFx.lr,
            scrollEvent: false
        });

        if(location.hash != "") {
            section(location.hash.replace('#', ''));
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

        section(href);
    });

    function section(section) {
        $body.removeClass().addClass('section_' + section);

        var $section = $('[data-reveal-section="' + section + '"]');
        allRevealFx[$section.data('reveal-id')].reveal();
    }

    // $nav.on('click', function() {
    //     $body.removeClass('work_active');
    // });

    $work.on('click', function(e) {
        e.preventDefault();
        var work_name    = $(this).data('work'),
            work_content = $(this).find('.work_content').html().trim();

        $work_selected.html('<a href="#" id="back">✖</a>' + work_content);
        $back = $('#back');

        $back.on('click', function(e) {
            e.preventDefault();

            $body.removeClass('work_active');
        });

        setTimeout(function() {
            $body.addClass('work_active');
        }, 10);
    });

    $(document).on('click', function(e) {
        if(e.which === 2) e.preventDefault();
    });


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