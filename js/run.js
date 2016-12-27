window.onload = function(){
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var canvas = document.getElementsByTagName("canvas")[0];
    var cobj = canvas.getContext("2d");
    var runs = document.getElementsByClassName("runs");
    var jumps = document.getElementsByClassName("jump");
    var startdiv = document.querySelector(".start>div");
    var start = document.querySelector(".start");
    var zz = document.querySelector(".zz");
    var falg = false;
    var zzw = document.querySelectorAll(".zzw");
    var jinb = document.querySelectorAll(".jinb");
    var defen = document.querySelector(".defen");
    var audio = document.querySelectorAll("audio");
    var zt = document.querySelectorAll(".zt");
    var name = document.querySelector(".name");
    var life = document.querySelector(".life");
    var gold = document.querySelector(".gold");

    //初始化canvas大小
    canvas.width = clientW;
    canvas.height = clientH;
    //初始化遮罩的大小
    zz.style.widht=clientW+"px";
    zz.style.height=clientH+"px";

    //点击开始
    startdiv.onclick = function(){
        var namevalue = name.value?name.value:"游客";
        startdiv.onclick = null;
        //游戏开始
        var t =setTimeout(function(){
            var game = new games(canvas,cobj,runs,jumps,zz,zzw,defen,audio,zt,jinb,namevalue,life,gold);
            game.play();
        },10)
    };



};