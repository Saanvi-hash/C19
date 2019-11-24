var PLAY = 1
var END = 2
var gameState = PLAY

var CloudsGroup
var ObstaclesGroup

var trex,trex_running,trex_collided;
var ground, ground_img;
var ground2;
var cloud_img;
var obstacle_1,obstacle_2,obstacle_3,obstacle_4,obstacle_5,obstacle_6
var restart,restart_img;
var gameover, gameover_img;

function preload() {
trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png"); 
ground_img = loadImage ("ground2.png");
cloud_img = loadImage ("cloud.png");
obstacle_1 = loadImage ("obstacle1.png");
obstacle_2 = loadImage ("obstacle2.png");
obstacle_3 = loadImage ("obstacle3.png");
obstacle_4 = loadImage ("obstacle4.png");
obstacle_5 = loadImage ("obstacle5.png");
obstacle_6 = loadImage ("obstacle6.png");
trex_collided = loadAnimation ("trex_collided.png");
restart_img = loadImage ("restart.png");
gameover_img = loadImage ("gameOver.png");
}

function setup() {
  createCanvas(800,200);
  trex = createSprite (50,150,40,50);
  trex.addAnimation ("running",trex_running);
  trex.addAnimation ("collide",trex_collided);
  trex.scale=0.5;
  ground = createSprite (200,180,800,20);
  ground.addImage ("img",ground_img);
  ground2 = createSprite (200,190,800,10);
  ground2.visible = false;
  CloudsGroup = new Group ();
  ObstaclesGroup = new Group ();
  restart = createSprite (400,50,10,10);
  restart.addImage ("img", restart_img);
  restart.scale = 0.5;
  restart.visible= false;
  gameover = createSprite (400,100,10,10);
  gameover.addImage ("img", gameover_img);
  gameover.scale = 0.5;
  gameover.visible = false;
}

function draw() {
  background("white");
  
  if (gameState === PLAY) {
    
    ground.velocityX =-8;
  if(ground.x <0 ) {
  ground.x = ground.width/2;
  }
  
  if(keyDown ("space")&&trex.y>138){
  trex.velocityY = -12;
  }
  trex.velocityY = trex.velocityY + 1;
  
  SpawnObstacles();
  SpawnClouds();
    
  if (trex.isTouching (ObstaclesGroup) ){
      gameState = END
      
      
  }
    
  }
  
  else if (gameState === END ) {
    ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach (0);
    CloudsGroup.setVelocityXEach (0);
    trex.velocityY = 0;
    trex.changeAnimation ("collide",trex_collided);
    restart.visible = true;
    gameover.visible = true;
    ObstaclesGroup.setLifetimeEach (-1);
    CloudsGroup.setLifetimeEach (-1);
     }
  
  if(mousePressedOver(restart)) {
   gameState = PLAY; 
   gameover.visible = false;
    restart.visible = false;
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    trex.changeAnimation ("running", trex_running);
  }
  
  console.log(trex.y);
  
  
  
  trex.collide(ground2);

  
  drawSprites();
}

function SpawnClouds() {
if (frameCount %100 ===0){
var cloud = createSprite (800,100,10,10);
  CloudsGroup.add(cloud);
  cloud.addImage ("img",cloud_img);
  cloud.velocityX = -8;
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
}
}

function SpawnObstacles() {
  if (frameCount %150 === 0){
  var obstacle = createSprite (800,170,10,10);
  obstacle.velocityX = -8;
  ObstaclesGroup.add(obstacle);
  var rand = Math.round (random(1,6));
 switch (rand) {
    case 1 : obstacle.addImage(obstacle_1);
     break;
     case 2 : obstacle.addImage (obstacle_2);
     break;
     case 3 : obstacle.addImage (obstacle_3);
     break;
     case 4 : obstacle.addImage (obstacle_4);
     break;
     case 5 : obstacle.addImage (obstacle_5);
     break;
     case 6 : obstacle.addImage (obstacle_6);
     break;
    default : break;
 
 }
  obstacle.scale = 0.5;
    obstacle.lifetime = 350;
}  
}