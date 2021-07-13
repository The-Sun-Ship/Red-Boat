// JavaScript Document
$(document).ready(function () {
	skipped_href();
	
	
	
});



function skipped_href() {
	var loc = location.href;
	if (loc.indexOf("?txt") > 0) {
		loc = loc.split("?txt")[1];
		var href_array = loc.split('&');
		var temp_top = $("#part_themeriver_bubble").offset().top;
		window.scrollTo(0, temp_top);
		if (href_array[1] === "2") {
			var temp_obj = {value: "气泡图"};
			change_display_method(temp_obj);
			var temp1 = "#" + href_array[2];
			var temp2 = "#" + href_array[3];
			bubblechart_click_function($(temp1));
			bubblechart_click_function($(temp2));
		} else if(href_array[1] === "3") {
			var temp_obj = {value: "词频统计"};
			change_display_method(temp_obj);
			var temp_word = decodeURI(href_array[2]);
			var search_input_box_element = document.getElementById("search_input_text");
			search_input_box_element.value = temp_word;
			document.getElementById("search_input_button").click();
		} else if(href_array[1] === "4") {
			var temp_obj = {value: "词频统计"};
			change_display_method(temp_obj);
			var temp_word = decodeURI(href_array[2]);
			
			var search_input_box_element = document.getElementById("search_input_text");
			search_input_box_element.value = temp_word;
			start_word_frequency_statistics();
			
			var temp_obj_child = {id: "barchart_change_button"};
			change_statistics_childchart(temp_obj_child);
		}
		
	}
	
}



/*------------------------------------------------------词频统计图表--------------------------------------------*/
var document_array = ["2", "3", "4", "5", "6", "7", "8", "12", "13", "14", "15", "16", "17", "18", "19"];
var document_word_num_array = [dangzhang2.length, dangzhang3.length, dangzhang4.length, dangzhang5.length, 
							  dangzhang6.length, dangzhang7.length, dangzhang8.length, dangzhang12.length, 
							  dangzhang13.length, dangzhang14.length, dangzhang15.length, dangzhang16.length, 
							  dangzhang17.length, dangzhang18.length, dangzhang19.length];

var pre_statistics_word = "";

function start_word_frequency_statistics() {
	var target_search_value = $("#search_input_text").val();
	var word_frequency_array = [];
	var word_proportion = [];
	for (var i=0; i<document_array.length; ++i) {
		var document_obj = eval("dangzhang" + document_array[i]);
		var word_frequency = document_obj.split(target_search_value).length - 1;
		word_frequency_array.push(word_frequency);
		
		var word_all_num = word_frequency * target_search_value.length;
		word_proportion.push(Number(((word_all_num / document_word_num_array[i]).toFixed(4))));
	}
	if (target_search_value === "") {
		target_search_value = "总字数";
	}
	
	
	if (target_search_value === "总字数") {
		
		frequency_statistics_linechart.series[0].setName("总字数");
		frequency_statistics_linechart.series[1].remove();
		frequency_statistics_linechart.series[0].update();
		frequency_statistics_linechart.legend.update();
		frequency_statistics_linechart.yAxis[0].setTitle({text:""},false);
		
		frequency_statistics_barchart.series[0].setName("总字数");
		frequency_statistics_barchart.series[1].remove();
		frequency_statistics_barchart.series[0].update();
		frequency_statistics_barchart.legend.update();
		frequency_statistics_barchart.yAxis[0].setTitle({text:""},false);
		
	} else {
		frequency_statistics_linechart.yAxis[0].setTitle({text:"词频 (次)"},false);
		frequency_statistics_barchart.yAxis[0].setTitle({text:"词频 (次)"},false);
		
		if (frequency_statistics_linechart.series.length === 1) {
			var series_option = {
				name: '所占比例',
				data: [],
				yAxis: 1,
				color: "#ccd4d8"
				};
			frequency_statistics_linechart.addSeries(series_option);
			frequency_statistics_linechart.series[0].setName("词频");
			frequency_statistics_linechart.series[0].update();
			
			
			frequency_statistics_barchart.addSeries(series_option);
			frequency_statistics_barchart.series[0].setName("词频");
			frequency_statistics_barchart.series[0].update();
			
		}
		
		
		frequency_statistics_linechart.series[1].setData(word_proportion);
		frequency_statistics_barchart.series[1].setData(word_proportion);
	}
	pre_statistics_word = target_search_value;
	
	/*-------------------折线图设置--------------------*/
	frequency_statistics_linechart.series[0].setData(word_frequency_array);
	
	/*-------------------柱状图设置--------------------*/
	frequency_statistics_barchart.series[0].setData(word_frequency_array);
	
	
	
	
}

/*---------------子图表切换--------------------*/
var current_wordstatistics_child_chart = 1;

function change_statistics_childchart(obj) {
	var display_type = obj.id;
	if (display_type === "linechart_change_button") {
		current_wordstatistics_child_chart = 1;
		hide_show_some_element("word_frequency_statistics_linechart", "block");
		hide_show_some_element("word_frequency_statistics_barchart", "none");
		
		$("#linechart_change_button").css("border", "2px solid #A5A3A3");
		$("#barchart_change_button").css("border", "none");
	} else if(display_type === "barchart_change_button") {
		current_wordstatistics_child_chart = 2;
		hide_show_some_element("word_frequency_statistics_linechart", "none");
		hide_show_some_element("word_frequency_statistics_barchart", "block");
		$("#linechart_change_button").css("border", "none");
		$("#barchart_change_button").css("border", "2px solid #A5A3A3");
	}
}


