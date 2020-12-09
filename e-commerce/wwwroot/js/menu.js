/**
 * Created by bipon on 5/2/2016.
 */


/* *************** */
/* Navigation menu */
/* *************** */

$(document).ready(function(){


    $.fn.iglyphicmenu = function(options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function() {

            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideUp().removeClass('open');
                }
                else {
                    mainmenu.slideDown().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').slideDown();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideUp();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').slideDown();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');


        });
    };

    $(".navy").iglyphicmenu({
        title: "Menu",
        format: "multitoggle"
    });
});


/* *************** */
/* Custom Dropdown */
/* *************** */

$(document).ready(function(){
    var hidden = true;
    $(".b-dropdown").click(function(e){
        e.preventDefault();
        if (hidden){
            $(this).next('.b-dropdown-block').slideToggle(400, function(){hidden = false;});
        }
    });
    $('html').click(function() {
        if (!hidden) {
            $('.b-dropdown-block').slideUp();
            hidden=true;
        }
    });
    $('.b-dropdown-block').click(function(event) {
        event.stopPropagation();
    });
});