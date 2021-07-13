// JavaScript Document
/*---------------------页面初始化---------------------*/
var useless_word_array = ["党的县", "县(旗)", "党的市", "党的县(旗)", "党的县(旗)", "国家的", "党的组织", ""];
var current_show_dangzhang_id = [18, 19];

function init_html() {
	$("#dangzhang19").css("background-color", "#BEBBBB");
	
	var target_id1 = "document_content_div" + current_show_dangzhang_id[0].toString();
	var target_id2 = "document_content_div" + current_show_dangzhang_id[1].toString();
	hide_show_id_element(target_id1, "block");
	hide_show_id_element(target_id2, "block");
	
	contrast_zonggang_part_main(18, 19);
	
	horizontal_alignment_zhangjiepart(18, 19);
	differ_dangzhang_content_zhangjie(18, 19);
	
	
}
init_html();


/*---------------------------------------选择按钮设置--------------------------------*/
$(".choose_button").mouseover(function (obj){
	var choose_element_id = obj.target.id;
	$("#" + choose_element_id).css("background-color", "#BEBBBB");
});

$(".choose_button").mouseout(function (obj){
	var choose_element_id = obj.target.id;
	if (Number(choose_element_id.split("dangzhang")[1]) !== current_show_dangzhang_id[1]) {
		$("#" + choose_element_id).css("background-color", "");
	}
	
});

var choose_button_array = [3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19];

$(".choose_button").click(function (obj){
	$("#dangzhang" + current_show_dangzhang_id[1].toString()).css("background-color", "");
	
	
	
	var choose_element_id = obj.target.id;
	var latter_num = Number(choose_element_id.split("dangzhang")[1]);
	var formal_num = Number(choose_element_id.split("dangzhang")[1]) - 1;
	
	unhighlight_different_key_word(current_show_dangzhang_id[0], current_show_dangzhang_id[1]);
	recover_zonggang_content_height(current_show_dangzhang_id[0], current_show_dangzhang_id[1]);
	recover_useless_div(current_show_dangzhang_id[0], current_show_dangzhang_id[1]);
	
	undate_title_content(formal_num, latter_num);
	
	show_target_dangzhang(formal_num, latter_num);
	
	contrast_zonggang_part_main(formal_num, latter_num);
	
	horizontal_alignment_zhangjiepart(formal_num, latter_num);
	
	differ_dangzhang_content_zhangjie(formal_num, latter_num);
	
	current_show_dangzhang_id = [formal_num, latter_num];
	
});

/*-----------------------------------------------------------------------选择按钮设置*/
/*------------------标题内容更新----*/
var title_content_array = ["二大党章", "三大党章", "四大党章", "五大党章", "六大党章", "七大党章", "八大党章", "十二大党章", "十三大党章", "十四大党章", "十五大党章", "十六大党章", "十七大党章", "十八大党章", "十九大党章"];
var title_temp_record_array = [2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18, 19];
function undate_title_content(num1, num2) {
	var temp_title1 = title_content_array[title_temp_record_array.indexOf(num1)];
	var temp_title2 = title_content_array[title_temp_record_array.indexOf(num2)];
	document.getElementById("left_title_content").innerHTML = temp_title1;
	document.getElementById("right_title_content").innerHTML = temp_title2;
}


/*---------显示、隐藏选中的内容--------*/
function show_target_dangzhang(num1, num2) {
	var target_id1 = "document_content_div" + current_show_dangzhang_id[0].toString();
	var target_id2 = "document_content_div" + current_show_dangzhang_id[1].toString();
	hide_show_id_element(target_id1, "none");
	hide_show_id_element(target_id2, "none");
	
	current_show_dangzhang_id = [num1, num2];
	target_id1 = "document_content_div" + num1.toString();
	target_id2 = "document_content_div" + num2.toString();
	hide_show_id_element(target_id1, "block");
	hide_show_id_element(target_id2, "block");
}

function hide_show_id_element(element_ID, action) {
	var wordcloud_element = document.getElementById(element_ID);
	wordcloud_element.style.display = action;
}
/*---------------------------------*/