$(document).ready(function () {
	$("#linechart_change_button").mouseover(function () {
		$("#linechart_change_button").css("border", "2px solid #A5A3A3");
	});
	$("#linechart_change_button").mouseout(function () {
		if (current_wordstatistics_child_chart !== 1) {
			$("#linechart_change_button").css("border", "none");
		}
	});
	$("#barchart_change_button").mouseover(function () {
		$("#barchart_change_button").css("border", "2px solid #A5A3A3");
	});
	$("#barchart_change_button").mouseout(function () {
		if (current_wordstatistics_child_chart !== 2) {
			$("#barchart_change_button").css("border", "none");
		}
	});
});
/*-------------------------------------------*/





var frequency_statistics_linechart = Highcharts.chart('word_frequency_statistics_linechart', {
	chart: {
		type: 'line',
		backgroundColor: 'rgba(0,0,0,0)',
		marginBottom: 50,
		height: "50%",
	},
	title: {
		text: '',
		align: 'center',
		style: {
			color: "black",
			fontWeight: "bold",
			fontSize: "25px",
			fontFamily: "字魂47号"
		},
		floating: true,
	},
	credits: {
		enabled: false // 禁用版权信息
	},
	exporting: {
		enabled: false
	},
	legend: {
		align: 'right', //水平方向位置
		verticalAlign: 'top', //垂直方向位置
		layout: 'horizontal',
		itemStyle: {
			fontFamily: "字魂47号",
		}
	},
	xAxis: {
		categories: ["二大党章","三大党章","四大党章","五大党章","六大党章","七大党章","八大党章","十二大党章",
				"十三大党章","十四大党章","十五大党章","十六大党章","十七大党章","十八大党章","十九大党章"
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
		offset: 10,
	},
	yAxis: [{
		min: 0,
		title: {
			text: '词频 (次)',
			style: {
				fontSize: "15px",
				fontFamily: "字魂47号"
			}
		}
	},{
		min: 0,
		title: {
			text: '党章中所占比例',
			style: {
				fontSize: "15px",
				fontFamily: "字魂47号"
			}
		},
		showEmpty: false,
		opposite: true
	}],
	tooltip: {
		shared: true
	},
	plotOptions: {
		line: {
			dataLabels: {
				enabled: true          
			},
			// 关闭鼠标跟踪，对应的提示框、点击事件会失效
			enableMouseTracking: true
		},
		series: {
			cursor: "pointer",
			events: { 
                click: function(e) {
					linechart_skip_to_dangzhang(e);
                    
                } 
            }
			
		},
	},
	series: [{
		name: "词频",
		yAxis: 0,
		data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		color: "#7F939E"
	},{
		name: "所占比例",
		yAxis: 1,
		data: [],
		color: "#ccd4d8"
	}]
});

function linechart_skip_to_dangzhang(obj) {
	var temp_number = change_name_to_number(obj.point.category);
	
	if(pre_statistics_word === "总字数") {
		pre_statistics_word = "";
	}
	
	var target_href = "File/" + temp_number + ".html" + "?txt&" + encodeURI(pre_statistics_word) + "&?num&3";
	
	location.href = target_href;
}



var frequency_statistics_barchart = Highcharts.chart('word_frequency_statistics_barchart',{
	chart: {
		type: 'column',
		backgroundColor: 'rgba(0,0,0,0)',
		marginBottom: 50,
		height: "50%",
	},
	title: {
		text: '',
		floating: true,
		align: 'center',
		style: {
			color: "black",
			fontWeight: "bold",
			fontSize: "25px",
			fontFamily: "字魂47号"
		}
	},
	credits: {
		enabled: false // 禁用版权信息
	},
	exporting: {
		enabled: false
	},
	legend: {
		align: 'right', //水平方向位置
		verticalAlign: 'top', //垂直方向位置
		layout: 'horizontal',
		itemStyle: {
			fontFamily: "字魂47号",
		}
	},
	xAxis: {
		categories: ["二大党章","三大党章","四大党章","五大党章","六大党章","七大党章","八大党章","十二大党章",
				"十三大党章","十四大党章","十五大党章","十六大党章","十七大党章","十八大党章","十九大党章"
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
		offset: 10,
		crosshair: true
	},
	yAxis: [{
		min: 0,
		title: {
			text: '词频 (次)',
			style: {
				fontSize: "15px",
				fontFamily: "字魂47号"
			}
		}
	},{
		min: 0,
		title: {
			text: '党章中所占比例',
			style: {
				fontSize: "15px",
				fontFamily: "字魂47号"
			}
		},
		showEmpty: false,
		opposite: true
	}],
	tooltip: {
		shared: true
	},
	plotOptions: {
		column: {
			borderWidth: 0
		},
		series: {
			cursor: "pointer",
			events: { 
                click: function(e) {
					barchart_skip_to_dangzhang(e); 
                } 
            }
			
		},
	},
	series: [{
		name: '词频',
		yAxis: 0,
		data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		color: "#7F939E"
	},{
		name: '所占比例',
		data: [],
		yAxis: 1,
		color: "#ccd4d8"
	}]
});


function barchart_skip_to_dangzhang(obj) {
	var temp_number = change_name_to_number(obj.point.category);
	if(pre_statistics_word === "总字数") {
		pre_statistics_word = "";
	}
	
	var target_href = "File/" + temp_number + ".html" + "?txt&" + encodeURI(pre_statistics_word) + "&?num&4";
	
	location.href = target_href;
}

/*-----监听搜索框的回车事件------*/
$("#search_input_text").keydown(function(e) {
	if(e.keyCode === 13) {
		start_word_frequency_statistics();
	}
});


start_word_frequency_statistics();