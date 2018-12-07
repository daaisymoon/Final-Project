const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rand = function(num) {
    return Math.floor(Math.random() * num) ;
}
canvas.width = 1250;
canvas.height = 590;

let background0 = new Image();
background0.src = 'https://i.pinimg.com/originals/0b/b3/1e/0bb31eed0068f260aa069cad7a3c365a.jpg';

let background1 = new Image();
background1.src = 'https://lumiere-a.akamaihd.net/v1/images/open-uri20160913-10271-88h4bl_0141d3a6.jpeg?region=0%2C0%2C1024%2C576';

let background2 = new Image();
background2.src = 'https://lumiere-a.akamaihd.net/v1/images/open-uri20160913-10271-897rj3_c2b73fc4.jpeg?region=0%2C0%2C1024%2C576';

let background3 = new Image();
background3.src = 'https://lumiere-a.akamaihd.net/v1/images/open-uri20160913-10271-1lxg9py_22dfb421.jpeg?region=0%2C0%2C1024%2C576';

let background4 = new Image();
background4.src = 'https://cdn.pixabay.com/photo/2015/12/23/20/20/wallpaper-1106135_960_720.jpg'

const myHero = new Image();
myHero.src = 'https://mbtskoudsalg.com/images/olaf-clipart-png-1.png?fbclid=IwAR1o6VrIwXq-dGTgaauv6mIMcOl5DLU2UE_ntGLN-8Do8_EBkgmkSBLLSP8';

const myStar = new Image();
myStar.src = 'https://findicons.com/files/icons/223/christmas/128/snowball.png';

const cuteEvil = new Image();
cuteEvil.src = 'https://cdn131.picsart.com/258749431019212.png?r1024x1024';

let bullets = [];
let arr = []; 
let backGroundImg = background0;

const intersect = (one, two) => {
    const x = Math.max(one.x, two.x),
    num1 = Math.min(one.x + one.width, two.x + two.width),
    y = Math.max(one.y, two.y),
    num2 = Math.min(one.y + one.height, two.y + two.height);
    return (num1 >= x && num2 >= y);
};

let theVillains = function (count,canvasWidth,canvasHeight, speed) {
    for (let i = 0; i < count; i++){

        const evilObj= {
            width:100,
            height:100,
            x:rand(canvasWidth - 600)+500,
            y:rand(canvasHeight - 290)+180,
            xDelta:speed,
            yDelta:speed,
            id: i,
            image:cuteEvil,
            deleteme: false,        
            draw1: function () {
                ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
            },
            update1: function () {
               for(let i = 0; i < bullets.length; i++) {
                    if(intersect(bullets[i], this)) {
                        this.deleteme = true; 
                    }      
                }
                if(this.deleteme){
                    countObj = countObj.filter(function(a) {
                        return a !== this;
                    }, this);
                }
                         
                this.x += this.xDelta;
                this.y += this.yDelta;
                if (this.x + this.width>= canvasWidth || this.x <=0){this.xDelta = -1*(this.xDelta)}
                if (this.y <= 0 || this.y + this.height >= canvasHeight) {this.yDelta = -1*(this.yDelta)}
            }
        };
            arr[i]= evilObj;
    }
    return arr;
};      
let countObj = theVillains(5,canvas.width,canvas.height,4);

const draw1 = function () {            
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(backGroundImg,0,0,canvas.width,canvas.height);
          for (let i = 0; i < countObj.length; i++) {
          countObj[i].draw1();
          }
}

const snowy = {
    x:0,
    y:475,
    width:115,
    height:115,
    xDelta:0,
    yDelta:0,
    image:myHero,
    draw: function () {
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    },
    update: function () {
        this.x += this.xDelta;
        this.y += this.yDelta;
    },
};

const checker = function () {
    for (let i = 0; i < countObj.length; i++){
        if(countObj[i].x + countObj[i].width >= snowy.x && countObj[i].x <= snowy.x + snowy.width && countObj[i].y + countObj[i].height >= snowy.y && countObj[i].y <= snowy.y + snowy.height ){
          alert("Game over !!!")
        }
    }
}


const createStar = function(x, y, xDelta, yDelta) { 
    return {
      x: x,
      y: y,
      width : 30,
      height: 30,
      xDelta: xDelta,
      yDelta: yDelta,
      image : myStar,
      draw  : function() {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      },
      update: function () {
        this.x += this.xDelta;
        this.y += this.yDelta;
        
        if(this.x + this.width >= canvas.width) {
          bullets = bullets.filter(function(b) {
            return b !== this;
          }, this);
        }
      }
    };
};       

  let level = 0;
        let levelData = [
          {background:background0,
           count:5,
           speed:4,
            },   
        
          {background:background1,
           count:10,
           speed:6,

           },

          {background:background2,
           count:15,
           speed: 8,

           },
          {background:background3,
            count:20,
            speed:9,
           },

          {background:background4,
                count:25,
                speed:10,
           },

        ]  
       
const update1 = function () {
    for (let i=0; i < countObj.length; i++){
        countObj[i].update1();
    }
        if(countObj.length === 0){
            debugger
            level++
            if(level === 5){
       alert("YOU WIN")
     }      

            backGroundImg = levelData[level].background;
             
             countObj = theVillains(levelData[level].count,canvas.width,canvas.height,levelData[level].speed);
        }
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const spaceKey = 32;

document.addEventListener('keydown', function(event) {
    if(event.keyCode === rightKey) {
        snowy.xDelta = 6;
    } 
    if (event.keyCode === leftKey) {
        snowy.xDelta = -6;
    }
    
    if(event.keyCode === upKey) {
        snowy.yDelta = -6;
    } 
    if (event.keyCode === downKey) {
        snowy.yDelta = 6;
    };
}, false);

document.addEventListener('keyup', function(event) {
    snowy.yDelta = 0;
    snowy.xDelta = 0;
}, false);


document.addEventListener('keydown', function(event) {
    if(event.keyCode === spaceKey) {
      bullets.push(createStar(snowy.x + snowy.width, snowy.y + snowy.height/2, 6, 0)); 
    }
}, false);

        const loop = function () {
           
            checker(); 
            
            draw1();
            update1();
            snowy.draw();
            snowy.update();
            for(let i = 0; i < bullets.length; i++) {
              bullets[i].draw();
              bullets[i].update();
            }
            requestAnimationFrame(loop);             
        };         
loop(); 