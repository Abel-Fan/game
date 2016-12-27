
//人物类
function person(canvas,cobj,runs,jumps){
    this.canvas = canvas;
    this.cobj = cobj;
    this.runs = runs;
    this.jumps = jumps;

    this.status = "runs";
    this.stat = 0;

    this.x = 0;
    this.y = 420;

    this.width = 40;
    this.height = 68;
}
person.prototype={
    draw:function(){
        this.cobj.save();this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.stat],0,0,this.width,this.height,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
//障碍物类
function obstacle(canvas,cobj,zzw){
    this.canvas = canvas;
    this.cobj = cobj;
    this.zzw = zzw;

    this.stat = Math.floor(this.zzw.length*Math.random());

    this.x = this.canvas.width;
    this.y = 0;

    this.width = 200;
    this.height = 66.666;

    this.xsheep = 10;

}
obstacle.prototype={
    draw:function(){
        this.cobj.save();this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zzw[this.stat],0,0,300,100,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
//金币
function gold(canvas,cobj,jinb){
    this.canvas = canvas;
    this.cobj = cobj;
    this.jinb = jinb;

    this.stat = Math.floor(this.jinb.length*Math.random());

    this.x = this.canvas.width;
    this.y = 300;

    this.width = 64;
    this.height = 64;

    this.xsheep = 10;

}
gold.prototype={
    draw:function(){
        this.cobj.save();this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.jinb[this.stat],0,0,128,128,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
//血
function xue(canvas,cobj,y,x){
    this.canvas = canvas;
    this.cobj = cobj;
    this.r = 2+2*Math.random();
    this.color = "red";
    this.x = 3*Math.random()-3;
    this.y = 3*Math.random()-3;
    this.speedX = 3*Math.random()-1.5;
    this.speedY= 3*Math.random()-1.5;
    this.zhongli = 0.5;
    this.yy =y+50;
}
xue.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(this.x,this.y);
        this.cobj.arc(490,this.yy,this.r,0,Math.PI*2);
        this.cobj.fillStyle=this.color;
        this.cobj.fill();
        this.cobj.restore();
        this.updata();
    },
    updata:function(){
        this.x+=this.speedX;
        this.speedY+=this.zhongli;
        this.y+=this.speedY;
        this.r-=0.1;
    }
};

function chuxue(canvas,cobj,y,x){
    this.canvas = canvas;
    this.cobj = cobj;
    this.y = y;
    var arr = [];
    for(var i=0;i<30;i++){
        arr.push(new xue(this.canvas,this.cobj,this.y));
    }
    var t = setInterval(function(){
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            if(arr[i].r<0){
                arr.splice(i,1);   //删除
            }
        }
        if(arr.length==0){
            clearInterval(t);
        }
    });
}
//游戏类
function games(canvas,cobj,runs,jumps,zz,zzw,defen,audio,zt,jinb,namevalue,life,gold){
    this.canvas = canvas;
    this.cobj = cobj;
    this.runs = runs;
    this.jumps = jumps;
    this.audio = audio;
    this.zt = zt;
    this.zz = zz;
    this.zzw = zzw;

    this.defen = defen;
    this.life = life;
    this.gold = gold;

    this.zzwArray =[];
    this.person = new person(canvas,cobj,runs,jumps);
    this.name=namevalue;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.xsheep = 10;
    this.ysheep = 10;
    this.zhongli = 8;

    this.left = 0;
    this.leftsheep = 10;       //移动速度
    this.jinbsheep = 3;        //金币出现频率
    this.zzwsheep = 5;        //障碍物出现频率

    this.angle = 0;
    this.anglesheep = 10;

    this.gaodu =200;    //
    this.num = 0;
    this.rang=50;
    this.fenshu =0;
    this.lifes=1;

    this.jinb = jinb;
    this.rang2=50;
    this.jinbArray =[];

    this.jinbNum =0;  //金币数量

}
games.prototype={
    play:function(){
        this.zt[4].style.background="url(./img/star2.png) no-repeat";
        this.zt[3].style.animation="two 2s ease forwards";
        this.zt[1].style.animation="zztwo 2s ease";

        this.zt[2].style.display="block";
        this.run();
        this.keydown();
        this.click();

        this.defen.style.display="block";
        this.life.style.display="block";
        this.gold.style.display="block";
    },
    keydown:function(){
        var that = this;
        var falg = false;
        document.onkeydown = function(e){
            if(e.keyCode==32){
                if(falg){
                    return false;
                }
                falg = true;
                that.audio[0].play();
                that.person.status = "jumps";
                that.person.stat = 0;
                //console.dir(that.audio[0]);
                var t2 = setInterval(function(){

                    that.angle+=that.anglesheep;
                    if(that.angle>=180){
                        that.angle = 0;
                        that.person.y = 420;
                        falg = false;
                        clearInterval(t2);
                        that.person.status = "runs";
                    }
                    that.person.y = 420-that.gaodu*(Math.sin(that.angle*Math.PI/180));
                },50)
            }
        }
    },
    click:function(){

        var that = this;

            this.zt[2].onclick=function(){
                that.audio[2].pause();
                if(!that.zt[2].falg){

                    clearInterval(that.t1);
                    that.zt[2].falg=true;
                    that.zt[2].firstChild.className="iconfont  kaishi";
                    //console.dir(that.zt[2])
                }else{
                    that.run();
                    that.zt[2].falg=false;
                    that.zt[2].firstChild.className="iconfont  zanting";
                }
            };
        this.zt[6].onclick = function(){
            that.zzwArray=[];
            that.jinbArray=[];
            that.run();
            that.zt[5].style.display="block";
            that.zt[6].style.background="url(./img/star2.png) no-repeat";
            that.zt[5].style.animation="two 2s ease forwards";
            that.zt[1].style.animation="zztwo 2s ease forwards";
            that.lifes = 1;
        }

    },
    run:function(){
        var that = this;
        var obj;
        var obj2;
        this.jinb.innerHTML = 0;
        this.life.innerHTML = 1;
        this.defen.innerHTML = 0;
        this.jinbNum = 0;
        this.lifes = 1;
        this.fenshu = 0;
        this.audio[2].play();
        this.person.x=0;
        this.t1 = setInterval(function(){
            if(that.person.x<that.width/3){
                that.person.x+=that.xsheep;
            }
            if(that.person.status=="runs"){
                that.person.stat+=1;
                if(that.person.stat>=that.person.runs.length){
                    that.person.stat=0;
                }
            }else if(that.person.status=="dumps"){
                that.person.stat = 0;
            }

            that.left+=that.leftsheep;

            /*控制  场景*/
            that.canvas.style.backgroundPositionX = -that.left+"px";
            /*控制  人物*/

            that.cobj.clearRect(0,0,that.width,that.height);

            /*控制  障碍物*/
            that.num+=50;
            if(that.num%that.rang==0){
                that.rang = ((Math.floor(Math.random()*that.zzwsheep)+1)*1000);
                obj = new obstacle(that.canvas,that.cobj,that.zzw);
                that.zzwArray.push(obj);
            }
            for(var i=0;i<that.zzwArray.length;i++){
                that.zzwArray[i].x -=that.leftsheep;
                that.zzwArray[i].y = 425;    //障碍物宽度
                that.zzwArray[i].draw();

                /*碰撞*/
                if(hitPix(that.canvas,that.cobj,that.zzwArray[i],that.person)){
                    if(!that.zzwArray[i].falg){
                        that.lifes--;    //生命值
                        that.life.innerHTML=that.lifes;
                        //生命值
                        if(that.lifes<=0){
                            that.zt[5].style.display="block";
                            that.zt[6].style.background="url(./img/star.png) no-repeat";
                            that.zt[5].style.animation="one 2s ease forwards";
                            that.zt[1].style.animation="zzone 2s ease forwards";

                            var zongfen = that.fenshu+that.jinbNum*0.2;  /*计算总分*/

                            clearInterval(that.t1);
                            /*纪录数据*/
                            /* {"name":"游客","zongfen":0},{"name":"游客","zongfen":1.4},{"name":"游客","zongfen":1.2} */
                            var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                            var temp={name:that.name,score:zongfen};
                            // 排序
                            messages.sort(function (a,b) {
                                return a.score<b.score;
                            });
                            if(messages.length>0){
                                if(temp.score>messages[messages.length-1].score){
                                    if(messages.length==5){
                                        messages[messages.length-1]=temp;
                                    }else if(messages.length<5){
                                        messages.push(temp);
                                    }
                                }
                            }else{
                                messages.push(temp);
                            }

                            localStorage.messages=JSON.stringify(messages);
                            $(that.zt[5]).find(".new").text(that.name+"/"+zongfen);
                            $(that.zt[7]).find(".one").text(messages[0].name+"/"+messages[0].score);
                            $(that.zt[7]).find(".two").text(messages[1].name+"/"+messages[1].score);
                            $(that.zt[7]).find(".three").text(messages[2].name+"/"+messages[2].score);

                        }
                        var xue = new chuxue(that.canvas,that.cobj,that.person.y);
                        that.audio[1].play();
                        that.zt[0].style.animation="ku 2s ease";
                        setTimeout(function(){
                            that.zt[0].style.animation="";
                        },2000)
                    }
                    that.zzwArray[i].falg = true;

                }
                /*跳过 成功*/
                if(that.person.x>that.zzwArray[i].width+that.zzwArray[i].x){
                    if(!that.zzwArray[i].falg&&!that.zzwArray[i].falg2){
                        that.fenshu++;   //分数
                        that.defen.innerHTML=that.fenshu;
                        that.zzwArray[i].falg2=true;
                    }
                }
            }

            /*控制金币*/
            if(that.num%that.rang2==0){
                that.rang2 = ((Math.floor(Math.random()*that.jinbsheep)+1)*1000);
                obj2 = new gold(that.canvas,that.cobj,that.jinb);
                that.jinbArray.push(obj2);
            }
            for(var j=0;j<that.jinbArray.length;j++){
                that.jinbArray[j].x -= that.leftsheep;
                that.jinbArray[j].y = 300;    //障碍物宽度
                that.jinbArray[j].draw();
                /*碰撞*/
                if(hitPix(that.canvas,that.cobj,that.jinbArray[j],that.person)){
                    that.jinbNum++;
                    that.gold.innerHTML = that.jinbNum;
                    that.jinbArray.splice(j,1);
                    that.jinbArray[j].draw();
                }
            }
            that.person.draw();
        },50);
    }
};