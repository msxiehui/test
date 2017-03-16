/**
 * Created by Administrator on 2015/2/12.
 *
 * 说明：
 * canvas 舞台 100% 窗口大小。
 * 新建 MC stage 作为 内容 窗口，宽度 根据 适配缩放
 *
 * 控制 stage 的 宽度 缩放 和X 位置来达到 居中的目的。
 *大图背景 直接  add 在 StageGa上 进行控制 和 stage 平级
 *
 */
// 页面宽 s_w  高 s_h  缩放值： scale  页面高： h ;宽 w ; vx  页面缩放便宜

var s_w, s_h, scale, h, w, vx;
var stage, stageGa


var Oneke, Twoke, Threeke, Fourke, Fiveke, Sixke, Sevenke, Eightke, Nineke, Tenke, Elevenke, Twelveke;

var mainW = 640,
	mainH = 1008;

//初始化 舞台
init();

var isH;
var log;

function reSize() {

	getHW();
	scale = s_h / mainH;
	//   scale=1;

	var game = document.getElementById("game");
	h = s_h;
	w = 640 * scale;

	game.style.width = w + "px";
	game.style.height = h + "px";
	game.style.left = "50%";
	game.style.marginLeft = -w / 2 + "px";

}

function init() {
	stageGa = new createjs.Stage("game");
	createjs.Touch.enable(stageGa);

	stageGa.canvas.addEventListener("touchstart", mouseStart);
	stageGa.canvas.addEventListener("touchend", mouseEnd);
	stageGa.canvas.addEventListener("mousedown", mouseStart);
	stageGa.canvas.addEventListener("mouseup", mouseEnd);
	//	createjs.Ticker.timingMode=createjs.Ticker.RAF;
	createjs.Ticker.setFPS(30); //舞台帧率控制
	//createjs.Ticker.maxDelta=50;
	// createjs.Ticker.paused = true;
	stageGa.enableMouseOver(10);
	createjs.Ticker.addEventListener('tick', tick); //绑定舞台每一帧的逻辑发生函数
	stage = new createjs.MovieClip(null, 0, true);

	stageGa.addChild(stage);


	getHW();
	scale = s_h / mainH;
	var game = document.getElementById("game");
	h = s_h;
	w = 640 * scale;

	if (isPC()) {
		game.style.width = w + "px";
		game.style.height = h + "px";
		game.style.left = "50%";
		game.style.marginLeft = -w / 2 + "px";
	} else {
		game.style.width = "100%";
		game.style.height = "100%";
		//重置  内容舞台 大小  及 X轴位置。
		stage.scaleX = w / s_w;
		vx = (s_w - (w * w / s_w)) / 2;
		//stage.y=0;
		stage.x = vx;
	}


//	fpsLabel = new createjs.Text("fps", "20px Arial", "#ff7700");
//	fpsLabel.x = 50;
//	stage.addChild(fpsLabel)
//
//	log = new createjs.Text("fps", "20px Arial", "#ff7700");
//	log.x = 200;
//	stage.addChild(log);
//
//	log.text = "w:" + Math.round(w).toString() + "  h:" + Math.round(h).toString() + "   S_w:" + Math.round(s_w).toString() + "  sh:" + Math.round(s_h).toString();
//
//

	try {

		jssdk();

	} catch (e) {
		//TODO handle the exception
	}
}

var fpsLabel
var loading;
window.onload = function() {

	var manifest = [{
			src: 'img/num.png',
			id: 'num'
		}, {
			src: 'img/new.png',
			id: 'p1'
		},

		{
			src: "img/keke23_atlas_.png",
			id: "kekimg"
		},
		{
			src: "img/12_ke_1_atlas_.png?a=1",
			id: "kekimg"
		}

	];

	loader = new createjs.LoadQueue(false);
	loader.setMaxConnections(100);
	loader.maintainScriptOrder = true;
	loader.loadFile({
		src: "img/keke23_atlas_.json",
		//src: "img/mykeke_atlas_.json",
		type: "spritesheet",
		id: "keke23_atlas_"
			//id: "mykeke_atlas_"
	}, true);
	loader.loadFile({
		src: "img/12_ke_1_atlas_.json",
		//src: "img/mykeke_atlas_.json",
		type: "spritesheet",
		id: "12_ke_1_atlas_"
			//id: "mykeke_atlas_"
	}, true);
	loader.addEventListener('complete', loadingCom);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener('progress', loadingPro);
	loader.loadManifest(manifest);

}


var isLoading = false;

function handleFileLoad(evt) {

	if (evt.item.id == "num") {
		isLoading = true;
		TheNum();
	
				papp.audio({
					target: ".music",
					src: "http://7xiztz.com1.z0.glb.clouddn.com/keke2_sound.mp3",
					preload: "auto",
					loop: true,
					autoPlay: true
				});
				
	}

	if (evt.item.type == "image") {
		images[evt.item.id] = evt.result;
	}

}



