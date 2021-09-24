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