/**
 * Copyright chevalier-xavier.fr
 * Created on 15/03/2016.
 */

var $nav         = $('nav[role="navigation"]'),
    $elems       = $nav.find('li a'),
    $work        = $('figure'),
    $work_detail = $('#work_detail'),
    $body        = $('body');

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

$work.on('click', function(e){
    e.preventDefault();
    var work_name    = $(this).data('work'),
        work_content = $(this).find('.work_content').html().trim();

    $('#cube_effect')
        .css({
            width: $(this).width(),
            height: $(this).height(),
            opacity: 1,
            transform: 'translate3d(' + $(this).position().left + 'px, ' + $(this).position().top + 'px, 0)'
        })
        .find('img')
        .attr('src', 'img/' + work_name + '.jpg');

    $work_detail.html(work_content + '<div id="work_detail_background"></div>'); //.css('background-image', 'url(img/' + work_name + '.jpg)')
    $work_detail.find('#work_detail_background').css('background-image', 'url(img/' + work_name + '.jpg)');

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