function loadingPro(e) {
	var b = parseInt(e.progress * 100);
	if (isLoading == true) {
		loading.in(b.toString() + "%");
		console.log(e.progress)
	}

}

var One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Backgd;


function loadingCom() {

	console.log("加载完成！")

	//卸载Loading
	stage.removeChild(loading);

	ss["keke23_atlas_"] = loader.getResult("keke23_atlas_");
	ss["12_ke_1_atlas_"] = loader.getResult("12_ke_1_atlas_");
	//图片序列初始化；
	sheetInit();

	Backgd = new drawBack();

	Backgd.onein();

	One = new drawOne();
	One.in();
	Two = new drawTwo();
	Three = new drawThree();
	Four = new drawFour();
	Five = new drawFive();
	Six = new drawSix();
	Seven = new drawSeven();
	Eight = new drawEight();
	Nine = new drawNine();
	Ten = new drawTen();
	Eleven = new drawEleven();
	//Twelve = new drawTwelve();
	//Twelve.in();

}


function tick() {
	//fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
	stageGa.update();

}

var newTou;isShu=true;

var TheID = 0;

function mouseStart(e) {

//	if (TheID == 12) {
//		return;
//	}

	e.preventDefault();
	if(isShu){
		newTou = stageGa.mouseY
	}else{
		newTou = stageGa.mouseX
		
	}
}

function mouseEnd(e) {
	console.log(TheID);
	if (isShu) {
	
	var juli = newTou - stageGa.mouseY;
	
	} else{

	var juli = newTou - stageGa.mouseX;
		
	}
	
	e.preventDefault();

	if (juli < 0) {
		//console.log("xiao")
		if (Math.abs(juli) > 20) {
			if (TheID == 1) {
				return;
			}
			N_up();
		}
	} else {
		if (Math.abs(juli) > 20) {
			if (TheID == 11) {
				return;
			}
			N_next();
		}
	}
}

function N_next() {
	console.log("next:" + TheID.toString());
	switch (TheID) {
		case 1:
			//alert("next")
			One.next();
			//	Two.in();
			break;
		case 2:
			Two.next();
			break;
		case 3:
			Three.next();
			break;
		case 4:
			Four.next();
			break;
		case 5:
			Five.next();
			break;
		case 6:
			Six.next();
			break;
		case 7:
			Seven.next();
			break;
		case 8:
			Eight.next();
			break;
		case 9:
			Nine.next();
			break;
		case 10:
			Ten.next();
			break;
		case 11:
			Eleven.next();
			break;
	}
}

function N_up() {
	console.log("up:" + TheID.toString());
	switch (TheID) {
		case 2:
			One.up();
			break;
		case 3:
			Two.up();
			break;
		case 4:
			Three.up();
			break;
		case 5:
			Four.up(true);
			break;
		case 6:
			Five.up(true);
			break;
		case 7:
			Six.up(true);
			break;
		case 8:
			Seven.up(true);
			break;
		case 9:
			Eight.up(true);
			break;
		case 10:
			Nine.up(true);
			break;
		case 11:
			Ten.up(true);
			break;
		case 12:
			Eleven.up(true);
			break;
	}
}


function TheNum() {
	var data = {
		"animations": {
			"0": {
				"frames": [0]
			},
			"1": {
				"frames": [1]
			},
			"2": {
				"frames": [2]
			},
			"3": {
				"frames": [3]
			},
			"4": {
				"frames": [4]
			},
			"5": {
				"frames": [5]
			},
			"6": {
				"frames": [6]
			},
			"7": {
				"frames": [7]
			},
			"8": {
				"frames": [8]
			},
			"9": {
				"frames": [9]
			},
			"%": {
				"frames": [10]
			},
			"xin": {
				"frames": [11]
			},
			"L": {
				"frames": [12]
			}
		},
		"images": ["img/num.png"],
		"frames": [
			// x, y, width, height, imageIndex*, regX*, regY*
			[4, 0, 24, 40, 0],
			[28, 0, 24, 40, 0],
			[52, 0, 24, 40, 0],
			[80, 0, 24, 40, 0],
			[109, 0, 24, 40, 0],
			[136, 0, 24, 40, 0],
			[164, 0, 24, 40, 0],
			[193, 0, 24, 40, 0],
			[221, 0, 24, 40, 0],
			[248, 0, 24, 40, 0],
			[276, 0, 41, 40, 0],
			[0, 43, 136, 103, 0, 68, 52],
			//	[0, 43, 136, 103, 0, 5, 50],
			[173, 54, 164, 36, 0]

		]
	};


	loading = new createjs.MovieClip(null, 0, true);

	var ss = new createjs.SpriteSheet(data);
	var Ttext = new createjs.BitmapText("1234567890%", ss);

	var lo = new createjs.Sprite(ss, "L");
	var xin = new createjs.Sprite(ss, "xin");

	//Ttext.cache(0, 0, 40, 40);

	loading.timeline.addTween(createjs.Tween.get(Ttext));
	loading.timeline.addTween(createjs.Tween.get(lo));
	loading.timeline.addTween(createjs.Tween.get(xin));

	createjs.Tween.get(xin).to({
		scaleX: 1.2,
		scaleY: 1.2
	}, 500).to({
		scaleX: 1,
		scaleY: 1
	}, 500).loop = true;

	xin.x = 130;
	xin.y = 50;
	lo.y = 120;
	Ttext.x = 170;
	Ttext.y = 118;

	stage.addChild(loading);
	Ttext.text = "0%";
	loading.x = (mainW - 150) / 2;
	loading.y = (mainH - 156) / 2;

	loading.scaleX = 0.6;
	loading.scaleY = 0.6;

	loading.in = function(sr) {
		Ttext.text = sr
			//console.log(sr);
	}

}


