//滑动模块
var papp = {}

//音乐模块
papp.audio = function(para){
	var _audio = new Audio();
	var target = $(para.target).eq(0);
	mergeKey(_audio, para, false);

	papp.audio = _audio;
	papp.audio.play();
	
	$(document).one("touchstart", function(e){
		if(e.target==document.getElementById(para.target)){
			target.removeClass("on");
		}else{
			if(target.hasClass("on")){
				papp.audio.play();
			}
		}
		event.preventDefault();
	});
	target.addClass("on").on("touchstart",function(){
		if(target.hasClass("on")){
			papp.audio.pause();
			target.removeClass("on");
		}else{
			papp.audio.play();
			target.addClass("on");
		}
	});
	this.pp=function(){
			papp.audio.pause();
			target.removeClass("on");
			
			//alert("//ppp")
	}
	this.ss=function(){
			papp.audio.play();
		//	target.addClass("on");
	}
	
};

function mergeKey(obj1, obj2, union){
	union = typeof(union)=="undefined" ? true : union;
	for(var key in obj2){
		if(obj2.hasOwnProperty(key) && (union || (key in obj1))){
			obj1[key] = obj2[key];
		}
	}
	return obj1;
}