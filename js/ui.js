$(function(){

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html') || document.getElementsByTagName('html')[0],
        $body = $('body'), 
        $header = $('#header'),
        $menu = $('#allMenu'),
        $footer =  $('#footer');


    // Tab
	var tabAction = function() {
		if($('.multi_tab_area').hasClass('active')){
			for (i = 0; i < $('.multi_tab > li').length; i++) {
				$('.multi_tab > li').eq(i).find('> button').click(function(){
					$(this).parent().addClass('on').siblings().removeClass('on').children("button").removeAttr("title");
					$(this).attr('title','선택 됨');
					$(this).closest($('.multi_cont').eq($('.multi_tab li.on').index()).addClass('on').siblings().removeClass('on'));

                    ui.inview();
				});
			}
		}
	}

	tabAction();
    ui.scrollDowned();
    ui.inview();

	var detail1 = $('.detail .rside .cont.n01 .txt');
	var detail2 = $('.detail .rside .cont.n02 .txt');

	$('.btn_open_01').click(function(){
		$(detail1).addClass('open');
		$(detail1).removeClass('close');
		if($(detail1).hasClass('open')){
			$('.btn_open_01').addClass('hide');
			$('.btn_close_01').removeClass('hide');
		}
	});
	$('.btn_close_01').click(function(){
		$(detail1).removeClass('open');
		$(detail1).addClass('close');
		if($(detail1).hasClass('close')){
			$('.btn_close_01').addClass('hide');
			$('.btn_open_01').removeClass('hide');
		}
	});

	$('.btn_open_02').click(function(){
		$(detail2).addClass('open');
		$(detail2).removeClass('close');
		if($(detail2).hasClass('open')){
			$('.btn_open_02').addClass('hide');
			$('.btn_close_02').removeClass('hide');
		}
	});
	$('.btn_close_02').click(function(){
		$(detail2).removeClass('open');
		$(detail2).addClass('close');
		if($(detail2).hasClass('close')){
			$('.btn_close_02').addClass('hide');
			$('.btn_open_02').removeClass('hide');
		}
		
	});

	/*fixed menu */
	// var html = document.querySelector('html');
	// var fixedMenu = document.getElementsByClassName('fixed-area');
	// if(fixedMenu.length > 0){
	// 	var fixedMenuOffstTop = fixedMenu[0].offsetTop;
	// 	var fixedMenuHeight = fixedMenu[0].clientHeight;
	// 	var windowHeight = $(window).height();
	// 	var footerHeight = $('footer').height();

	// 	function scrollingFixed(){
	// 		var scrollTop = document.documentElement.scrollTop;
	// 		var footerOffsetTop = $('footer').offset().top - scrollTop;

	// 		if(scrollTop >= fixedMenuOffstTop){
	// 			html.classList.add('fixed-left');
	// 		}else{
	// 			html.classList.remove('fixed-left');
	// 		}

	// 		if(windowHeight < fixedMenuHeight + footerHeight){
	// 			if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

	// 				if(footerOffsetTop < fixedMenuHeight){
	// 					var minus = footerOffsetTop - fixedMenuHeight - 30;
	// 					$('.fixed-area').css('top',minus);
	// 				}
	// 				else{
	// 					$('.fixed-area').css('top',0);
	// 				}
	// 			}else{
	// 				$('.fixed-area').css('top',0);
	// 			}
	// 		}

	// 	}
	// 	window.addEventListener('scroll', scrollingFixed);
	// 	window.addEventListener('mousewheel', scrollingFixed);
	// 	window.addEventListener('touchmove', scrollingFixed);
	// }
});