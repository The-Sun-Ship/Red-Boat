// JavaScript Document



/*-----------元素的隐藏与显示--------------*/
function hide_show_some_element(element_ID, action) {
	var wordcloud_element = document.getElementById(element_ID);
	wordcloud_element.style.display = action;
}


/*----------------------可视化切换-----------------------*/

var pre_show_chart = 1;        /*记录当前的可视化方案*/



function change_display_method(obj) {
	var display_type = obj.value;
	if (display_type === "主题河流") {
		pre_show_chart = 1;
		hide_show_some_element("part_themeriver", "block");
		hide_show_some_element("part_bubble_chart", "none");
		hide_show_some_element("part_word_frequency_statistics", "none");
		showup_action("part_themeriver");
		
		highlight_change_button("themeriver_button");
		unhighlight_change_button("bubble_chart_button");
		unhighlight_change_button("wordstatistics_chart_button");
		
	} else if (display_type === "气泡图") {
		pre_show_chart = 2;
		hide_show_some_element("part_themeriver", "none");
		hide_show_some_element("part_bubble_chart", "block");
		hide_show_some_element("part_word_frequency_statistics", "none");
		showup_action("part_bubble_chart");
		
		unhighlight_change_button("themeriver_button");
		highlight_change_button("bubble_chart_button");
		unhighlight_change_button("wordstatistics_chart_button");
		
	} else if (display_type === "词频统计") {
		pre_show_chart = 3;
		
		hide_show_some_element("part_themeriver", "none");
		hide_show_some_element("part_bubble_chart", "none");
		hide_show_some_element("part_word_frequency_statistics", "block");
		showup_action("part_word_frequency_statistics");
		
		unhighlight_change_button("themeriver_button");
		unhighlight_change_button("bubble_chart_button");
		highlight_change_button("wordstatistics_chart_button");
	}
	
}

function highlight_change_button(obj_id) {
	var element = $("#" + obj_id);
	element.css("background-color", "#d9dee0");
	element.css("border-radius", "20px");
	element.css("opacity", "0.7");
}
function unhighlight_change_button(obj_id) {
	var element = $("#" + obj_id);
	element.css("background-color", "rgba(0,0,0,0.00)");
	element.css("border-radius", "0");
	element.css("opacity", "1");
}

function showup_action(obj_id) {
	$("#" + obj_id).css("opacity", 0);
	$("#" + obj_id).animate({opacity:1}, 1000);
}

$(document).ready(function () {
	$("#themeriver_button").mouseover(function () {
		highlight_change_button("themeriver_button");
		$("#themeriver_explain_content_div").fadeIn(500);
	});
	$("#themeriver_button").mouseout(function () {
		if (pre_show_chart !== 1) {
			unhighlight_change_button("themeriver_button");
		}
		$("#themeriver_explain_content_div").fadeOut(100);
	});
	$("#bubble_chart_button").mouseover(function () {
		highlight_change_button("bubble_chart_button");
		$("#bubble_chart_explain_content_div").fadeIn(500);
	});
	$("#bubble_chart_button").mouseout(function () {
		if (pre_show_chart !== 2) {
			unhighlight_change_button("bubble_chart_button");
		}
		$("#bubble_chart_explain_content_div").fadeOut(100);
	});
	$("#wordstatistics_chart_button").mouseover(function () {
		highlight_change_button("wordstatistics_chart_button");
		$("#wordstatistics_chart_explain_content_div").fadeIn(500);
	});
	$("#wordstatistics_chart_button").mouseout(function () {
		if (pre_show_chart !== 3) {
			unhighlight_change_button("wordstatistics_chart_button");
		}
		$("#wordstatistics_chart_explain_content_div").fadeOut(100);
	});
	
	
	$(".choice_button").mouseover(function () {
		var mouseover_button_id = "#" + ($(this).attr("id"));
		$(mouseover_button_id).css("background-image", "url(Image/picture/bubble_chart_button_choosed.png)");
	});
	$(".choice_button").mouseout(function () {
		var choice_button_id = $(this).attr("id");
		if(choice.indexOf(Number(choice_button_id)) === -1) {
			var mouseover_button_id = "#" + choice_button_id;
			$(mouseover_button_id).css("background-image", "url(Image/picture/bubble_chart_button_background.png)");
		}
	});
});