/*--------------------------------------------总纲内容的对比----------------------------------------------*/
function contrast_zonggang_part_main(num1, num2) {
	var temp_id1 = "zonggang_table_tbody" + num1.toString();
	var temp_id2 = "zonggang_table_tbody" + num2.toString();
	if (document.getElementById(temp_id1)!==null && document.getElementById(temp_id2)!==null) {
		differ_dangzhang_content_zonggang(num1, num2);
		contrast_zonggang(num1, num2);
	}
	
	return true;
}


function contrast_zonggang(num1, num2) {

	var temp_id1 = "#zonggang_table_tbody" + num1.toString();
	var temp_id2 = "#zonggang_table_tbody" + num2.toString();
	
	var zonggang1_child = $(temp_id1).children();
	var zonggang2_child = $(temp_id2).children();
	
	var similarity_matrix = get_similarity_matrix(zonggang1_child, zonggang2_child);
	
	var paragraph_pair = get_paragraph_pair(similarity_matrix);
	paragraph_pair = sort_paragraph_pair(paragraph_pair);
	console.log(paragraph_pair);
	horizontal_alignment(zonggang1_child, zonggang2_child, paragraph_pair);
	
	//set_id_attribute(zonggang1_child, zonggang2_child);
	//start_contrast_paragraph(zonggang1_child, zonggang2_child, paragraph_pair);
	
	//del_id_attribute(zonggang1_child, zonggang2_child);
	
	return;
}


/*------水平对齐相应的总纲段落-------*/
function horizontal_alignment(zonggang1_child, zonggang2_child, paragraph_pair) {
	for (var i=0; i<paragraph_pair.length; ++i) {
		var one_pair = paragraph_pair[i];
		var zonggang1_element = zonggang1_child[one_pair[0] - 1];
		var zonggang2_element = zonggang2_child[one_pair[1] - 1];
		var bottom1 = zonggang1_element.offsetTop + zonggang1_element.offsetHeight;
		var bottom2 = zonggang2_element.offsetTop + zonggang2_element.offsetHeight;
		var max_bottom = 0;
		if (bottom1 > bottom2) {max_bottom = bottom1;}
		else {max_bottom = bottom2;}
		
		zonggang1_element.style.height = (max_bottom - bottom1 + zonggang1_element.offsetHeight).toString() + "px";
		zonggang2_element.style.height = (max_bottom - bottom2 + zonggang2_element.offsetHeight).toString() + "px";
		
	}
}
/*恢复总纲part高度*/
function recover_zonggang_content_height(num1, num2) {
	var temp_id1 = "#zonggang_table_tbody" + num1.toString();
	var temp_id2 = "#zonggang_table_tbody" + num2.toString();
	var zonggang1_child = $(temp_id1).children();
	var zonggang2_child = $(temp_id2).children();
	
	for (var i=0; i<zonggang1_child.length; ++i) {
		zonggang1_child[i].style.height = "auto";
	}
	for (var j=0; j<zonggang2_child.length; ++j) {
		zonggang2_child[j].style.height = "auto";
	}
}

/*-------水平对齐章节页面--------*/
function horizontal_alignment_zhangjiepart(num1, num2) {
	var zhangjie1 = "zhengwen_table" + num1.toString();
	var zhangjie2 = "zhengwen_table" + num2.toString();
	var temp_div1 = "a_useless_div" + num1.toString();
	var temp_div2 = "a_useless_div" + num2.toString();
	var max_top = 0;
	var top1 = document.getElementById(zhangjie1).offsetTop;
	var top2 = document.getElementById(zhangjie2).offsetTop;
	if (top1 > top2) {max_top = top1;}
	else {max_top = top2;}
	var temp_height1 = document.getElementById(temp_div1).offsetHeight;
	var temp_height2 = document.getElementById(temp_div2).offsetHeight;
	document.getElementById(temp_div1).style.height = (temp_height1 + max_top - top1).toString() + "px";
	document.getElementById(temp_div2).style.height = (temp_height2 + max_top - top2).toString() + "px";

}
/*恢复章节part高度*/
function recover_useless_div(num1, num2) {
	var temp_div1 = "a_useless_div" + num1.toString();
	document.getElementById(temp_div1).style.height = "100px";
	var temp_div2 = "a_useless_div" + num2.toString();
	document.getElementById(temp_div2).style.height = "100px";
}


