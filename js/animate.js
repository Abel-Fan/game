window.onload = function(){
    var canvas = document.querySelector("canvas");
    var cobj = canvas.getContext("2d");

    //粒子
    function lizi(){
        this.r = 10+1*Math.random();
        this.color = "rgb("+parseInt(255*Math.random())+","+parseInt(255*Math.random())+","+parseInt(255*Math.random())+")";
        this.x = 6*Math.random()-3;
        this.y = 50*Math.random();
        this.speedX = 6*Math.random()-3;
        this.speedY= 6*Math.random()-3;
        this.zhongli = 0.5;
    }
    lizi.prototype={
        draw:function(){
            cobj.save();
            cobj.beginPath();
            cobj.translate(this.x,this.y);
            cobj.arc(200,200,this.r,0,Math.PI*2);
            cobj.fillStyle=this.color;
            cobj.fill();
            cobj.restore();
            this.updata();
        },
        updata:function(){
            this.x-=this.speedX;
            this.speedY+=this.zhongli;
            this.y+=this.speedY;
            this.r-=0.1;
        }
    };
    var arr = [];
    //粒子运动
    function move(){
        cobj.clearRect(0,0,canvas.width,canvas.height);
        arr.push(new lizi());
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            if(arr[i].r<0){
                arr[i] = new lizi();
            }
            if(arr.length>100){
                arr.shift();
            }
        }
    }

    canvas.onmouseover = function(){

    }

    var t = setInterval(move3,50);

    //火焰

    function fire(){
        this.top = 100;
        this.top = 100;
        this.r = 5;
        this.x = 6*Math.random();
        this.y = 6*Math.random();
        this.life = 3;
        this.speedX = 6*Math.random()-3;
        this.speedY = -5;
    }
    fire.prototype={
        draw:function(){
            cobj.save();
            cobj.beginPath();
            cobj.translate(this.x,this.y);
            cobj.arc(100,100,this.r,0,Math.PI*2);
            cobj.globalCompositeOperation="lighter";
            cobj.fillStyle="rgb(226,17,12)";
            cobj.fill();
            cobj.restore();
            this.update();
        },
        update:function(){
            this.r-=0.7;
            this.x+=Math.random()*10-5;
            this.y+=this.speedY;
        }
    };

    var arr2 =[];
    function move3(){
        cobj.clearRect(0,0,canvas.width,canvas.height);
        arr.push(new fire());
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            if(arr[i].r<0){
                arr[i]=new fire();
            }
            if(arr.length>200){
                arr.shift();
            }
        }
    }



    window.onblur = function(){
        clearInterval(t);
    };
    window.onfocus = function(){
        t = setInterval(move3,100);
    }

};