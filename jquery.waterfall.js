// * waterfall - jQuery Plugin
// *
// * License: MIT
// * Copyright 2013 carrl yea - carrlyea@gmail.com

;(function() {
    'use strict';

    var it;
    var my_pic_width;	// 圖片寬度
    var my_cols;	// 欄數
    var all_photos = new Array();
    var pos = new Array(my_cols);

    jQuery.fn.waterfall = function(options) {
	var opts = jQuery.extend({}, jQuery.fn.waterfall.defaults, options);
	my_pic_width = opts["pic_width"];
	my_cols = opts["cols"];

	for (var i=0; i<my_cols; i++) {
	    pos[i] = 0;
	}

	it = this;
	it.addClass("waterfall-mode");

	var div_width = (my_pic_width + 32) * my_cols;

	it.children("div").each(function() {
	    var aphoto = {};
	    aphoto["img"] = $(this).attr("img");
	    aphoto["content"] = $(this).html();
	    aphoto["done"] = false;
	    // console.log(aphoto["img"]);
	    // console.log(aphoto["content"]);
	    all_photos.push(aphoto);
	});

	it.html("<div id='waterfall-div'></div>");

	it.find("#waterfall-div").css({ "width": div_width + 20, "height": parseInt(it.css("height")) });
	for (var i=0; i<all_photos.length; i++) {
	    // console.log("i=" + i);
	    var n_html = "<div id='pic_" + String(i) + "' class='waterfall-img-div' style='display:none;'>";
	    n_html += "<img class='waterfall-img' src='" + all_photos[i].img + "' width='" + my_pic_width + "' />";
	    if (all_photos[i].content != "") {
		n_html += "<div class='waterfall-content'>" + all_photos[i].content + "</div>";
	    }
	    n_html += "</div>";
	    it.find("#waterfall-div").append(n_html);
	}

	// 當 圖檔 載入完成 後 執行 pic_loaded
	jQuery("img").load(function() {
	    pic_loaded($(this));
	});
    };

    jQuery.fn.waterfall.defaults = {
	pic_width: 250,
	cols: 4,
    };

    function pic_loaded($obj) {
	// 當 圖檔 載入後, 找到位置最小的列, 將圖檔放到該列
	var done_pic = $obj.parent();
	var pic_id = parseInt(done_pic.attr("id").split("_")[1]);
	// alert(pic_id);
	// console.log("pic_id="+pic_id);
	// console.log(all_photos[pic_id].img);
	all_photos[pic_id].done = true;

	var my_col = min_pos();
	var my_left = my_col * (my_pic_width + 32);

	var my_pic = it.find("#pic_"+pic_id);
	var my_top = pos[my_col];
	// my_pic.css({ "top":my_top, "left":my_left }).fadeIn(1000);
	my_pic.css({ "top":my_top, "left":my_left }).show();
	pos[my_col] = parseInt(my_pic.position().top) + my_pic.outerHeight(true);
    };

    function min_pos() {
	// 找出最小位置是在第幾列
	var result = 0;
	for (var i=1; i<my_cols; i++) {
	    if (pos[i] < pos[result]) {
		result = i;
	    }
	}

	return result;
    };

}) (jQuery);
