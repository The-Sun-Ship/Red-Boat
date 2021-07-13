// JavaScript Document

/*------页面跳转-------*/
skipped_href();

function skipped_href() {
	var loc = location.href;
	if (loc.indexOf("?txt") > 0) {
		loc = loc.split("?txt")[1];
		var href_array = loc.split('&');
		var word_id = decodeURI(href_array[1]);
		
		if (href_array[3] === "1") {
			var temp_word_id = "&" + word_id;
			only_show_key_part(temp_word_id);
			scroll_to_document_part();
			change_search_input_content(word_id);
			document.getElementById("return_to_themeriver").style.display = "block";
		} else if(href_array[3] === "2") {
			scroll_to_document_part();
			change_search_input_content_start_search(word_id);
			document.getElementById("return_to_bubblechart").style.display = "block";
			
		} else if(href_array[3] === "3" || href_array[3] === "4") {
			scroll_to_document_part();
			change_search_input_content_start_search(word_id);
			document.getElementById("return_to_wordstatistics").style.display = "block";
			
		}
		
	}
	
}

/*------返回主题河流-------*/
function click_return_to_themeriver() {
	var target_href = "../main_html.html?txt" + "?num&1";
	location.href = target_href;
}
/*------返回气泡图---------*/
function click_return_to_bubblechart() {
	var loc = location.href;
	var href_array = loc.split('&');
	var bubblechart_record = href_array[4] + "&" + href_array[5];
	
	var target_href = "../main_html.html?txt" + "?num&2&" + bubblechart_record;
	location.href = target_href;
}

/*------返回词频统计---------*/
function click_return_to_wordstatistics() {
	var loc = location.href;
	var href_array = loc.split('&');
	var wordstatistics_record = href_array[1];
	
	var target_href = "../main_html.html?txt" + "?num&" + href_array[3] + "&" + wordstatistics_record;
	location.href = target_href;
}


/*-------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------主函数----------------------------*/
document.getElementById("big_box").style.display = "none";
document.getElementById("rising_sun_display").style.display = "none";

document.getElementById("conference_introduce_content").style.visibility = "visible";
js_word_by_word_cout(document.getElementById("conference_introduce_content"));



/*-------------------------------------------------标题栏----------------------------------------------------*/
function change_to_xiangguanneirong_bottom() {
	var xiangguanneirong_li_element = document.getElementById("xiangguanneirong_button");
	xiangguanneirong_li_element.style.borderBottom = "1px solid black";
	document.getElementById("keshihuazhanshi_button").style.borderBottom = "none";
}

function change_to_keshihuazhanshi_bottom() {
	var keshihuazhanshi_li_element = document.getElementById("keshihuazhanshi_button");
	keshihuazhanshi_li_element.style.borderBottom = "1px solid black";
	document.getElementById("xiangguanneirong_button").style.borderBottom = "none";
}

/*----------------------切换到可视化方案---------------------------*/
function show_display_method_chart() {
	hide_show_some_element("part_visual_display_div", "block");
	hide_show_some_element("document_part", "block");
	hide_show_some_element("part4_div_part", "none");
	hide_show_some_element("conference_introduce_div", "block");
	hide_show_some_element("part5_question_answer_div", "none");
	change_to_keshihuazhanshi_bottom();
}

/*----------------------切换到相关内容与树状图----------------------*/
function show_tree_chart() {
	hide_show_some_element("part_visual_display_div", "none");
	hide_show_some_element("document_part", "none");
	hide_show_some_element("part4_div_part", "block");
	hide_show_some_element("conference_introduce_div", "none");
	hide_show_some_element("part5_question_answer_div", "none");
	change_to_xiangguanneirong_bottom();
}
/*-------------------------切换到知识问答页面------------------------*/
function show_question_answer_part() {
	hide_show_some_element("part_visual_display_div", "none");
	hide_show_some_element("document_part", "none");
	hide_show_some_element("part4_div_part", "none");
	hide_show_some_element("conference_introduce_div", "none");
	hide_show_some_element("part5_question_answer_div", "block");
	change_to_xiangguanneirong_bottom();
}
/*---------------------------------------------------------------------------------------------------------标题栏*/


/*-----------------------------------------------------旭日图-------------------------------------------------------*/
/*----------------动态链接操作--------------------*/
/*临时调用函数*/
function add_space(obj) {
	var result = obj.replace(' ', '-');
	return result;
}

myChart.on('click', function (params) {
	init_document();
	var word_id = params.name;
	
	if (word_id === '') {
		show_all_content("all_content");
		change_search_input_content("");
	} else {
		var new_word_id = add_space(word_id);
		show_key_part_hidden_others(new_word_id, "all_content");
		
		 word_id = change_show_content_style(word_id);
		change_search_input_content(word_id);
	}
});