/*-------------------------------主题河流------------------------------*/


var colors = Highcharts.getOptions().colors;
Highcharts.chart('themeriver', {
	chart: {
		type: 'streamgraph',
		marginBottom: 50,
		/*设置x轴距离下边框的距离*/
		marginTop: 0,
		marginLeft: 20,
		marginRight: 20,
		panning: false,
		zoomType: '',
		backgroundColor: 'rgba(0,0,0,0)'
	},
	credits: {
		enabled: false // 禁用版权信息
	},
	tooltip: {
		useHTML: true,
		pointFormat: '<b>{series.name}</b>'
	},
	dataLabels: {
		enabled: false,
		style: {
			fontSize: "30px",
			color: 'red',
			textOutline: 'none',
			fontWeight: 'normal',
			fontFamily: "字魂47号"
		},
	},
	title: {
		text: '',
	},
	xAxis: { /*设置横轴标签*/
		maxPadding: 0,
		type: 'category',
		crosshair: true,
		categories: [
			'', "二大党章", "三大党章", "四大党章", "五大党章", "六大党章", "七大党章", "八大党章","十二大党章",
			"十三大党章", "十四大党章", "十五大党章", "十六大党章", "十七大党章", "十八大党章", "十九大党章"
		],
		labels: {
			align: 'center',
			reserveSpace: false,
			rotation: 45,
			style: {
				fontWeight: "bold",
				color: "black",
				fontSize: "15px",
				fontFamily: "字魂47号"
					},
		},

		lineWidth: 0,
		/*设置横轴宽度*/
		margin: 40,
		tickWidth: 10
	},
	yAxis: {
		visible: false,
		startOnTick: false,
		endOnTick: false
	},
	legend: {
		enabled: false /*设置图例*/
	},

	plotOptions: {
		series: {
			label: {
				minFontSize: 15,
				maxFontSize: 25,
				style: {
					color: 'rgba(255,255,255,0.75)',
					fontFamily: "字魂47号"
				}
			},
			cursor: "pointer",
			events: { 
                click: function(e) { 
                    skip_to_dangzhang_html(e);
					
                } 
            } 
		},

	},

	
	series: [{
		"name": "中国特色社会主义",
		"data": [			0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.88, 3.17, 4.31, 7.75, 8.98, 15.58
		],
		color: "#C96350"
	}, {

		"name": "经济建设",
		"data": [			0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.68, 0.68, 3.36, 3.70, 3.77, 3.10, 3.17, 2.75
		],
		color: "#B4675B"
	}, {

		"name": "创新",
		"data": [			0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.96, 1.06, 1.62, 3.10, 4.23, 5.50
		],
		color: "#9E6C66"
	}, {

		"name": "法治",
		"data": [			0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.62, 2.58, 2.64, 3.66
		],
		color: "#897071"
	}, {

		"name": "改革开放",
		"data": [			0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 5.76, 6.35, 6.46, 6.72, 7.39, 6.41
		],
		color: "#73757C"
	}, {

		"name": "监督",
		"data": [			0, 0.00, 0.00, 0.00, 2.53, 4.44, 2.42, 2.82, 5.42, 6.14, 3.84, 4.23, 5.92, 6.72, 7.39, 9.16
		],
		color: "#7f939e"
	}, {

		"name": "社会主义现代化",
		"data": [			0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.03, 2.05, 4.80, 5.82, 6.46, 6.72, 6.87, 5.50
		],
		color: "#485464"
	}, {

		"name": "纪律",
		"data": [			0, 1.25, 1.16, 2.17, 1.68, 3.33, 4.03, 8.45, 10.17, 10.24, 8.64, 9.52, 9.69, 9.30, 9.51, 9.16
		],
		color: "#1a1c37"
	}, {
		"name": "组织建设",
		"data": [			0, 3.75, 4.05, 5.42, 2.53, 4.44, 4.03, 4.93, 4.75, 4.78, 3.36, 3.70, 3.77, 3.62, 3.70, 3.21
		],
		color: "#485464"
	}, {
		"name": "指导思想",
		"data": [			0, 0, 0, 0, 0, 0, 3.23, 2.82, 2.71, 2.73, 1.92, 3.17, 3.77, 3.87, 4.23, 4.58
		],
		color: "#5e7987"
	}, {
		"name": "思想路线",
		"data": [			0, 0, 0, 0, 0, 0, 0, 0, 2.71, 2.73, 1.92, 2.12, 2.69, 3.10, 3.17, 2.75
		],
		color: "#7f939e"
	}, {
		"name": "党风建设",
		"data": [			0, 0, 0, 0, 0, 0, 1.61, 1.41, 2.71, 3.41, 3.36, 3.70, 3.77, 3.62, 3.70, 4.58
		],
		color: "#abb4b9"
	}, {
		"name": "群众",
		"data": [			0, 0.00, 0.00, 0.00, 5.05, 2.22, 8.06, 9.16, 8.81, 10.24, 7.20, 8.46, 9.15, 9.82, 10.04, 9.16
		],
		color: "#ccd4d8"
	}],


	exporting: {
		enabled: false
	}
});