/*-----------高亮显示总纲相应的内容--------------*/
function start_contrast_paragraph(zonggang1_child, zonggang2_child, paragraph_pair) {
	
	for (var i=0; i<paragraph_pair.length; ++i) {
		var one_pair = paragraph_pair[i];
		var zonggang1_element = zonggang1_child[one_pair[0]];
		var zonggang2_element = zonggang2_child[one_pair[1]];
		highlight_different_key_word(zonggang1_element, zonggang2_element, one_pair);
	}
}

/*----为党章总纲段落添加id属性-----*/
function set_id_attribute(zonggang1_child, zonggang2_child) {
	for (var i=0; i<zonggang1_child.length; ++i) {
		var current_child = zonggang1_child[i];
		var target_id = "left_zonggang_" + i.toString();
		current_child.setAttribute("id", target_id);
	}
	for (var j=0; j<zonggang2_child.length; ++j) {
		var current_child = zonggang2_child[j];
		var target_id = "right_zonggang_" + j.toString();
		current_child.setAttribute("id", target_id);
	}
}
/*----删除党章总纲段落id属性-----*/
function del_id_attribute(zonggang1_child, zonggang2_child) {
	for (var i=0; i<zonggang1_child.length; ++i) {
		var current_child = zonggang1_child[i];
		current_child.removeAttribute("id");
	}
	for (var j=0; j<zonggang2_child.length; ++j) {
		var current_child = zonggang2_child[j];
		current_child.removeAttribute("id");
	}
}
function unhighlight_different_key_word(num1, num2) {
	var temp_id1 = "#document_content_div" + num1.toString();
	var temp_id2 = "#document_content_div" + num2.toString();
	$(temp_id1).unhighlight({element:"span", className:"left_part_highlight"});
	$(temp_id2).unhighlight({element:"span", className:"right_part_highlight"});
}
function highlight_different_key_word(zonggang1_element, zonggang2_element, one_pair) {
	var text1 = zonggang1_element.textContent;
	var text2 = zonggang2_element.textContent;
	var text1_split = split_one_sentence(text1);
	var text2_split = split_one_sentence(text2);
	
	for (var i=0; i<text1_split.length; ++i){
		var array1_ele = text1_split[i];
		if (text2_split.indexOf(array1_ele) === -1) {
			
			$("#left_zonggang_"+one_pair[0].toString()).highlight(array1_ele, {element:"span", className:"left_part_highlight"});
		}
		
	}
	for (var j=0; j<text2_split.length; ++j){
		var array2_ele = text2_split[j];
		if (text1_split.indexOf(array2_ele) === -1) {
			
			$("#right_zonggang_"+one_pair[1].toString()).highlight(array2_ele, {element:"span", className:"right_part_highlight"});
		}
	}
	del_none_span_element("right_part_highlight");
	del_none_span_element("left_part_highlight");
}
function del_none_span_element(del_class_name) {
	class_name = "." + del_class_name;
	var all_elements = $(class_name);
	for (var i=0; i<all_elements.length; ++i) {
		if (all_elements[i].textContent === "\n        ") {
			all_elements[i].remove();
		}
		
	}
}

/*获取段落间的相似度矩阵*/
function get_similarity_matrix(zonggang1_child, zonggang2_child) {
	var similarity_matrix = [];
	
	for (var i=0; i<zonggang1_child.length; ++i) {
		var similarity_matrix_one_row = [];
		
		var zonggang1_child_text = zonggang1_child[i].textContent;
		for (var j=0; j<zonggang2_child.length; ++j) {
			var zonggang2_child_text = zonggang2_child[j].textContent;
			var temp_sililarity = get_similarity_texts(zonggang1_child_text, zonggang2_child_text);
			similarity_matrix_one_row.push(temp_sililarity);
		}
		
		similarity_matrix.push(similarity_matrix_one_row);
	}
	
	return similarity_matrix;
}