var sheet1
	/*
	 *
	 * 初始化 图片序列，以供后期调用
	 *
	 * */

function sheetInit() {


	var s1 = {
		"animations": {
    
	        "10t":[0], 
	        "1t":[1], 
	        "2t":[2], 
	        "3t":[3], 
	        "4t":[4], 
	        "5t":[5], 
	        "6t":[6], 
	        "7t":[7], 
	        "8t":[8], 
	        "9t":[9], 
	        "huang":[10], 
	        "lan":[11], 
	        "lv":[12], 
	        "shenlan":[13]
		},
		"images": ["img/new.png"],
		"frames": [
			// x, y, width, height, imageIndex*, regX*, regY*

				[3374, 890, 400, 185,0, 200, 92], 
			    [2972, 2,400, 377,0, 200, 188], 
			    [2972, 901, 400, 175,0, 200, 87], 
			    [2972, 662, 400, 237,0, 200, 118], 
			    [3374, 623, 400, 265,0, 200, 132], 
			    [2570, 2,  400, 527,0,200, 263], 
			    [3374, 2,400, 329,0, 200, 164], 
			    [2570, 531, 400, 435,0,200, 217], 
			    [3374, 333,400, 283,0, 200, 141], 
			    [2972, 381, 400, 279,0,200, 140], 
			    [1928, 2, 640, 1008,0,320, 504], 
			    [1286, 2, 640, 1008,0,320, 504], 
			    [644, 2, 640, 1008,0,320, 504], 
			    [2, 2, 640, 1008,0,320, 504]
 
		]
	};
	sheet1 = new createjs.SpriteSheet(s1);

}


function drawBack() {

	var mc = new createjs.MovieClip(null, 0, true);

	// bj1 
	var lan = new drawSprite(sheet1, "lan", true, true, mc);
	var lv = new drawSprite(sheet1, "lv", true, true, mc);
	var huang = new drawSprite(sheet1, "huang", true, true, mc);
	var shenglan = new drawSprite(sheet1, "shenlan", true, true, mc);

	stageGa.addChildAt(mc, 0);

	this.onein = function() {
		lan.init(true);
	}

	this.next = function(name) {
		var m = mc.getChildByName(name);
		m.init(true);
		m.y = 1512;
		createjs.Tween.get(m).wait(0).to({
			y: mainH / 2
		}, 500);
	}
	this.out = function(name) {
		var m = mc.getChildByName(name);
		createjs.Tween.get(m).wait(0).to({
			y: -504
		}, 500);
	}

	this.up = function(name) {
		var m = mc.getChildByName(name);
		m.init(true);
		m.y = -504;
		createjs.Tween.get(m).wait(0).to({
			y: mainH / 2
		}, 500);
	}
	this.Lout = function(name) {
		var m = mc.getChildByName(name);
		createjs.Tween.get(m).wait(0).to({
			y: 1512
		}, 500);
	}
	
	this.al = function(name,i) {
		var m = mc.getChildByName(name);
		createjs.Tween.get(m).wait(0).to({
			alpha: i
		}, 500);
	}
	
	this.xy = function(name,x,y) {
		var m = mc.getChildByName(name);
		m.x=x;
		m.y=y;
		
	}
	
}