/*-----------------页面跳转-----------------*/
function skip_to_dangzhang_html(obj) {
	var temp_number = change_name_to_number(obj.point.category);
	var temp_series_name = obj.point.series.name;
	var target_href = "File/" + temp_number + ".html" + "?txt&" + encodeURI(temp_series_name) + "&?num&1";
	
	location.href = target_href;
}

function change_name_to_number(obj) {
	var temp_name = ["二大党章","三大党章","四大党章","五大党章","六大党章","七大党章","八大党章","十二大党章","十三大党章","十四大党章","十五大党章","十六大党章","十七大党章","十八大党章","十九大党章"];
	var temp_number = ["2","3","4","5","6","7","8","12","13","14","15","16","17","18","19"];
	var target_index = temp_name.indexOf(obj);
	return temp_number[target_index];
}

/*--------------------------------------------------------------------*/
/*---------------------------------气泡图-----------------------------------*/
var word_data_12 =  ['发展党员', '和平', '模范作用', '青年团', '中央委员会', '群众', '人民', '常务委员会', '中央政治局', '教育', '预备党员', '全国代表大会', '团结', '中央顾问委员会', '自治区', '义务', '监督', '法律', '科学', '纪律检查委员会', '毛泽东思想', '马克思列宁主义', '纪律', '矛盾', '党的领导', '民族', '中央军事委员会', '少数民族', '阶级斗争', '社会主义现代化', '先锋队', '经济建设', '共产主义道德', '实事求是', '党的建设', '马克思主义', '民主集中制', '群众路线', '人民解放军', '民主专政'] ;
var word_value_12 =  [1, 3, 1, 3, 39, 33, 23, 18, 15, 13, 11, 11, 11, 10, 8, 8, 8, 7, 7, 30, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 1, 1, 1, 2, 10, 1, 3, 3, 2, 3] ;


var word_data_13 =  ['发展党员', '和平', '党的建设', '青年团', '民主集中制', '中央委员会', '群众', '人民', '常务委员会', '教育', '中央政治局', '全国代表大会', '预备党员', '团结', '中央顾问委员会', '监督', '自治区', '义务', '法律', '科学', '纪律检查委员会', '毛泽东思想', '马克思列宁主义', '纪律', '阶级斗争', '矛盾', '民族', '党的领导', '少数民族', '模范作用', '民主专政', '中央军事委员会', '社会主义现代化', '先锋队', '经济建设', '共产主义道德', '群众路线', '马克思主义', '人民解放军', '实事求是'] ;
var word_value_13 =  [1, 3, 11, 3, 3, 41, 34, 23, 16, 13, 13, 12, 11, 11, 10, 9, 8, 8, 7, 7, 30, 7, 7, 6, 3, 6, 5, 5, 3, 3, 3, 3, 3, 1, 1, 1, 3, 8, 2, 3] ;