function change_show_content_style(word_id) {
	if (word_id[0] === ".") {
		return word_id.replace(".", "");
	}
	return word_id;
}


/*-------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------词云------------------------------------------------------*/
/*---------------------词云的动态链接操作------------*/
wordcloud_chart.on("click", function (params) {
	init_document();
	var word_id = params.name;
	if (word_id === '.') {
		change_search_input_content("");
		show_all_content("all_content");
		action_unhighlight_keyword();
	} else {
		only_show_key_part(word_id);
		scroll_to_document_part();
		change_search_input_content(word_id);
	}
});


function only_show_key_part(obj) {
	var word_id = obj;
	current_highlight_keyword = word_id;
	action_highlight_keyword(word_id);
	show_key_part_hidden_others(word_id, "all_content");
}



/*---------------------------------------------------------------------------------------*/
/*-------------------------------------------------Textarc---------------------------------------------*/

var have_choosed_key_word = "";
textarc_chart.on("mouseover", function (params) {
	if (params.name !== have_choosed_key_word) {
		
		matched_sentence_elements = [];
		have_choosed_key_word = "";
		search_key_word_draw_line(params);
	}
});

textarc_chart.on("click", function (params) {
	init_document();
	scroll_to_document_part();
	if (params.name !== have_choosed_key_word) {
		have_choosed_key_word = "";
		change_search_input_content_start_search(params.name);
	}
});


textarc_chart.on("mouseout", function (params) {
	var box_canvas_element = document.getElementById("box_canvas");
	var context = box_canvas_element.getContext("2d");
	context.clearRect(x_center - radius, y_center - radius, x_center + radius, y_center + radius);
	cancel_highlight_elements();
	matched_sentence_elements = [];

});
/*------------------------------------------------------------------------------------*/
/*-------------------改变搜索框内容--------------------------*/
function change_search_input_content_start_search(key_word) {
	var search_input_box_element = document.getElementById("search_input_text");
	search_input_box_element.value = key_word;
	document.getElementById("search_input_button").click();
}
/*--------------------在句子中匹配字符串----------------------*/
var matched_sentence_elements = [];

function search_key_word_draw_line(params) {
	var key_word = params.name;
	var sentences_all_elements = document.getElementsByClassName("all_sentences");

	for (var i = 0; i < sentences_all_elements.length; ++i) {
		var sentence_element = sentences_all_elements[i];
		var sentence_element_text = sentence_element.innerHTML;
		if (sentence_element_text.includes(key_word)) {
			matched_sentence_elements.push(sentence_element);
		}
	}

	highlight_matched_sentence_element();
	draw_line_keyword_sentence(params, matched_sentence_elements);
}

/*--------------------------画线----------------------------------*/
var box_wordcloud_element = document.getElementById("box_wordcloud");

function draw_line_keyword_sentence(params, matched_sentence_elements) {
	var box_canvas_element = document.getElementById("box_canvas");
	var context = box_canvas_element.getContext("2d");
	
	/*画线起点位置修正*/
	var wordcloud_element_half_width = $("#box_wordcloud").width() / 2;
	var wordcloud_element_half_height = $("#box_wordcloud").height() / 2;
	/*-------下方起点坐标也有相应修改------*/
	context.strokeStyle = textarc_line_color;
	context.lineWidth = 1;
	context.beginPath();
	var start_point_x = params.event.offsetX + box_wordcloud_element.offsetLeft - wordcloud_element_half_width;
	var start_point_y = params.event.offsetY + box_wordcloud_element.offsetTop - wordcloud_element_half_height;
	for (var i = 0; i < matched_sentence_elements.length; ++i) {
		var sentence_element = matched_sentence_elements[i];
		var end_point_x = sentence_element.offsetLeft;
		var end_point_y = sentence_element.offsetTop;
		if (sentence_element.offsetLeft < x_center) {
			end_point_x = sentence_element.offsetLeft + sentence_element.offsetWidth;
		}

		context.moveTo(start_point_x, start_point_y);
		context.lineTo(end_point_x, end_point_y);
		context.stroke();
	}
	context.closePath();
	
}
/*----------------------------匹配到文本框的突出显示---------------------*/
function highlight_matched_sentence_element() {
	for (var i = 0; i < matched_sentence_elements.length; ++i) {
		var sentence_element = matched_sentence_elements[i];
		
		sentence_element.style.fontWeight = "bold";
		sentence_element.style.color = "black";
		sentence_element.style.zIndex = 10;
	}
}
/*----------------------------取消文本框的突出显示----------------------*/
function cancel_highlight_elements() {
	for (var i = 0; i < matched_sentence_elements.length; ++i) {
		var sentence_element = matched_sentence_elements[i];
		
		sentence_element.style.fontWeight = "normal";
		sentence_element.style.color = part3_text_box_color;
		sentence_element.style.zIndex = 0;
	}
}
/*------------------------------调整convas画布大小-----------------------*/
change_textarc_convas_size();
function change_textarc_convas_size() {
	var convas_element = document.getElementById("box_canvas");
	var size_element_width = $("#big_box").width();
	var size_element_height = $("#big_box").height();
	convas_element.width = size_element_width;
	convas_element.height = size_element_height;
}

