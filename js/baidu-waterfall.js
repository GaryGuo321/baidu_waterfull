$(function() {
	$(window).load(function() {
		pictureLine();
		var dataImg = {
			"data": [{
				"src": "1.jpg",
				"title": "喵星人"
			}, {
				"src": "2.jpg",
				"title": "狗狗"
			}, {
				"src": "3.jpg",
				"title": "喵星人"
			}, {
				"src": "4.jpg",
				"title": "喵星人"
			}, {
				"src": "5.jpg",
				"title": "喵星人"
			}, {
				"src": "6.jpg",
				"title": "狗狗"
			}, {
				"src": "7.jpg",
				"title": "狗狗"
			}, {
				"src": "8.jpg",
				"title": "狗狗"
			}, {
				"src": "9.jpg",
				"title": "喵星人"
			}, {
				"src": "10.jpg",
				"title": "狗狗"
			}]
		};
		var navHeight = $(".content-nav").offset().top; //获取导航栏距离顶部的距离 
		$(window).scroll(function() {

			var pictureHeight = $(".box").last().offset().top + $(".box").last().height() / 2; //最后一张图片距离顶部的高度
			var scrollHeight = $(window).scrollTop(); //鼠标滑动距离顶部的高度
			var windowHeight = $(window).height(); //窗口的高度
			if (scrollHeight + windowHeight >= pictureHeight) {
				$.each(dataImg.data, function(index, value) {
					box = $("<div></div>").addClass("box").appendTo($(".waterfall-container"));
					picture = $("<div></div>").addClass("picture").appendTo(box);
					word = $("<div></div>").addClass("img-title").appendTo(box);
					image = $("<img>").attr("src", "../image/water-img/" + $(value).attr("src")).appendTo(picture);
					spanTitle = $("<span>标签：</span>").appendTo(word);
					titleClick = $("<a></a>").text($(value).attr("title")).appendTo(word);
					pictureLine();
					$(picture).mouseover(function() {
						$(this).addClass("pocture-hover");
					}).mouseout(function() {
						$(this).removeClass("pocture-hover");
					});
				})
			}
			if (scrollHeight >= navHeight) {
				$(".content-nav").addClass("content-nav-fixed");
				$(".back").fadeIn(500);
			} else {
				$(".content-nav").removeClass("content-nav-fixed");
				$(".back").fadeOut(500);
			};

		});
	});

	$(".box .picture").mouseover(function() {
		$(this).addClass("pocture-hover");
	}).mouseout(function() {
		$(this).removeClass("pocture-hover");
	});                                           //瀑布流图片的hover效果

	$(".back").click(function(){
		$("body").animate({scrollTop:0},1000);     //设置body的scrollTop可以返回顶部
	}).mouseover(function(){
		$(this).removeClass("back-bg").addClass("back-bg-hover");
	}).mouseout(function(){
		$(this).addClass("back-bg").removeClass("back-bg-hover");
	})
});



function pictureLine() {
	var num = Math.floor($(".waterfall-container").width() / $(".box").eq(0).width());
	var numBoxHeight = []; //用来装第一排的所有高度
	$(".box").each(function(index, element) {
		var boxHeight = $(".box").eq(index).height(); //eq,获取每一个box的高度
		if (index < num) {
			numBoxHeight[index] = boxHeight;
		} else {
			var minBoxHeight = Math.min.apply(Math, numBoxHeight); //找出数组中最小的高度
			var minBoxIndex = $.inArray(minBoxHeight, numBoxHeight); //找到最小高度得第一个位置
			$(element).css({
				"position": "absolute",
				"top": minBoxHeight + 15,
				"left": $(".box").eq(minBoxIndex).position().left
			});
			numBoxHeight[minBoxIndex] = minBoxHeight + 15 + $(element).height();
		}
	});
}