function drawOne() {
	var mc = new createjs.MovieClip(null, 0, true);
	var t1 = new drawSprite(sheet1, "1t", true, true, mc);
	stage.addChild(mc);

	this.in = Tin;

	function Tin() {
		console.log("one in");
		TheID = 1;
		Oneke = addMC(new lib._1ke(), 32, -63, 164, 185);
		Oneke.init(true, false);

		Oneke.scale(1.2);
		mc.addChild(Oneke);

		t1.init(false, null, -10);
		t1.alpha = 0;
		t1.setVisible();
		//		
		Oneke.setBottom(-mainH * 0.4);
		Oneke.setRight(30);

		var xx = Oneke.getX();
		createjs.Tween.get(Oneke).wait(100).to({
			x: xx
		}, 500, createjs.Ease.backInOut).call(function() {
			Oneke.play();
		});

		createjs.Tween.get(t1).wait(200).to({
			y: mainH * 0.4,
			alpha: 1
		}, 500, createjs.Ease.backInOut);


	}
	this.next = next;

	function next() {
		console.log("one next");
		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Oneke);


		});

		Two.in();

	}
	this.up = up;

	function up() {

		TheID = 1;
		console.log("one up");
		mc.addChild(Oneke);
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)

		Two.upout();

	}
}

function drawTwo() {

	var mc = new createjs.MovieClip(null, 0, true);

	var t2 = new drawSprite(sheet1, "2t", true, true, mc);

	stage.addChild(mc);

	this.in = function() {
		console.log("two in");
		TheID = 2;
		//Backgd.twoIn();
		mc.x = 0;

		Twoke = addMC(new lib.x2ke(), 0, 100, 630, 412);
		Twoke.init(true, false);

		mc.addChild(Twoke);

		t2.init(false, null, -10);
		t2.alpha = 0;
		t2.setVisible();
		Twoke.scale(1.2);

		Twoke.x = mainW - Twoke.width / 2;
		Twoke.setBottom(100)
		var yy = mainH - Twoke.height / 2 - 100;

		createjs.Tween.get(Twoke).wait(100).to({
			y: yy
		}, 500, createjs.Ease.backInOut).call(function() {

			Twoke.play();
		});

		createjs.Tween.get(t2).wait(200).to({
			y: mainH * 0.4,
			alpha: 1
		}, 500, createjs.Ease.backInOut);

	}
	this.next = next;

	function next() {

		console.log("Two next");
		Backgd.out("lan");
		Three.in();

		createjs.Tween.get(mc).wait(0).to({
			x: -mainH
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Twoke);
		});

	}

	this.up = up;
	this.upout = upout;

	function up() {
		console.log("Two up");
		TheID = 2;
		mc.addChild(Twoke);
		Backgd.up("lan");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
		Three.upout();
	}

	function upout() {

		console.log("Two upout");
		createjs.Tween.get(mc).wait(0).to({
			x: mainW * 2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Twoke);
		});
	}
}

function drawThree() {
	var mc = new createjs.MovieClip(null, 0, true);

	var t3 = new drawSprite(sheet1, "3t", true, true, mc);

	stage.addChild(mc);

	this.in = function() {
		console.log("Three in");
	
		TheID = 3;
		Backgd.next("lan");
		mc.x = 0;
		Threeke = addMC(new lib._10ke(), 0, 0, 355, 400);
		Threeke.init(true, true);
		Threeke.scale(0.2);
		Threeke.x = 250;
		Threeke.y = 650;
		Threeke.alpha = 0
		mc.addChild(Threeke);

		t3.init(false, null);
		t3.scale(0.5, 0.5)
		t3.y = 400;
		t3.x = mainW / 2;
		t3.alpha=0

		//t4.scale(1,1);
		t3.setVisible();
		createjs.Tween.get(Threeke).wait(100).to({
			y: 700,
			scaleX: 0.5,
			scaleY: 0.5,
			alpha: 1
		}, 1000, createjs.Ease.backInOut);
		createjs.Tween.get(t3).wait(400).to({
			scaleX: 1,
			scaleY: 1,
			alpha: 1
		}, 500, createjs.Ease.backInOut);


	}
	this.next = next;

	function next() {
	
		Four.in();

		Backgd.out("lan");
	
		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Threeke);

		})

	}
	this.up = up;
	this.upout = upout;

	function up() {

		console.log("3 up");
		TheID = 3;
		mc.addChild(Threeke);
		Backgd.up("lan");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
		Four.upout();
	}

	function upout() {

		console.log("3 upout");
		Backgd.Lout("lan")
		createjs.Tween.get(mc).wait(0).to({
			x: mainW *2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Threeke);
		});
	}
}


