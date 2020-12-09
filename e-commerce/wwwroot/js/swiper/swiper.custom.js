/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom scripts used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: Site Title*/
/* Version: 1.0 Initial Release*/
/* Build Date: 22-04-2015*/
/* Author: Unbranded*/
/* Website: http://
/* Copyright: (C) 2015 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */
/*-------------------------------------------------------------------------------------------------------------------------------*/

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, _isresponsive, intPoint = 500, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);



	if(_ismobile) $('body').addClass('mobile');

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){

		$('#loader-wrapper').fadeOut();
		$('body').addClass('loaded');
		initSwiper();
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){

		$('.navigation:not(.disable-animation)').addClass('disable-animation');

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	function initSwiper(){
		
		$('.swiper-container:not(.initialized)').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
			if(_ismobile) autoPlayVar = 0;
			var centerVar = parseInt($t.attr('data-center'), 10);
			var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			var loopVar = parseInt($t.attr('data-loop'), 10);
			var speedVar = parseInt($t.attr('data-speed'), 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: simVar,
				centeredSlides: centerVar,
				roundLengths: true,
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.navigation-banner-swiper').length || $t.closest('.parallax-slide').length){
						var qVal = $t.find('.swiper-slide-active').attr('data-val');
						$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
					}
				},
				onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.hasClass('product-preview-swiper')){
						swipers['swiper-'+$t.parent().find('.product-thumbnails-swiper').attr('id')].swipeTo(activeIndex);
						$t.parent().find('.product-thumbnails-swiper .swiper-slide.selected').removeClass('selected');
						$t.parent().find('.product-thumbnails-swiper .swiper-slide').eq(activeIndex).addClass('selected');
					}
					else $t.find('.swiper-slide.active').removeClass('active');
				},
				onSlideClick: function(swiper){
					if($t.hasClass('product-preview-swiper')){
						$t.find('.default-image').attr('src', $t.find('.swiper-slide-active img').attr('src'));
						$t.find('.zoomed-image').attr('src', $t.find('.swiper-slide-active img').data('zoom'));
						$t.find('.product-zoom-container').addClass('visible').animate({'opacity':'1'});
					}
					else if($t.hasClass('product-thumbnails-swiper')){
						swipers['swiper-'+$t.parent().parent().find('.product-preview-swiper').attr('id')].swipeTo(swiper.clickedSlideIndex);
						$t.find('.active').removeClass('active');
						$(swiper.clickedSlide).addClass('active');
					}
				}
			});
			swipers['swiper-'+index].reInit();
			if(!centerVar){
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			}
			initIterator++;
		});

	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=1920 && swiperContainer.parent().hasClass('full-width-product-slider')) return 6;
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
		else if(winW>=intPoint) return parseInt(swiperContainer.attr('data-int-slides'), 10);
		else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
	}

	//swiper arrows
	$('.swiper-arrow-left').click(function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').click(function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});


	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	$('.swiper-tabs .title, .links-drop-down .title').on('click', function(){
		$(this).toggleClass('active');
		$(this).next().slideToggle(300);
	});

	/*sidebar menu*/
	$('.sidebar-navigation .title').on('click', function(){
		if($('.sidebar-navigation .title .fa').is(':visible')) {
			$(this).parent().find('.list').slideToggle(300);
			$(this).parent().toggleClass('active');
		}
	});

	function closePopups(){
		$('.popup.active').animate({'opacity':'0'}, 300, function(){$(this).removeClass('active'); $('.cart-box').removeClass('cart-left cart-right');});
	}

});