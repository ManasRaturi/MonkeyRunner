var PLAY=1,END=0,gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup,monkeyGroup
var score=0,ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("Moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  console.log(ground.x);
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  monkeyGroup=createGroup();
}


function draw() {
  background("white");
  if (gameState==PLAY){
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  monkeyGroup.add(monkey);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (keyDown("space")&&monkey.y>30){
    monkey.velocityY=-10
  }
  textSize(35);
  text(score,300,50);
  text("Survival Time:",80,50);
  spawnBananas();
  spawnObstacles();
  time();
  }
  if (gameState==END){
   textSize(60);
   text("Game Over",50,200)
   monkeyGroup.destroyEach();
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   ground.y=700;
  }
  drawSprites();
}
function spawnBananas(){
  if (frameCount%Math.round(random(30,50))===0){
   banana=createSprite(500,200,10,10);
   banana.addImage("banana",bananaImage);
   banana.velocityX=-4;
   banana.y=Math.round(random(50,290));
   banana.scale=0.1;
   banana.lifetime=300;
   bananaGroup.add(banana);
   banana.depth=monkey.depth;
   monkey.depth=monkey.depth+1;
   if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2
   }
  }
}
function spawnObstacles(){
  if (frameCount%Math.round(random(50,70))===0){
   obstacle=createSprite(500,330,10,10);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.velocityX=-6;
   obstacle.scale=0.1;
   obstacle.lifetime=300;
   obstacleGroup.add(obstacle);
   obstacle.depth=monkey.depth;
   monkey.depth=monkey.depth+1;
   if (obstacleGroup.isTouching(monkey)){
   gameState=END
   }
  }
}
function time(){
  if (frameCount%30===0){
    score=score+1
  }
}