function drawFour() {

	var mc = new createjs.MovieClip(null, 0, true);

	var t4 = new drawSprite(sheet1, "4t", true, true, mc);
	stage.addChild(mc);

	this.in = function() {
		console.log("four in");
		TheID = 4;
		Backgd.next("shenlan")
		mc.x = 0;
		Fourke = addMC(new lib._11ke(), 0, 0, 355, 400);
		Fourke.init(true, true);
		Fourke.x = 330;
		Fourke.y = 450;
		Fourke.scale(0.6);
		Fourke.alpha = 0;
		mc.addChild(Fourke);
		mc.alpha=1;
		

		t4.init(false, null);
		t4.y = 200;
		t4.scale(0.5, 0.5);
		t4.alpha = 0;
		t4.x = mainW / 2;

		//t4.scale(1,1);
		t4.setVisible();
		createjs.Tween.get(Fourke).wait(100).to({
			alpha: 1
		}, 500, createjs.Ease.backInOut);


		createjs.Tween.get(t4).wait(400).to({
			scaleX: 1,
			scaleY: 1,
			alpha: 1
		}, 500, createjs.Ease.backInOut);

	}

	this.next = next;

	function next() {
		
		Backgd.out("shenlan")
		Five.in();

		createjs.Tween.get(mc).wait(0).to({
			alpha: 0
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Fourke);

		})
	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("4 up");
		TheID = 4;
		mc.addChild(Fourke);
		Backgd.up("shenlan");
		createjs.Tween.get(mc).wait(0).to({
			alpha: 1
		}, 500, createjs.Ease.backInOut)
		Five.upout();
	}

	function upout() {

		console.log("4 upout");
		Backgd.Lout("shenlan");
		createjs.Tween.get(mc).wait(0).to({
			alpha: 0
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Fourke);
		});
	}

}

function drawFive() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);
	var t5 = new drawSprite(sheet1, "5t", true, true, mc);
	stage.addChild(mc);

	this.in = function() {
		TheID = 5;
		Backgd.next("lv");
		mc.x=0;
		

		Fiveke = addMC(new lib._3ke(), 0, 0, 500, 500);
		Fiveke.init(true, true);
		Fiveke.x = -100;
		Fiveke.y = 500;
		mc.addChild(Fiveke);

		t5.init(false, null);
		t5.y = mainH * 0.4;
		t5.x = mainW + t5.width

		//t3.scale(1,1);
		t5.setVisible();
		//	Threeke.x=mainW-Threeke.width/2;
		//Threeke.setBottom(100)
		//var yy=mainH-Threeke.height/2-100;

		createjs.Tween.get(Fiveke).wait(0).to({
			x: 100,
			alpha: 1
		}, 500, createjs.Ease.backInOut);

		createjs.Tween.get(t5).wait(200).to({
			x: mainW / 2,
			alpha: 1
		}, 500, createjs.Ease.backInOut);

	}

	this.next = next;

	function next() {

		Backgd.out("lv");
		Six.in();
		
		createjs.Tween.get(t5).wait(0).to({
			y: -mainH,
			alpha: 0
		}, 500, createjs.Ease.backInOut);
		createjs.Tween.get(Fiveke).wait(0).to({
			x: mainW + 100,
			alpha: 0
		}, 500, createjs.Ease.backInOut);

		createjs.Tween.get(mc).wait(400).to({
			x: mainW + 100
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Fiveke);
		})

	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("5 up");
		TheID = 5;
		Backgd.up("lv");
		
		mc.addChild(Fiveke);
		t5.y = mainH * 0.4;
		t5.x = mainW / 2;
		Fiveke.x = 100;
		Fiveke.y = 500;
		Fiveke.alpha = 1;
		t5.alpha = 1;

		createjs.Tween.get(mc).wait(0).to({
			x: 0,
			alpha: 1

		}, 500, createjs.Ease.backInOut)
		Six.upout();
	}

	function upout() {

		console.log("5 upout");
		Backgd.Lout("lv");
		createjs.Tween.get(mc).wait(0).to({
			x: mainW * 2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Fiveke);
		});
	}
}


function drawSix() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);
	var t6 = new drawSprite(sheet1, "6t", true, true, mc);


	stage.addChild(mc);

	this.in = function() {
		TheID = 6;
		Backgd.next("lan");
		mc.x = 0;
		Sixke = addMC(new lib._4ke(), 0, 0, 500, 500);
		Sixke.init(true, true);
		Sixke.scale(0.6);
		Sixke.x = -100;
		Sixke.y = 550;
		mc.addChild(Sixke);

		t6.init(false, null);
		t6.y = mainH * 0.4;
		t6.x = mainW + t6.width

		t6.setVisible();


		createjs.Tween.get(Sixke).wait(0).to({
			x: 130
		}, 500, createjs.Ease.backInOut);



		createjs.Tween.get(t6).wait(200).to({
			x: mainW / 2,
			alpha: 1
		}, 500, createjs.Ease.backInOut);


	}


	this.next = next;

	function next() {
	
		Backgd.out("lan")
		Seven.in();
		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Sixke);


		});
	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("6 up");
		TheID = 6;
		mc.addChild(Sixke);
		
		Backgd.up("lan");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
		Seven.upout();
		
	}

	function upout() {

		console.log("6 upout");
		Backgd.up("lan");
		createjs.Tween.get(mc).wait(0).to({
			x: mainW * 2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Sixke);
		});
	}
}

