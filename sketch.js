//call objects
var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var ground;
var survivalTime = 0;

var bananasGroup;
var obstaclesGroup;


function preload(){
  
  //add Animation of monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //loadImage of banana and obstacle
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);

  monkey = createSprite(50,270,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,350,600,15);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(300,350,800,10);
  invisibleGround.visible = false;
  
 
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
  
  survivalTime = 0;
  score = 0;

 }


function draw() {
  //change the background
  background(" skyblue");
  
  textSize(20);
  fill("black");
  text("Score : "+ score,480,25);
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time : " + survivalTime,20,25);
  
  
  if(gameState === PLAY){
     if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -10;
  }
    
    monkey.velocityY = monkey.velocityY + 0.6
    
    if(bananasGroup.isTouching(monkey)){
     bananasGroup.destroyEach();
     score = score+2;
  }
    
    if(obstaclesGroup.isTouching(monkey)){
      obstaclesGroup.destroyEach();
      gameState = END;
    }
    
    if(ground.x < 300){
      ground.x = ground.width/2;
    }
    
    obstacles();
    bananas();

 } else  if(gameState === END){
    
      obstaclesGroup.setVelocityXEach(0);
      bananasGroup.setVelocityXEach(0);
   
      ground.velocityX = 0;
      monkey.velocityY = 0;
      survivalTime = false;
   
      bananasGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
   
  }
 
   monkey.collide(invisibleGround);
  
  drawSprites();
}

function bananas(){
  if(frameCount % 80 === 0){
  var banana= createSprite(550,160,20,20);
  banana.y = Math.round(random(120,200))    
  banana.addImage(bananaImage);
  banana.scale = 0.1
  banana.velocityX = -(2+score/5 );
    
  banana.lifetime = 280;  
    
  monkey.depth = banana.depth+1;  
    
  bananasGroup.add(banana);  
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
  var obstacle = createSprite(550,325,20,20);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -(2+score/5);
  obstacle.lifetime = 280;  
    
    
    obstaclesGroup.add(obstacle);
    
  }
}