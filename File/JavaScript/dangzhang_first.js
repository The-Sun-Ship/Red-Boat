// JavaScript Document





current_highlight_keyword = "";         //记录当前文章中高亮的关键词



$(document).ready(function () {
	
	/*-------------------可视化方案介绍的显示隐藏动作-----------------*/
	$("#wordcloud_button").mouseover(function () {
		$("#wordcloud_button").css("opacity","1"); 
		$("#wordcloud_chart_explain_content_div").fadeIn(500);
	});
	
	$("#wordcloud_button").mouseout(function () {
		if (present_choosed_display_method !== 1) {
			$("#wordcloud_button").css("opacity","0.5"); 
		}
		
		$("#wordcloud_chart_explain_content_div").fadeOut(100);
	});

	$("#risingsun_button").mouseover(function () {
		$("#risingsun_button").css("opacity","1"); 
		$("#risingsun_chart_explain_content_div").fadeIn(500);
	});
	$("#risingsun_button").mouseout(function () {
		if (present_choosed_display_method !== 2) {
			$("#risingsun_button").css("opacity","0.5");
		}
		 
		$("#risingsun_chart_explain_content_div").fadeOut(100);
	});

	$("#textarc_button").mouseover(function () {
		$("#textarc_button").css("opacity","1");
		$("#textarc_chart_explain_content_div").fadeIn(500);
	});
	$("#textarc_button").mouseout(function () {
		if (present_choosed_display_method !== 3){
			$("#textarc_button").css("opacity","0.5");
		}
		
		$("#textarc_chart_explain_content_div").fadeOut(100);
	});
	
	
});



/*-------------------------------------------可视化按钮切换-------------------------------------------*/


var present_choosed_display_method = 1; //记录当前选择的可视化方案

function change_display_method(obj) {
	init_document();
	change_search_input_content("");
	var display_type = obj.value;
	if (display_type === "词云") {
		hide_show_some_element("wordcloud_display", "block");
		hide_show_some_element("rising_sun_display", "none");
		hide_show_some_element("big_box", "none");
		showup_action("wordcloud_display");
		init_button_opacity();
		$("#wordcloud_button").css("opacity","1");
		present_choosed_display_method = 1;

	} else if (display_type === "旭日图") {
		hide_show_some_element("wordcloud_display", "none");
		hide_show_some_element("rising_sun_display", "block");
		hide_show_some_element("big_box", "none");
		showup_action("rising_sun_display");
		init_button_opacity();
		$("#risingsun_button").css("opacity","1");
		present_choosed_display_method = 2;

	} else if (display_type === "文本弧") {
		hide_show_some_element("wordcloud_display", "none");
		hide_show_some_element("rising_sun_display", "none");
		hide_show_some_element("big_box", "block");
		showup_action("big_box");
		init_button_opacity();
		$("#textarc_button").css("opacity","1");
		present_choosed_display_method = 3;

	}
}

/*--------------可视化切换动画------------------*/
function showup_action(obj_id) {
	$("#" + obj_id).css("opacity", 0);
	$("#" + obj_id).animate({opacity:1}, 1000);
}

/*---------初始化切换按钮的显示透明度--------------*/
function init_button_opacity() {
	$("#wordcloud_button").css("opacity","0.5");
	$("#risingsun_button").css("opacity","0.5");
	$("#textarc_button").css("opacity","0.5");
}

/*-----------------文章中的关键词突出显示---------------------*/

function action_highlight_keyword() {
	if (current_highlight_keyword !== ""){
		$(".all_zonggang").highlight(current_highlight_keyword);
		$(".concrete_content").highlight(current_highlight_keyword);
	}
	
}
/*------------初始化文章——取消关键词突出显示------------------*/

function action_unhighlight_keyword() {
	$(".all_zonggang").unhighlight(current_highlight_keyword);
	$(".concrete_content").unhighlight(current_highlight_keyword);
	current_highlight_keyword = "";
}


/*-------文章的初始化操作------*/
function init_document() {
	show_all_content("all_content");
	action_unhighlight_keyword();
	change_search_input_content("");
	document.getElementById("search_input_text_wordstatistics").style.visibility = "hidden";
}




/*----根据word_id展示相关part----*/
function show_all_content(word_id) {
	var all_elements = document.getElementsByClassName(word_id);
	for (var i = 0; i !== all_elements.length; ++i) {
		all_elements[i].style.display = "";
	}
}

/*-----------元素的隐藏与显示--------------*/
function hide_show_some_element(element_ID, action) {
	var wordcloud_element = document.getElementById(element_ID);
	wordcloud_element.style.display = action;
}
/*--------------改变搜索框文本内容（不执行搜索）------------*/
function change_search_input_content(key_word) {
	var search_input_box_element = document.getElementById("search_input_text");
	search_input_box_element.value = key_word;
}




