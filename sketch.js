var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400)
  
  //creating monkey and ground sprites
  monkey = createSprite(80, 360, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
   
  ground = createSprite(200, 380, 400, 10);
  //ground.velocityX = -4;
  
  score = 0;
  
  console.log(ground.x);
  
   FoodGroup = new Group();
   obstaclesGroup = new Group();
}


function draw() {
  background("seagreen");
   fill(0);
   textSize(16);
   text("Survival Time: "+score, 140, 50);
  
   if(gameState === PLAY){
    if(keyDown("space")&& monkey.y>=70){
    monkey.velocityY = -10
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    ground.velocityX = -4;
      
    score = score + Math.round(getFrameRate()/60);
      
    if(ground.x>0){
    ground.x = ground.width/2;
    }
    
    //monkey.collide(ground);
      
    spawnBananas();
    spawnObstacles();
      
    if(monkey.isTouching(FoodGroup)){
      
      score=score+1;
      FoodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstaclesGroup)){
      
      gameState=END;
     /* 
      ground.velocityX = 0;
    monkey.velocityX = 0;
    
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);*/
    }
      
      
  
 
  if(gameState === END){
    ground.velocityX = 0;
    //monkey.velocityX = 0;
    
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
  }
}
  monkey.collide(ground);
  drawSprites();
  
}
  
function spawnBananas(){
  if(frameCount % 90 === 0){
    banana = createSprite(200, Math.round(random(120, 200)),10, 10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -2;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(200, 357, 10, 10);
    obstacle.velocityX=-2;
    obstacle.scale=0.1
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}




