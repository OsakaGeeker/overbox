/// <reference path=”Scripts/jquery-1.9.1-vsdoc.js”/> 
/*
* overbox.js 2.0
* Author FreeBSE http://rootbreak.no-ip.info(Temporary) http://openpear.org/maintainer/FreeBSE
* License MIT
*/


var content;
var config;
var css_position;
var old_ie = false;
var ie = false;

var unload = "";

$(document).ready(function(){
    var data = $("<div/>");
	
	var over = $("<div/>");
	over.attr('id', 'overlay');
	over.css('display', 'none');
	
	if(!jQuery.support.opacity){
	    if(!jQuery.support.style){
	        if (typeof document.documentElement.style.maxHeight == "undefined") {
	        	old_ie = true;
	        }
	    }
	}
	
	if(!jQuery.support.noCloneEvent){
		ie = true;
	}
	
	if(ie){
        over.css('position', 'absolute');
        css_position = 'absolute';
	}else{
        over.css('position', 'fixed');
        css_position = 'fixed';
	}
	
	over.click(function(){
		unload();
	});
	$("body").append(over);
});

;(function($) {
	
	var toJson = function(data){
		var v = new Array();
		for(i = 0, n = data.length - 1 ; i <= n ; i++){
			if(!data[i]) continue;
			value = data[i].split(":");
			v[i] = '"' + value[0].replace(" ", "") + '":' + '"' + value[1].replace(" ", "") + '"';
		}
		var v = '{'+v.join(',')+'}';
		v = eval("("+v+")");
		return v;
	}
	
	var show = function(data, config){
			$.getScript("https://github.com/kanakiyajay/betterToggle/raw/master/jquery.betterToggle.js", function(){
				$(data).betterToggle();
			});
			if(config.shadow == true){
				$.getScript("http://www.bitstorm.org/jquery/shadow-animation/jquery.animate-shadow.js", function(){
					$(data).animate({boxShadow: '0 0 10px #B0C4DE'});
				});
			}
			if(config.round != false){
				$.getScript("http://dillerdesign.com/experiment/DD_roundies/DD_roundies_0.0.2a-min.js", function(){
					DD_roundies.addRule(data, config.round, true);
				});
			}
	}

	var overlay = function(data, setup) {
		var backup;
		content = data;
		if(content.match(/\.jp[e]?g|\.gif|\.png/)){
			var img = $("<img/>");
			var div = $("<div/>");
			var p = $("<p/>");
			p.html("<a href='javascript:void(0)' onClick='unload()' style='text-decoration:none;'>CLOSE</a>");
			p.css({'color':'#FFFFFF','margin':'5px','font-weight':'bold'});
			div.attr('id', '_data');
			div.css('display', 'none');
			
			img.attr('src', content);
			//img.css('margin-top', '100px;');
			//img.css('margin-left', '100px;');
			$('#overlay').fadeTo(1000, 0.8);
			div.append(p);
			div.append(img);
			$("body").append(div);
			//div.fadeTo(1000, 1);
			div.css({'position': css_position,'padding':'10px','background':'#000000'});
			height = div.css('height').replace("px", "");
			width = div.css('width').replace("px", "");
			body_top = parseInt($("#overlay").height()) - parseInt(height / 2) - parseInt($("#overlay").height() / 2);
			div.css('top', body_top);
			div.css('left', ($("#overlay").width() - parseInt(width)) / 2);
			//$('#overlay').append(div);
			/*
			$.getScript("http://www.bitstorm.org/jquery/shadow-animation/jquery.animate-shadow.js", function(){
				$('#_data').animate({boxShadow: '0 0 10px F5F5F5'});
			});
			$.getScript("http://dillerdesign.com/experiment/DD_roundies/DD_roundies_0.0.2a-min.js", function(){
				DD_roundies.addRule('#_data', '10px', true);
			});
			*/
			content = "#_data";
			config = {'lock':false,'remove':true,'round':'10px'};
			show('#_data',config);
			return true;
		}
		  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		if(pattern.test(content)){
			var div = $("<div/>");
			div.attr('id', '_data');
			$("body").append(div);
			div.load(content);
			$('#overlay').fadeTo(1000, 0.8);
			//div.fadeTo(1000, 1);
			height = 300;
			width = 300;
			div.css({'height':height+"px",'width':width+"px",'display':'none'});
			div.css('top', parseInt($("#overlay").height()) - parseInt(height / 2) - parseInt($("#overlay").height() / 2));
			div.css('left', ($("#overlay").width() - parseInt(width)) / 2);
			div.css({'position': css_position,'padding':'10px','background':'#FFFFFF'});
			/*
			$.getScript("http://www.bitstorm.org/jquery/shadow-animation/jquery.animate-shadow.js", function(){
				$('#_data').animate({boxShadow: '0 0 10px F5F5F5'});
			});
			$.getScript("http://dillerdesign.com/experiment/DD_roundies/DD_roundies_0.0.2a-min.js", function(){
				DD_roundies.addRule('#_data', '10px', true);
			});
			*/
			content = "#_data";
			config = {'lock':false,'remove':true};
			show('#_data', false);
			return true;
		}
		
		config = setup;
		/*
		if(config.round !== undefined){
			$.getScript("http://dillerdesign.com/experiment/DD_roundies/DD_roundies_0.0.2a-min.js", function(){
				DD_roundies.addRule(content, config.round, true);
			});
			$.getScript("http://syddev.com/jquery.shadow/jquery.shadow/jquery.shadow.js", function(){
				$(content).shadow();
			});
		}
		*/
		
		//オーバーレイ対象が存在し尚且つ、DOMそのものからの削除設定がある場合
		if($(content).size() && config.remove === true || config.remove === "true"){
			backup = $(content).clone();
		}
		
		if(backup !== undefined && config.remove === true || config.remove === "true"){
			$("body").append(backup);
		}
		
		$('#overlay').fadeTo(1000, 0.9);
		//IE6
		if(old_ie){
			$('#overlay').css('height', document.documentElement.clientHeight);
		}
		
		styles = toJson($(content).attr('style').split(";"));

		if(styles.background != undefined){
			setup.background = styles.background;
		}		
		if(styles.duration != undefined){
			setup.duration = parseInt(styles.duration);
		}
		if(styles.height != undefined){
			setup.height = styles.height;
		}
		if(styles.width != undefined){
			setup.width = styles.width;
		}
		
		$(content).css({'position':css_position,'z-Index': '10000','display': 'block','background': setup.background,'height': setup.height,'padding': setup.padding,'display':'none'});
		height = setup.height.replace("px", "");
		$(content).css('top', parseInt($("#overlay").height()) - parseInt(height / 2) - parseInt($("#overlay").height() / 2));
		width = setup.width.replace("px", "");
		$(content).css('left', ($("#overlay").width() - parseInt(width)) / 2);
		
		show(content, false);
		
		if(ie){
			$(content).css('top', parseInt($('body').scrollTop() + $(window).height()) - parseInt(height / 2) - parseInt($(window).height() / 2));
			$('#overlay').css('height', $(window).scrollTop() + $(window).height());
		}
	}

	
	$.fn.overlay = function(data, setup) {
		$(this).click(function(){
			overlay(data, setup);
		});
	}


	$('a').click(function(e){
		if($(this).attr("rel") == undefined){
			return false;
		}
		if($(this).attr("rel") == 'overbox'){
			var content = $(this).attr("href");
			if(content.match(/^\..*$|^#.*$/)){
				param = toJson($(content).attr('style').split(";"));
			}else{
				param = "";
			}
			overlay(content,param);
			e.stopPropagation();
			return false;
		}
	});

	unload = function(){
		if(config.lock === undefined || config.lock === false){
			$('#overlay').fadeOut(1000);
			$(content).fadeOut(1000, function(){
				if(config.remove === true){
					$(content).remove();
				}
			});
	}
}

})(jQuery);
	
$(window).resize(function(){
	if(config == undefined){
		return false;
	}
	height = config.height.replace("px", "");
	$(content).css('top', parseInt($(window).height()) - parseInt(height / 2) - parseInt($(window).height() / 2));
	width = config.width.replace("px", "");
	$(content).css('left', ($(window).width() - parseInt(width)) / 2);
	if(ie){
        $('#overlay').css('top', $('body').scrollTop());
        $('#overlay').css('height', $(window).height());
	}
});


$(window).scroll(function(){
	if(ie && config != undefined){
		height = config.height.replace("px", "");
		$(content).css('top', parseInt($('body').scrollTop() + $(window).height()) - parseInt(height / 2) - parseInt($(window).height() / 2));
		$('#overlay').css('height', $(window).scrollTop() + $(window).height());
	}
});