function drawSeven() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);
	var t7 =  new drawSprite(sheet1, "7t", true, true, mc);


	stage.addChild(mc);

	this.in = function() {
		TheID = 7;
		Backgd.next("huang");
		mc.x = 0;
		Sevenke = addMC(new lib._9ke(), 0, 0, 355, 400);
		Sevenke.init(true, true);
		Sevenke.x = 100;
		Sevenke.y = 2000;
		mc.addChild(Sevenke);

		t7.init(false, null);
		t7.y = -20;
		t7.x = mainW / 2;
		t7.alpha=0
		//t4.scale(1,1);
		t7.setVisible();
		createjs.Tween.get(Sevenke).wait(100).to({
			y: 1000
		}, 500, createjs.Ease.backInOut);
		createjs.Tween.get(t7).wait(400).to({
			y: 400,
			alpha: 1
		}, 500, createjs.Ease.backInOut);


	}


	this.next = next;

	function next() {
		Backgd.out("huang");

		Eight.in();

		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Sevenke);
		})
		

	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("7 up");
		TheID = 7;
	
		mc.addChild(Sevenke);
		Backgd.up("huang");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
	
		Eight.upout();
	}

	function upout() {

		console.log("7 upout");
		Backgd.Lout("huang")
		createjs.Tween.get(mc).wait(0).to({
			x: mainW *2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Sevenke);
		});
	}
}


function drawEight() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);
	var t8 = new drawSprite(sheet1, "8t", true, true, mc);


	stage.addChild(mc);

	this.in = function() {
		TheID = 8;
		Backgd.next("shenlan");
		mc.x = 0;
		Eightke = addMC(new lib._6ke(), 0, 0, 355, 400);
		Eightke.init(true, true);
		Eightke.x = 300;
		Eightke.y = 700;
		Eightke.alpha = 0
		mc.addChild(Eightke);

		t8.init(false, null);
		t8.y = 400;
		t8.scale(0.4, 0.4)
		t8.x = mainW / 2;
		t8.alpha=0;

		//t4.scale(1,1);
		t8.setVisible();
		createjs.Tween.get(Eightke).wait(100).to({
			alpha: 1

		}, 500, createjs.Ease.backInOut);
		createjs.Tween.get(t8).wait(400).to({
			scaleX: 1,
			scaleY: 1,
			alpha: 1
		}, 500, createjs.Ease.backInOut);

	}


	this.next = next;

	function next() {
	
		Backgd.out("shenlan");

			Nine.in();

		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Eightke);

		})

	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("8 up");
		TheID = 8;
		mc.addChild(Eightke);
		Backgd.up("shenlan");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
	
		Nine.upout();
	}
	function upout() {
		console.log("8 upout");
	Backgd.Lout("shenlan")
		createjs.Tween.get(mc).wait(0).to({
			x: mainW *2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Eightke);
		});
	}
}

function drawNine() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);
	var t9 = new drawSprite(sheet1, "9t", true, true, mc);


	stage.addChild(mc);

	this.in = function() {
		TheID = 9;
	Backgd.next("lan");
		mc.x = 0;
		Nineke = addMC(new lib._8ke(), 0, 0, 355, 400);
		Nineke.init(true, true);
		Nineke.scale(1.2);
		Nineke.x = mainW + 330;
		Nineke.y = 600;
		mc.addChild(Nineke);

		t9.init(false, null);
		t9.y = -20;
		t9.x = mainW / 2;
		t9.alpha=0

		//t4.scale(1,1);
		t9.setVisible();
		createjs.Tween.get(Nineke).wait(100).to({
			x: 330
		}, 500, createjs.Ease.backInOut);
		createjs.Tween.get(t9).wait(400).to({
			y: 400,
			alpha: 1
		}, 500, createjs.Ease.backInOut);

	}


	this.next = next;

	function next() {
	
		Ten.in();
		Backgd.out("lan");
		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function(){
			mc.removeChild(Nineke);
		})

	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("9 up");
		TheID = 9;
		mc.addChild(Nineke);
	
		Backgd.up("lan");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
		Ten.upout();
	}

	function upout() {

		console.log("9 upout");
		Backgd.Lout("lan")
		createjs.Tween.get(mc).wait(0).to({
			x: mainW *2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Nineke);
		});
	}
}