var word_data_14 =  ['中央军事委员会', '发展党员', '和平', '党的建设', '阶级斗争', '模范作用', '青年团', '群众', '中央委员会', '人民', '教育', '常务委员会', '全国代表大会', '团结', '改革开放', '预备党员', '中央政治局', '义务', '监督', '马克思列宁主义', '民族', '毛泽东思想', '法律', '科学', '纪律检查委员会', '民主集中制', '党的领导', '实事求是', '自治区', '纪律', '马克思主义', '人民解放军', '少数民族', '群众路线', '中国特色社会主义', '矛盾', '社会主义现代化', '创新', '从严治党', '先锋队', '四项基本原则', '经济建设', '共产主义道德', '民主专政'] ;
var word_value_14 =  [3, 2, 3, 11, 3, 3, 3, 34, 30, 27, 16, 14, 13, 12, 12, 11, 11, 8, 8, 8, 7, 7, 6, 6, 30, 5, 5, 5, 5, 4, 4, 4, 3, 3, 6, 7, 10, 2, 1, 1, 4, 7, 1, 3] ;


var word_data_15 =  ['发展党员', '和平', '党的建设', '阶级斗争', '青年团', '群众', '中央委员会', '人民', '教育', '常务委员会', '全国代表大会', '团结', '改革开放', '预备党员', '中央政治局', '毛泽东思想', '马克思列宁主义', '义务', '监督', '民族', '法律', '科学', '纪律检查委员会', '邓小平理论', '党的领导', '实事求是', '民主集中制', '自治区', '纪律', '马克思主义', '人民解放军', '中央军事委员会', '群众路线', '中国特色社会主义', '矛盾', '社会主义现代化', '创新', '从严治党', '先锋队', '四项基本原则', '经济建设', '共产主义道德', '民主专政', '少数民族', '模范作用'] ;
var word_value_15 =  [2, 3, 11, 3, 3, 34, 30, 27, 16, 14, 13, 12, 12, 11, 11, 9, 9, 8, 8, 7, 6, 6, 30, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 2, 7, 11, 2, 1, 1, 4, 7, 1, 3, 3, 3] ;


var word_data_16 =  ['中央军事委员会', '和平', '阶级斗争', '青年团', '群众', '中央委员会', '人民', '教育', '常务委员会', '全国代表大会', '团结', '改革开放', '预备党员', '监督', '中央政治局', '马克思列宁主义', '毛泽东思想', '义务', '邓小平理论', '三个代表', '民族', '党的领导', '纪律检查委员会', '实事求是', '法律', '民主集中制', '科学', '自治区', '纪律', '马克思主义', '人民解放军', '党的建设', '发展党员', '中国特色社会主义', '矛盾', '社会主义现代化', '依法治国', '创新', '小康社会', '从严治党', '可持续发展', '先锋队', '四项基本原则', '经济建设', '共产主义道德', '群众路线', '民主专政', '少数民族', '模范作用'] ;
var word_value_16 =  [3, 3, 3, 3, 36, 30, 29, 16, 14, 13, 13, 12, 11, 11, 11, 11, 10, 8, 8, 8, 7, 7, 30, 5, 5, 5, 5, 5, 4, 4, 4, 10, 3, 8, 6, 12, 2, 3, 2, 1, 1, 2, 4, 7, 1, 3, 3, 3, 3] ;


var word_data_17 =  ['中央军事委员会', '发展党员', '纪律', '党的建设', '阶级斗争', '青年团', '群众', '人民', '中央委员会', '常务委员会', '教育', '团结', '科学', '监督', '全国代表大会', '改革开放', '中央政治局', '马克思列宁主义', '预备党员', '毛泽东思想', '邓小平理论', '三个代表', '民族', '党的领导', '义务', '法律', '自治区', '马克思主义', '纪律检查委员会', '富强民主文明和谐', '实事求是', '民主集中制', '人民解放军', '和平', '科学发展观', '中国特色社会主义', '矛盾', '社会主义现代化', '依法治国', '创新', '小康社会', '从严治党', '可持续发展', '先锋队', '四项基本原则', '经济建设', '共产主义道德', '群众路线', '民主专政', '少数民族', '模范作用'] ;
var word_value_17 =  [3, 3, 80, 11, 3, 3, 38, 35, 31, 15, 15, 14, 13, 13, 13, 13, 12, 12, 11, 11, 10, 10, 9, 8, 8, 7, 6, 6, 30, 6, 5, 5, 5, 4, 6, 15, 6, 13, 2, 6, 2, 1, 2, 2, 4, 6, 1, 3, 3, 3, 3] ;


