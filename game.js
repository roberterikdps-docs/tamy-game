const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

// PLAYER
const player = {

x:50,
y:500,
width:32,
height:48,
velocityY:0,
jumping:false,
hp:100,
damage:50

};

// INIMIGO
const enemy = {

x:300,
y:500,
width:32,
height:48,
hp:100

};

// BOSS
const boss = {

x:300,
y:200,
width:96,
height:96,
hp:400,
active:false

};

let gravity = 0.6;
let attacking = false;
let gameEnded = false;

// CONTROLES
document.getElementById("left").ontouchstart=()=>player.x-=20;
document.getElementById("right").ontouchstart=()=>player.x+=20;

document.getElementById("jump").ontouchstart=()=>{
if(!player.jumping){
player.velocityY=-12;
player.jumping=true;
}
};

document.getElementById("attack").ontouchstart=()=>{
attacking=true;
setTimeout(()=>attacking=false,200);
};

// LOOP DO JOGO
function update(){

player.velocityY+=gravity;
player.y+=player.velocityY;

if(player.y>500){
player.y=500;
player.jumping=false;
}

// colisão inimigo

if(collide(player,enemy) && attacking){

enemy.hp-=player.damage;

if(enemy.hp<=0){

enemy.x=-999;

}
}

// chegar no boss

if(player.x>700){

boss.active=true;

}

// ataque boss
if(boss.active && attacking && collide(player,boss)){

boss.hp-=player.damage;

if(boss.hp<=0){

endGame();

}

}

}

// colisão
function collide(a,b){

return a.x < b.x + b.width &&
a.x + a.width > b.x &&
a.y < b.y + b.height &&
a.y + a.height > b.y;

}

// desenhar
function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// fundo estrelado
ctx.fillStyle="white";

for(let i=0;i<50;i++){

ctx.fillRect(Math.random()*400,Math.random()*700,2,2);

}

// player
ctx.fillStyle="orange";
ctx.fillRect(player.x,player.y,player.width,player.height);

// pá
if(attacking){

ctx.fillStyle="gray";
ctx.fillRect(player.x+30,player.y+10,20,5);

}

// inimigo
if(enemy.hp>0){

ctx.fillStyle="white";
ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);

}

// boss
if(boss.active){

ctx.fillStyle="red";
ctx.fillRect(boss.x,boss.y,boss.width,boss.height);

// barra de vida
ctx.fillStyle="white";
ctx.fillText("rasmisin: "+boss.hp,200,50);

}

}

// FINAL
function endGame(){

gameEnded=true;

ctx.fillStyle="white";

ctx.fillText("Parabéns pelo seu aniversário Tamy 💜",50,200);

}

// loop
function loop(){

update();
draw();

if(!gameEnded){

requestAnimationFrame(loop);

}

}

loop();