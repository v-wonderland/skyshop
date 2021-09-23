$(function(){
    var tabAction = function() {
		if($('.multi_tab_area').hasClass('active')){
			for (i = 0; i < $('.multi_tab > li').length; i++) {
				$('.multi_tab > li').eq(i).find('> button').click(function(){
					$(this).parent().addClass('on').siblings().removeClass('on').children("button").removeAttr("title");
					$(this).attr('title','선택 됨');
					$(this).closest($('.multi_cont').eq($('.multi_tab li.on').index()).addClass('on').siblings().removeClass('on'));
				});
			}
		}
	}
    
	tabAction();
});