function drawTen() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);
	var t10 =new drawSprite(sheet1, "10t", true, true, mc);


	stage.addChild(mc);

	this.in = function() {
		TheID = 10;
		Backgd.next("lv");
		mc.x = 0;
		Tenke = addMC(new lib._7ke(), 0, 0, 355, 400);
		Tenke.init(true, true);
		Tenke.x = mainW + 250;
		Tenke.y = 450;
		Tenke.scale(0.5);
		mc.addChild(Tenke);

		t10.init(false, null);
		t10.y = -20;
		t10.x = mainW / 2;
		t10.alpha=0
		//t4.scale(1,1);
		t10.setVisible();
		createjs.Tween.get(Tenke).wait(400).to({
			x: 250
		}, 500, createjs.Ease.backInOut);
		createjs.Tween.get(t10).wait(100).to({
			y: 400,
			alpha: 1
		}, 500, createjs.Ease.backInOut);
	}


	this.next = next;

	function next() {
	
		Eleven.in();
		Backgd.out("lv");
		createjs.Tween.get(mc).wait(0).to({
			x: -mainW
		}, 500, createjs.Ease.backInOut).call(function() {

			mc.removeChild(Tenke);

		})

	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("10 up");
		TheID = 10;
		mc.addChild(Tenke);
		Backgd.up("lv");
		createjs.Tween.get(mc).wait(0).to({
			x: 0
		}, 500, createjs.Ease.backInOut)
		Eleven.upout();
	}

	function upout() {
		console.log("10 upout");
		Backgd.Lout("lv")
		createjs.Tween.get(mc).wait(0).to({
			x: mainW * 2
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Tenke);
		});
	}
}


function drawEleven() {

	var id = "";

	var mc = new createjs.MovieClip(null, 0, true);

	stage.addChild(mc);

	this.in = function() {
		TheID = 11;
		Backgd.al("lan",1);
		mc.x = 0;
		Elevenke = addMC(new lib._12ke(), 0, 0, 355, 400);
		Elevenke.init(true, true);
		Elevenke.scale(1.6);
		Elevenke.x = -145;
		Elevenke.y = -350;
		Elevenke.alpha = 0;
		mc.alpha=1;

		Elevenke.loop = false;
		mc.addChild(Elevenke);

		createjs.Tween.get(Elevenke).wait(100).to({
			alpha: 1
		}, 500, createjs.Ease.backInOut);
	}

	this.next = next;

	function next() {
		Backgd.al("lan",0);
		createjs.Tween.get(mc).wait(0).to({
			alpha: 0
		}, 500, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Elevenke);
		})

	}
	this.up = up;

	this.upout = upout;

	function up() {
		console.log("11 up");
		TheID = 11;
		mc.addChild(Elevenke);
		Backgd.al("lan",1);
		createjs.Tween.get(mc).wait(0).to({
			alpha: 1
		}, 500, createjs.Ease.backInOut)
	
	}

	function upout() {

		console.log("11 upout");
		Backgd.al("lan",0);
		createjs.Tween.get(mc).wait(0).to({
			alpha:0
		}, 200, createjs.Ease.backInOut).call(function() {
			mc.removeChild(Elevenke);
		});
	}
}










/**
 * @param {Object} sheet=sheet  sheet参数；
 * @param {Object} id=1  Sprite 的name 属性，用来区分；
 * @param {Object} xj=0  默认显示的位置X；
 * @param {Object} yj=0  默认显示的位置Y；
 * @param {Object} add=mc  要将此Sprite添加到的位置？ 如 stage、mc；
 */
function drawSprite(sheet, id, xj, yj, add) {
	var s = new createjs.Sprite(sheet, id);
	s.width = s.getBounds().width;
	s.height = s.getBounds().height;
	s.name = id
	if (xj != null && xj != false) {
		s.x = mainW / 2
	}
	if (yj != null && yj != false) {
		s.y = mainH / 2
	}
	s.alpha = 0;
	/*
	 *@param x x轴位置
	 * @param y X 轴位置
	 * @param a  是否显示 透明度1 +visible=true
	 *
	 * */
	s.init = function(a, x, y) {
		if (x != true && x != null) {
			s.x = x;
		}
		if (y != true && y != null) {
			s.y = y;
		}

		if (a != null && a != false) {
			s.visible = true;
			s.alpha = 1;
		}

	};

	s.in = function() {
		s.visible = true;
		s.alpha = 1;
	}

	s.scale = function(x, y) {
		s.scaleX = x
		s.scaleY = y
	}



	s.visible = false;
	s.setVisible = function(n) {
		s.visible = true;
	}

	if (add != null) {
		//		add.timeline.addTween(createjs.Tween.get(s));

		add.addChild(s);
		//	console.log("add", id)
	}

	return s;
}

/**
 *  根据ID绘制图片。
 * @param:imgid 图片ID
 * @param:sc 是否缩放并且注册点居中
 * @param:x X轴的位置
 * @param:Y Y轴的位置
 *
 * @return 返回创建好的图像 Shape格式
 * *
 * */