/*根据相似度矩阵获取段落组合对*/
function get_paragraph_pair(similarity_matrix) {
	var result = [];
	
	var rows = similarity_matrix.length;
	var cols = similarity_matrix[0].length;
	while (rows>0 && cols>0) {
		var one_pair = get_max_value_location(similarity_matrix);
		if (one_pair === undefined) {
			break;
		}
		result.push(one_pair);
		similarity_matrix = delete_one_row_col(similarity_matrix, one_pair);
		rows = similarity_matrix.length;
		if (similarity_matrix[0] === undefined) {
			break;
		}
		cols = similarity_matrix[0].length;
	}
	
	return result;
}

/*----对段落组合对进行排序----*/
function sort_paragraph_pair(paragraph_pair) {
	var result = [];
	var formal_array = [];
	var latter_array = [];
	for (var i=0; i<paragraph_pair.length; ++i) {
		formal_array.push(paragraph_pair[i][0]);
		latter_array.push(paragraph_pair[i][1]);
	}
	
	while (result.length < formal_array.length) {
		var flag_index = 0;
		var flag_num = 50;
		for (var i=0; i<formal_array.length; ++i) {
			if (formal_array[i] === undefined) {continue;}
			if (formal_array[i] < flag_num) {
				flag_num = formal_array[i];
				flag_index = i;
			}
		}
		result.push([formal_array[flag_index], latter_array[flag_index]]);
		formal_array[flag_index] = undefined;
	}
	return result;
}

/*----获取矩阵中最大元素的位置---*/
function get_max_value_location(similarity_matrix) {
	var max_value = 0;
	var value_location;
	var rows = similarity_matrix.length;
	var cols = similarity_matrix[0].length;
	for (var i=0; i<rows; ++i){
		for (var j=0; j<cols; ++j){
			if (similarity_matrix[i][j] !== undefined){
				if (similarity_matrix[i][j] >= max_value) {
					max_value = similarity_matrix[i][j];
					value_location = [i, j];
				}
			}
			
		}
	}
	if (max_value < 3) {
		return undefined;
	}
	return value_location;
}
/*----删除矩阵中指定的一行及一列---*/
function delete_one_row_col(similarity_matrix, del_location) {
	var del_row = del_location[0];
	var del_col = del_location[1];
	var new_matrix = [];
	var rows = similarity_matrix.length;
	var cols = similarity_matrix[0].length;
	for (var i=0; i<rows; ++i) {
		if (i!==del_row) {
			var new_matrix_one_row = [];
			for (var j=0; j<cols; ++j) {
				if (j!==del_col) {
					new_matrix_one_row.push(similarity_matrix[i][j]);
				}
				else {
					new_matrix_one_row.push(undefined);
				}
			}
			new_matrix.push(new_matrix_one_row);
		}
		else {
			var new_matrix_one_row = [];
			for (var j=0; j<cols; ++j) {
				new_matrix_one_row.push(undefined);
			}
			new_matrix.push(new_matrix_one_row);
		}
	}
	
	return new_matrix;
}


/*计算两个段落的相似度*/
function get_similarity_texts(text1, text2) {
	var text1_split_array = split_one_sentence(text1);
	var text2_split_array = split_one_sentence(text2);
	var result = calculate_two_arrays_similarity(text1_split_array, text2_split_array);
	return result;
}
/*对一个段落进行分词*/
function split_one_sentence(text) {
	var stopwords = "/，|。|、|:|；/";
	var result = text.split(eval(stopwords));
	return result;
}
/*计算两个数组相同元素的个数*/
function calculate_two_arrays_similarity(array1, array2){
	var result = 0;
	for (var i=0; i<array1.length; ++i){
		var array1_ele = array1[i];
		if (array2.indexOf(array1_ele) > -1) {
			result = result + 1;
		}
		
	}
	return result;
}
/*------------------------------------------------------------------------------------------总纲内容的对比*/