var word_data_18 =  ['中央军事委员会', '发展党员', '阶级斗争', '青年团', '人民', '群众', '中央委员会', '常务委员会', '教育', '科学', '监督', '团结', '改革开放', '全国代表大会', '中央政治局', '马克思列宁主义', '预备党员', '毛泽东思想', '马克思主义', '邓小平理论', '三个代表', '民族', '义务', '法律', '党的领导', '自治区', '富强民主文明和谐', '纪律检查委员会', '实事求是', '民主集中制', '人民解放军', '党的建设', '纪律', '和平', '科学发展观', '中国特色社会主义', '生态文明', '矛盾', '社会主义现代化', '依法治国', '创新', '小康社会', '从严治党', '可持续发展', '先锋队', '经济建设', '共产主义道德', '马克思列宁主义', '四项基本原则', '群众路线', '民主专政', '少数民族', '模范作用'] ;
var word_value_18 =  [3, 3, 1, 3, 39, 38, 31, 15, 15, 14, 14, 14, 14, 13, 12, 12, 11, 11, 10, 10, 10, 9, 8, 8, 8, 6, 6, 30, 5, 5, 5, 10, 4, 4, 7, 17, 3, 6, 13, 2, 8, 2, 1, 2, 2, 6, 1, 12, 5, 3, 3, 3, 3] ;


var word_data_19 =  ['中央军事委员会', '发展党员', '阶级斗争', '青年团', '群众', '人民', '中央委员会', '监督', '教育', '常务委员会', '科学', '团结', '改革开放', '全国代表大会', '马克思列宁主义', '马克思主义', '中央政治局', '毛泽东思想', '预备党员', '邓小平理论', '三个代表', '纪律', '民族', '法律', '义务', '党的领导', '自治区', '纪律检查委员会', '富强民主文明和谐', '党的建设', '民主集中制', '实事求是', '人民解放军', '从严治党', '和平', '依法治国', '人类命运共同体', '习近平新时代中国特色社会主义思想', '中华民族伟大复兴', '可持续发展', '主席负责制', '两学一做', '社会主义现代化', '中国特色社会主义', '矛盾', '创新', '生态文明', '小康社会', '先锋队', '四项基本原则', '经济建设', '科学发展观', '共产主义道德', '群众路线', '少数民族', '民主专政', '模范作用'] ;
var word_value_19 =  [3, 4, 1, 3, 45, 43, 32, 20, 19, 17, 15, 14, 14, 13, 13, 12, 12, 12, 11, 11, 11, 10, 8, 8, 8, 7, 6, 30, 6, 10, 5, 5, 5, 5, 4, 3, 1, 8, 4, 3, 1, 1, 12, 34, 6, 12, 3, 3, 2, 4, 6, 8, 1, 3, 3, 3, 3] ;


var word_data_2 =  ['命令', '全国代表大会', '纪律', '中央特派员', '监督', '第三国际'] ;
var word_value_2 =  [6, 6, 1, 1, 1, 1] ;


var word_data_3 =  ['命令', '全国代表大会', '义务', '纪律', '中央特派员', '第三国际'] ;
var word_value_3 =  [6, 6, 2, 1, 1, 1] ;


var word_data_4 =  ['命令', '全国代表大会', '干事会', '义务', '纪律', '中央特派员', '第三国际'] ;
var word_value_4 =  [6, 6, 4, 2, 1, 1, 1] ;


var word_data_5 =  ['党的建设', '党团', '中央委员会', '监察', '干事会', '全国代表大会', '群众', '中央政治局', '青年团', '命令', '义务', '常务委员会', '人才', '监督', '民主集中制', '军事部', '国民党', '联席会议', '自由', '第三国际', '纪律', '教育', '政治宣传'] ;
var word_value_5 =  [11, 27, 23, 12, 11, 7, 6, 6, 5, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1] ;


var word_data_6 =  ['阶级斗争', '党团', '中央委员会', '共产国际', '干事会', '常务委员会', '监督', '青年团', '纪律', '民族', '中央特派员', '民主集中制', '群众', '教育', '自由', '革命行动', '民族语言', '全国代表大会', '少数民族'] ;
var word_value_6 =  [1, 27, 26, 18, 10, 6, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 3] ;