function drawIMG(imgid, sc, x, y) {
	var img = loader.getResult(imgid);
	var aa = new createjs.Shape();
	aa.graphics.beginBitmapFill(img).drawRect(0, 0, img.width, img.height);
	if (sc == true) {
		//   //参数详解  x y scalex scaley rote skew 倾斜x  倾斜y 注册点x y
		if (x = null && y == null) {
			x = scale * img.width / 2;
			y = scale * img.height / 2
		}
		aa.setTransform(x, y, scale, scale, 0, 0, 0, img.width / 2, img.height / 2)
	}
	aa.width = scale * img.width;
	aa.height = scale * img.height;
	return aa;
}

// 获取窗口宽度
function getHW() {
	if (window.innerWidth) {
		s_w = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		s_w = document.body.clientWidth;
	};
	// 获取窗口高度
	if (window.innerHeight) {
		s_h = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		s_h = document.body.clientHeight;
		// 通过深入 Document 内部对 body 进行检测，获取窗口大小
	};
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		s_h = document.documentElement.clientHeight;
		s_w = document.documentElement.clientWidth;
	};
}

//判断是否 为电脑
function isPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {

			flag = false;
			break;
		}
	}
	return flag;
}

function addMC(lib, rx, ry, w, h) {
	var mm = lib;
	mm.rx = rx;
	mm.ry = ry;
	mm.width = w;
	mm.height = h;

	mm.init = function(juzhong, p) {
		if (juzhong) {
			mm.x = mm.rx + 320 - mm.width / 2;
		}

		if (p) {
			mm.play();
		} else {
			mm.stop();
		}
	}
	mm.scale = function(s) {
		mm.scaleX = s;
		mm.scaleY = s;
	}

	mm.setModdle = function(x, y) {
		if (x == null) {
			x = 0;
		}
		if (y == null) {
			y = 0;
		}

		mm.x = mm.rx + 320 - mm.width / 2 + x;
		mm.y = mm.rx + 504 - mm.height / 2 + y;

	}
	mm.setLeft = function(x) {
		if (x == null) {
			x = 0;
		}
		mm.x = -mm.rx + x;
	}
	mm.setRight = function(x) {
		if (x == null) {
			x = 0;
		}

		mm.x = mm.rx + 640 + x;
	}
	mm.setTop = function(y) {
		if (y == null) {
			y = 0;
		}
		mm.y = -mm.ry + y;
	}
	mm.setBottom = function(y) {
		if (y == null) {
			y = 0;
		}
		mm.y = mm.ry + 1008 + y;
	}
	mm.getX = function() {
		return mm.rx + 320 - mm.width / 2;
	}
	mm.getY = function() {
		return mm.rx + 504 - mm.height / 2;
	}

	return mm;

}


/*
  * 
  
 微信JSSDK配置 
  
  **/


var config;

function get_config(url) {
	url = "/huopin/SubAjax.aspx?key=GetConfig&url=" + url
	$.ajax({
		type: "GET",
		async: false,
		timeout: 10000,
		url: url,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("系统错误：" + errorThrown);
		},
		success: function(json) {
			config = json;

		}
	});
}

function jssdk() {


	/**
	 *  JSSDK
	 */

	var urls = window.location.href;
	urls = urls.replace("&", "-");
	urls = urls.replace("&", "-");
	urls = urls.replace("&", "-");
	urls = urls.replace("&", "-");
	urls = urls.replace("&", "-");
	urls = urls.replace("&", "-");
	get_config(urls);
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		'appId': config.appId, // 必填，公众号的唯一标识
		'timestamp': config.timestamp, // 必填，生成签名的时间戳
		'nonceStr': config.nonceStr, // 必填，生成签名的随机串
		'signature': config.signature, // 必填，签名，见附录1
		jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function() {
		var titles = "Vita Coco 带你一起来揭秘椰子水的小秘密";
		var links = "http://cswx.dreaminheart.com/keke2/";
		var imgUrls = "http://cswx.dreaminheart.com/keke2/img/ico.jpg?v=1";
		var doc = "Vita Coco 带你一起来揭秘椰子水的小秘密";
		wx.onMenuShareTimeline({
			title: titles,
			link: links,
			desc: doc,
			imgUrl: imgUrls,
			success: function() {
				//	/ alert('分享成功');

				// alert(links);
			},
			cancel: function() {
				// alert('取消分享');
			}
		});
		wx.onMenuShareAppMessage({
			title: titles,
			link: links,
			desc: doc,
			imgUrl: imgUrls,
			success: function() {
				//   alert('分享成功');
			},
			cancel: function() {
				//   alert('取消分享');
			}
		});
		wx.onMenuShareQQ({
			title: titles,
			link: links,
			desc: doc,
			imgUrl: imgUrls,
			success: function() {
				// alert('分享成功');
			},
			cancel: function() {
				//  alert('取消分享');
			}
		});
	});


}