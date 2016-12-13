/**
 * Copyright chevalier-xavier.fr
 * Created on 15/03/2016.
 */

var $nav           = $('nav[role="navigation"]'),
    $elems         = $nav.find('li a'),
    $work          = $('.work_figure'),
    $work_selected = $('#work_selected'),
    $back          = $('#back'),
    $body          = $('body');

function section(section){
    if (section === 'accueil'){
        $body.removeClass();
        return false;
    }
    $body.removeClass().addClass('section_' + section);
}

$(document).on('ready load', function(){
    if (location.hash != ""){
        section(location.hash.replace('#', ''));
    }
});

$elems.on('click', function(e){
    var href = $(this).attr('href').replace('#', '');
    if (href === 'accueil'){
        e.preventDefault();
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    section(href);
});

$nav.on('click', function(){
    if($body.hasClass('work_active')){
        $body.removeClass('work_active');
    }
});

$work.on('click', function(e){
    e.preventDefault();
    var work_name    = $(this).data('work'),
        work_content = $(this).find('.work_content').html().trim();

    $work_selected.html('<a href="#" id="back">✖</a>' + work_content);
    $back = $('#back');

    $back.on('click', function(e){
        e.preventDefault();

        $body.removeClass('work_active');
    });

    setTimeout(function(){
        $body.addClass('work_active');
    }, 10);
});

$('#cube_effect').on('click', function(e){
    e.preventDefault();
    $(this).css({
        opacity: 0,
        transform: 'translate3d(0, 80px, 0)'
    });

    $body.removeClass('work_active');
})

$(window).on('click', function(e){
    if (e.which === 2) e.preventDefault();
});