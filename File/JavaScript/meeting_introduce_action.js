// JavaScript Document

var present_show_meeting_introduce = "";
var last_show_meeting_button = "";
$(document).ready(function () {
	
	$(".dangzhang_button").click(function() {
		if(present_show_meeting_introduce !== "") {
			$(present_show_meeting_introduce).fadeOut(100);
			$(last_show_meeting_button).css("background-color", "rgba(0, 0, 0, 0)");
			$(last_show_meeting_button).css("border", "0px");
			$(last_show_meeting_button).css("opacity", "0.7");
		}
		last_show_meeting_button = "#" + $(this).attr("id");
		var button_id = $(this).attr("id").split("_")[1];
		var temp = "#" + "meeting_" + button_id;
		$(temp).fadeIn(500);
		$(last_show_meeting_button).css("background-color", "rgba(154, 154, 154, 0.8)");
		$(last_show_meeting_button).css("border", "2px solid rgba(154, 154, 154, 0)");
		present_show_meeting_introduce = temp;
		
		
		/*---------设置会议介绍框显示位置----------*/
		var middle_axis = $("#dangzhang_button_inner_box").offset().left + $("#dangzhang_button_inner_box").width() / 2;
		var fixed_top = $(this).offset().top;
		var fixed_left = $(this).offset().left;
		var div_width = $(temp).width();
		var fixed_height = $(this).height() * 2 / 3;
		var fixed_width = $(this).width();
		if (fixed_left > middle_axis) {
			$(temp).offset({top:(fixed_top + fixed_height), left:(fixed_left - div_width - 40)});
		} else {
			$(temp).offset({top:(fixed_top + fixed_height), left:(fixed_left + fixed_width + 20)});
		}
		
		/*-------------------------------------*/
		
		
	});
	
	$(".dangzhang_button").mouseover(function() {
		$(this).css("background-color", "rgba(154, 154, 154, 0.8)");
		$(this).css("border", "2px solid rgba(154, 154, 154, 0)");
		$(this).css("opacity", "1");
	});
	$(".dangzhang_button").mouseout(function() {
		if (("#"+$(this).attr("id")) !== last_show_meeting_button) {
			$(this).css("background-color", "rgba(0, 0, 0, 0)");
			$(this).css("border", "0px");
			$(this).css("opacity", "0.7");
		}
		
	});
	$("#cancel_space").click(function() {
		if(present_show_meeting_introduce !== "") {
			$(present_show_meeting_introduce).fadeOut(100);
			$(last_show_meeting_button).css("background-color", "rgba(0, 0, 0, 0)");
			$(last_show_meeting_button).css("border", "0px");
			$(last_show_meeting_button).css("opacity", "0.7");
		}
	});
});




/*----------------------------鸟的随机游动------------------
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
}

var bird_element = $("#a_bird");

var move_speed_X = 3;
var move_speed_Y = 3;


function element_move_function(obj) {
	
	updata(obj);
	requestAnimationFrame(element_move_function);
}

element_move_function(bird_element);

-----------------------------------------------------------*/
/*-------------------------船的游动---------------------------*/
var boat_element = $("#a_boat");
var boat_move_speed = 0.5;
function updata_boat_location(obj) {
	var pre_left = $("#a_boat").offset().left;
	$("#a_boat").offset({left:(pre_left - boat_move_speed)});
	pre_left = $("#a_boat").offset().left;
	
	if (pre_left < 100) {
		$("#a_boat").fadeOut(500);
		setTimeout(function(){
			$("#a_boat").offset({left:(window.screen.availWidth - 250)});
			$("#a_boat").fadeIn(500);
		}, 500);
		setTimeout(function(){
			window.requestAnimationFrame(boat_move_function);
		}, 1000);
		window.cancelAnimationFrame();
		
		
		$("#a_boat").fadeIn(500);
	}
	
}
function boat_move_function(obj) {
	
	updata_boat_location(obj);
	window.requestAnimationFrame(boat_move_function);
}

boat_move_function(boat_element);
/*-----------------------------------------------------------*/