/*------------------------总纲内容对比显示----------------*/
function differ_dangzhang_content_zonggang(num1, num2) {
	var stopwords = "/，|。|、|:|；|（|）/";
	var content1_split = [];
	var content2_split = [];
	
	var zonggang_class1 = ".all_zonggang" + num1.toString();
	var zonggang_class2 = ".all_zonggang" + num2.toString();
	var zonggang_elements1 = $(zonggang_class1);
	var zonggang_elements2 = $(zonggang_class2);
	
	for (var i=0; i<zonggang_elements1.length; ++i) {
		var present_content = zonggang_elements1[i].textContent.replaceAll(" ", "");
		var temp_split = present_content.split(eval(stopwords));
		for (var j=0; j<temp_split.length; ++j) {
			content1_split.push(temp_split[j]);
		}
	}
	for (var i=0; i<zonggang_elements2.length; ++i) {
		var present_content = zonggang_elements2[i].textContent.replaceAll(" ", "");
		var temp_split = present_content.split(eval(stopwords));
		for (var j=0; j<temp_split.length; ++j) {
			content2_split.push(temp_split[j]);
		}
	}
	
	
	for (var i=0; i<content1_split.length; ++i){
		var array1_ele = content1_split[i];
		if (useless_word_array.indexOf(array1_ele) !== -1 || array1_ele.length<=2) {
			continue;
		}
		
		if (content2_split.indexOf(array1_ele) === -1) {
			$(zonggang_class1).highlight(array1_ele, {element:"span", className:"left_part_highlight"});
		}
	}
	for (var j=0; j<content2_split.length; ++j){
		var array2_ele = content2_split[j];
		if (useless_word_array.indexOf(array2_ele) !== -1 || array2_ele.length<=2) {
			continue;
		}
		
		if (content1_split.indexOf(array2_ele) === -1) {
			$(zonggang_class2).highlight(array2_ele, {element:"span", className:"right_part_highlight"});
		}
	}
	
}



/*------------------------章节内容对比显示-------------------------*/
function differ_dangzhang_content_zhangjie(num1, num2) {
	var stopwords = "/，|。|、|:|；|（|）/";
	var content1_split = [];
	var content2_split = [];
	
	var zhangjie_class1 = ".concrete_content" + num1.toString();
	var zhangjie_class2 = ".concrete_content" + num2.toString();
	var dangzhang_elements1 = $(zhangjie_class1);
	var dangzhang_elements2 = $(zhangjie_class2);
	
	for (var i=0; i<dangzhang_elements1.length; ++i) {
		var present_content = dangzhang_elements1[i].textContent.replaceAll(" ", "");
		var temp_split = present_content.split(eval(stopwords));
		for (var j=0; j<temp_split.length; ++j) {
			content1_split.push(temp_split[j]);
		}
	}
	for (var i=0; i<dangzhang_elements2.length; ++i) {
		var present_content = dangzhang_elements2[i].textContent.replaceAll(" ", "");
		var temp_split = present_content.split(eval(stopwords));
		for (var j=0; j<temp_split.length; ++j) {
			content2_split.push(temp_split[j]);
		}
	}
	
	
	for (var i=0; i<content1_split.length; ++i){
		var array1_ele = content1_split[i];
		if (useless_word_array.indexOf(array1_ele) !== -1 || array1_ele.length<=4) {
			continue;
		}
		
		if (content2_split.indexOf(array1_ele) === -1) {
			$(zhangjie_class1).highlight(array1_ele, {element:"span", className:"left_part_highlight"});
		}
	}
	for (var j=0; j<content2_split.length; ++j){
		var array2_ele = content2_split[j];
		if (useless_word_array.indexOf(array2_ele) !== -1 || array2_ele.length<=4) {
			continue;
		}
		
		if (content1_split.indexOf(array2_ele) === -1) {
			$(zhangjie_class2).highlight(array2_ele, {element:"span", className:"right_part_highlight"});
		}
	}
	
}





/*------------------------------------------返回顶部按钮---------------------------------------------*/
function return_to_top() {
	window.scrollTo(0, 0);
}

/*--------------------------------------------------------------------------------------------------*/