/*------------------------------------------------------------------------------------------------textarc*/

/*----------------------------------treechart----------------------------*/
tree_chart.on('click', function (params) {
	var temp_name = "part4_" + params.name;
	var target_element = document.getElementsByClassName(temp_name)[0];
	var target_element_top = target_element.offsetTop;
	if (target_element_top !== undefined) {
		var part4_element_top = 0; //document.getElementById("part4_div_part").offsetTop;
		var part4_table_element_top = document.getElementById("part4_tree_table").offsetTop;
		window.scrollTo(0, part4_element_top + part4_table_element_top + target_element_top - 50);
	}
});


/*---------------------------------------------------搜索框-----------------------------------------------*/
function start_search_all_content() {
	action_unhighlight_keyword();
	var target_search_value = $("#search_input_text").val();
	var word_statistics_num = 0;
	if (target_search_value !== "") {
		current_highlight_keyword = target_search_value;
		action_highlight_keyword();
		if (document.getElementById("zonggang_table")) {
			word_statistics_num = word_statistics_num + search_in_zonggang_table(target_search_value);
		}
		
		word_statistics_num = word_statistics_num + search_in_zhengwen_table(target_search_value);
		
		document.getElementById("search_input_text_wordstatistics").style.visibility = "visible";
	} else {
		show_all_content("all_content");
		current_highlight_keyword = "";
		document.getElementById("search_input_text_wordstatistics").style.visibility = "hidden";
	}
	
	document.getElementById("search_input_text_wordstatistics").value = "出现次数：" + word_statistics_num.toString();
}

/*-----监听搜索框的回车事件------*/
$("#search_input_text").keydown(function(e) {
	if(e.keyCode === 13) {
		start_search_all_content();
	}
});

/*-----------------在总纲中搜索--------------*/
function search_in_zonggang_table(target_value) {
	var temp_sum = 0;
	
	var zonggang_table_elements = document.getElementById("zonggang_table").childNodes[1].childNodes;
	for (var i = 1; i < zonggang_table_elements.length; ++i) {
		var tr_element = zonggang_table_elements[i];
		var tr_element_all_text = tr_element.innerText;
		if (tr_element_all_text !== undefined) {
			if (tr_element_all_text.includes(target_value)) {
				tr_element.style.display = '';
				var one_statistics = tr_element_all_text.split(target_value).length - 1;
				temp_sum = temp_sum + one_statistics;
			} else {
				tr_element.style.display = "none";
			}
		}

	}
	return temp_sum;
}
/*-----------------在章节中搜索----------------*/
function search_in_zhengwen_table(target_value) {
	var temp_sum = 0;
	
	var zhengwen_table_elements = $("#zhengwen_table").children();
	for (var i in zhengwen_table_elements) {
		var tbody_element = zhengwen_table_elements[i];
		var tbody_element_all_text = tbody_element.innerText;
		if (tbody_element_all_text !== undefined) {
			if (tbody_element_all_text.includes(target_value)) {
				tbody_element.style.display = '';
				var one_statistics = tbody_element_all_text.split(target_value).length - 1;
				temp_sum = temp_sum + one_statistics;
			} else {
				tbody_element.style.display = "none";
			}
		}
	}
	
	return temp_sum;
}

/*--------------------------------------------------------------------------------------------------搜索框*/
/*----------------------------------------显示全部按钮--------------------------------------*/
function show_dangzhang_all_content() {
	init_document();
}


/*------------------------------------------------------------------------------显示全部按钮*/

/*------------------------------------------返回顶部按钮---------------------------------------------*/
function return_to_top() {
	window.scrollTo(0, 0);
}

/*--------------------------------------------------------------------------------------------------*/


