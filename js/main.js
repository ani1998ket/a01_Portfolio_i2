const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particles = [];

class Particle{
    constructor(x = 0, y = 0, radius = 5, color = "blue"){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.lifespan = 0;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
    }
    spawn(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.color = "pink";
        this.vy = 1;
        this.vx = Math.random() * 2 - 1 || 1;
        this.lifespan = Math.random() * 200 + 100 ;
    }
}
for(let i = 0 ; i < 60; i++){
    
    let p = new Particle();
    p.spawn();
    particles.push( p );
}

function randomColor(){
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    return 'rgba( '+ r +','+ g +','+ b + ",0.2" +')';
}
console.log(randomColor());
console.log(particles);

function draw(){
     ctx.fillStyle = "rgba(255, 253, 208 ,0.7)";
    //ctx.fillStyle = 'white';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    particles.forEach(element => {
        element.draw(ctx);
    });
}
function update(){
    particles.forEach(element => {
        element.update();
        //element.lifespan--;
        if(element.y > canvas.height){
            element.y = 0;
            element.spawn();
        }
    });
}
function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
window.onresize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function loadDoc(filename) {
    alert();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("home").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET","/pages/" + filename , true);
    xhttp.send();
  }