var word_data_7 =  ['人民', '群众', '中央委员会', '全国代表大会', '中央政治局', '民族', '教育', '纪律', '监察', '自由', '中央书记处', '新民主主义', '地下组织', '资产阶级', '模范作用', '监督', '团结', '军事', '干事会', '民主集中制', '毛泽东思想', '马克思列宁主义', '和平', '马克思主义', '少数民族'] ;
var word_value_7 =  [26, 21, 20, 10, 7, 6, 6, 5, 5, 5, 4, 4, 3, 3, 3, 3, 3, 2, 2, 4, 2, 2, 1, 8, 3] ;


var word_data_8 =  ['模范作用', '中央委员会', '自治区', '人民', '群众', '预备党员', '全国代表大会', '常务委员会', '监察', '党的领导', '青年团', '教育', '马克思列宁主义', '团结', '中央书记处', '民族', '中央政治局', '少数民族', '义务', '民主集中制', '官僚主义', '纪律', '监督', '自由', '爱国', '和平', '按劳取酬', '共产主义道德', '群众路线', '马克思主义', '人民解放军', '民主专政'] ;
var word_value_8 =  [1, 41, 33, 32, 31, 15, 15, 13, 13, 10, 10, 8, 8, 8, 7, 7, 6, 5, 5, 4, 4, 4, 4, 4, 3, 3, 1, 1, 3, 8, 2, 3] ;



var clickDetected = false;

var bubble_chart = Highcharts.chart('bubble_chart', {
	chart: {
		type: 'packedbubble',
		height: '52%',
		backgroundColor: 'rgba(0,0,0,0)',
		marginBottom: 50,
		
	},
	title: {
		text: "",
		align: 'center',
		style: {
			color: "black",
			fontWeight: "bold",
			fontSize: "30px",
			fontFamily: "字魂47号"
		}
	},
	legend: {　　
		align: 'center', //水平方向位置
		verticalAlign: 'bottom', //垂直方向位置
		layout: 'horizontal',
		floating: true,
		itemStyle: {
			fontFamily: "字魂47号",
		}
	},
	tooltip: {
		useHTML: true,
		pointFormat: '<b>{point.name}</b>',
		style: {
			fontFamily: "字魂47号",
		}
	},
	credits: {
		enabled: false // 禁用版权信息
	},
	exporting: {
		enabled: false
	},
	plotOptions: {
		series: {
			cursor: "pointer",
			events: { 
                click: function(e) {
					if (clickDetected) {
						if (choice.length === 2) {
							skip_from_bubblechart_to_dangzhang(e);
						}

					} else {
						clickDetected = true;
						setTimeout(function() {
							clickDetected = false;
						}, 500);
					}
                    
					
                } 
            }
			
		},
		packedbubble: {
			minSize: '50%',
			maxSize: '100%',
			zMin: 3,
			zMax: 20,
			layoutAlgorithm: {
				splitSeries: false,
				gravitationalConstant: 0.02
			},
			dataLabels: {
				enabled: true,
				format: '{point.name}',
				filter: {
					property: 'y',
					operator: '>',
					value: 0
				},
				style: {
					fontSize: "15px",
					color: 'black',
					textOutline: 'none',
					fontWeight: 'bold',
					fontFamily: "字魂47号"
				}
			}
		}
	},
	series: [{
		name: '消失的词',
		data: [{
			name: '消失的词',
			value: 5
		}],
		color: "#485464"
	}, {
		name: "未变化的词",
		data: [{
			name: '未变化的词',
			value: 20
		}],
		color: "#6199a1"
	}, {
		name: "新出现的词",
		data: [{
			name: '新出现的词',
			value: 40
		}],
		color: "#c96350"
	}]

});

var choice = [];
var choice_value = [];

$(document).ready(function () {
	$(".choice_button").click(function () {
		
		bubblechart_click_function($(this));

	});
});

function bubblechart_button_choose_action(obj) {
	var obj_id = "#" + obj;
	$(obj_id).css("background-image", "url(Image/picture/bubble_chart_button_choosed.png)");
}

function bubblechart_button_cancel_action(obj) {
	var obj_id = "#" + obj;
	$(obj_id).css("background-image", "url(Image/picture/bubble_chart_button_background.png)");
}