/*--------------------------------------党章知识问答-------------------------------------------------*/
$(document).ready(function () {
	$(".look_answer_button").click(function () {
		if($(this).val() === "查看答案") {
			$(this).val("隐藏答案");
			var answer_content_element = $(this).next();
			answer_content_element.css("visibility", "visible");
			answer_content_element.attr("id", "choosed_content_div");
			js_word_by_word_cout(document.getElementById("choosed_content_div"));
			answer_content_element.removeAttr("id");
		} else {
			$(this).val("查看答案");
			$(this).next().css("visibility", "hidden");
		}
		
	});
});
/*-------------------------------------------------------------------------------------党章知识问答*/

/*----------逐字打印输出效果---（适用于单个段落）---------------------------------------*/
function js_word_by_word_cout(obj) {
	var all_content = obj.innerHTML;
	var i = 0;
	obj.innerHTML = "";
	js_word_by_word_cout_recursion(i, all_content, obj);
}
function js_word_by_word_cout_recursion(i, all_content, obj) {
	obj.innerHTML += all_content.charAt(i);
	var new_i = i + 1;
	var id = setTimeout(function(){js_word_by_word_cout_recursion(new_i, all_content, obj);},10);
	
	if(i===all_content.length){
    	clearTimeout(id);
    }
}

/*-------------------------------------------------通用函数-----------------------------------------------------*/
/*临时调用函数*/
function if_contain_word_id(arr, word_id) {
	"use strict";
	for (var i = 0; i !== arr.length; ++i) {
		if (arr[i] === word_id) {
			return true;
		}
	}
	return false;
}
/*临时调用函数*/
function get_hidden_elements(all_elements, word_id) {
	"use strict";
	var result = [];
	for (var i = 0; i !== all_elements.length; ++i) {
		var classname = all_elements[i].className.split(" ");
		if (!if_contain_word_id(classname, word_id)) {
			result.push(all_elements[i]);
		}
	}
	return result;
}




/*-----显示关键词条、隐藏非关键词条----*/
function show_key_part_hidden_others(word_id, obj) {
	show_all_content(obj);
	var all_elements = document.getElementsByClassName(obj);
	var hidden_elements = get_hidden_elements(all_elements, word_id); /*隐藏非关键词part*/
	for (var i = 0; i !== hidden_elements.length; ++i) {
		hidden_elements[i].style.display = "none";
	}
}


/*-----------元素的隐藏与显示--------------*/
function hide_show_some_element(element_ID, action) {
	var wordcloud_element = document.getElementById(element_ID);
	wordcloud_element.style.display = action;
}
/*----------------------------------------------------------------------------------------------------通用函数*/





/*----------滚动到正文位置---------*/
function scroll_to_document_part() {
	var document_part_element_top = document.getElementById("document_part").offsetTop;
	window.scrollTo(0, document_part_element_top);
}

/*------------------------------------------------------显示-隐藏文章按钮动作及位置------------------------*/

/*-----------------正文的隐藏与显示---------------*/
var Currently_viewing_entry = "";

function show_all_label(obj) {
	Currently_viewing_entry = get_select_scroll_option_value();
	show_all_content("all_types");
}



/*----------------------------------------------------------------------------------------------------*/




/*----------------------------鸟的随机游动------------------------------------------------
function updata(obj) {
	var pre_left = $("#a_bird").offset().left;
	var pre_top = $("#a_bird").offset().top;
	$("#a_bird").offset({top:(pre_top + move_speed_Y), left:(pre_left + move_speed_X)});
	pre_left = $("#a_bird").offset().left;
	pre_top = $("#a_bird").offset().top;
	var ele_width = $("#a_bird").width();
	var ele_height = $("#a_bird").height();
	
	if (pre_left < 0) {
		$("#a_bird").offset({left:0});
		move_speed_X *= (-1);
	}
	if (pre_top < 0) {
		$("#a_bird").offset({top:0});
		move_speed_Y *= (-1);
	}
	if (pre_left > (window.screen.availWidth - 300)) {
		$("#a_bird").offset({left: (window.screen.availWidth - 300)});
		move_speed_X *= (-1);
	}
	if (pre_top > (document.body.offsetHeight - ele_height)) {
		$("#a_bird").offset({top: (document.body.offsetHeight - ele_height)});
		move_speed_Y *= (-1);
	}
	if (pre_top > 2000) {
		$("#a_bird").offset({top: 2000});
		move_speed_Y *= (-1);
	}
}

var bird_element = $("#a_bird");

var move_speed_X = 3;
var move_speed_Y = 3;


function element_move_function(obj) {
	updata(obj);
	requestAnimationFrame(element_move_function);
}

element_move_function(bird_element);

-----------------------------------------------------------------------------------------*/