function bubblechart_click_function(obj) {
	var pre_element = obj;

	if (choice.length === 0) {
		choice.push(Number(pre_element.attr("id")));
		bubblechart_button_choose_action(pre_element.attr("id"));
		choice_value.push(pre_element.attr("value"));
	} else if (choice.length === 1 && choice_value.indexOf(pre_element.attr("value")) === -1) {
		choice.push(Number(pre_element.attr("id")));
		bubblechart_button_choose_action(pre_element.attr("id"));
		choice_value.push(pre_element.attr("value"));
		conduct_change_content();
	} else if (choice.length === 2 && choice_value.indexOf(pre_element.attr("value")) === -1) {
		bubblechart_button_cancel_action(choice[0].toString());
		choice.shift();
		choice.push(Number(pre_element.attr("id")));
		bubblechart_button_choose_action(pre_element.attr("id"));
		choice_value.shift();
		choice_value.push(pre_element.attr("value"));
		conduct_change_content();
	}
	
}

function conduct_change_content() {
	var subtitle_text = "";
	if (choice[0] < choice[1]) {
		var series_data = get_series_data(choice[0], choice[1]);
		set_chart_series_data(series_data);
		subtitle_text = choice_value[0] + "      ————>      " + choice_value[1];
	} else if (choice[0] > choice[1]) {
		var series_data = get_series_data(choice[1], choice[0]);
		set_chart_series_data(series_data);
		subtitle_text = choice_value[1] + "      ————>      " + choice_value[0];
	}
	var title_text = {text: subtitle_text};
	bubble_chart.setTitle(title_text);
}

function set_chart_series_data(series_data) {
	for (var i = 0; i < 3; ++i) {
		bubble_chart.series[i].setData(series_data[i]);
	}
}

function get_series_data(start_num, end_num) {
	var classfied_word_value = get_classified_words_value(start_num, end_num);
	var series_data = [];
	for (var i = 0; i < 6;) {
		var one_series_data = [];
		var name_arr = classfied_word_value[i];
		var value_arr = classfied_word_value[i + 1];
		for (var j = 0; j < name_arr.length; ++j) {
			var temp = {
				name: name_arr[j],
				value: value_arr[j]
			};
			one_series_data.push(temp);
		}
		i = i + 2;
		series_data.push(one_series_data);
	}
	return series_data;
}

function get_classified_words_value(start_num, end_num) {
	var start_arr = eval("word_data_" + start_num.toString());
	var start_arr_value = eval("word_value_" + start_num.toString());
	var end_arr = eval("word_data_" + end_num.toString());
	var end_arr_value = eval("word_value_" + end_num.toString());
	var disappearing_words = [];
	var disappearing_words_value = [];
	var same_words = [];
	var same_words_value = [];
	for (var i = 0; i < start_arr.length; ++i) {
		var temp = start_arr[i];
		if (!if_in_array(temp, end_arr)) {
			disappearing_words.push(temp);
			disappearing_words_value.push(start_arr_value[i]);
		} else {
			same_words.push(temp);
			same_words_value.push(start_arr_value[i]);
		}
	}
	var emerging_words = [];
	var emerging_words_value = [];
	for (i = 0; i < end_arr.length; ++i) {
		var temp = end_arr[i];
		if (!if_in_array(temp, start_arr)) {
			emerging_words.push(temp);
			emerging_words_value.push(end_arr_value[i]);
		}
	}
	return [disappearing_words, disappearing_words_value, same_words, same_words_value, emerging_words, emerging_words_value];
}

function if_in_array(obj, arr) {
	for (var i = 0; i < arr.length; ++i) {
		if (obj === arr[i]) {
			return true;
		}
	}
	return false;
}
/*--------------以上为气泡图参数修正--------------------------------*/


/*--------------------页面跳转----------------------*/
function skip_from_bubblechart_to_dangzhang(obj) {
	var point_value = obj.point.name;
	var point_type = obj.point.series.name;
	var target_id = "";
	if (point_type === "消失的词") {
		if (choice[0] < choice[1]){
			target_id = choice[0];
		} else {
			target_id = choice[1];
		}
		
	} else {
		if (choice[0] < choice[1]){
			target_id = choice[1];
		} else {
			target_id = choice[0];
		}
	}
	
	var bubblechart_record = choice[0] + "&" + choice[1];
	var target_href = "File/" + target_id + ".html" + "?txt&" + encodeURI(point_value) + "&?num&2&" + bubblechart_record;
	location.href = target_href;
	
	
}



