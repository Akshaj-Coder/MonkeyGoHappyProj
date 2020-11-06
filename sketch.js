var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var SurvivalTime = 0;
var Score = 0;
var obstacle, obstacleimg;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");

  obstacleimg = loadImage("obstacle.png");
  
  

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width/2;

  obstacle = createSprite(401, 351, 900, 10);
  
 
  
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background(209);

  monkey.collide(ground);

 


  if (gameState === PLAY) {


    SpawnObstacles();
    SpawnFood();

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    
  stroke("black")
  textSize(20);
  fill("black");
  SurvivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + SurvivalTime, 100, 50)

  }

 else if (gameState === END) {
   
    monkey.velocityY = 0;
    monkey.velocityX = 0;
   
    ground.velocityX = 0;
    ground.velocityY = 0;
   
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
   
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   
   //score.visible = true;
   
   end();
  }

  if (obstacleGroup.isTouching(monkey)) {
    gameState = END;
  }



  monkey.collide(obstacle);




  drawSprites();
  //console.log(ground.y);
}

function SpawnObstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(401, 320, 20, 20);
    obstacle.addImage("obstacleimg", obstacleimg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;


    obstacleGroup.add(obstacle);

  }

  //console.log(frameCount);
}



function SpawnFood() {
  if (frameCount % 120 === 0) {

    var food = createSprite(400, 600, 20, 20);
    food.y = Math.round(random(120, 200));
    food.addImage("foodimg", bananaImage);
    food.scale = 0.1;
    
    food.velocityX = -3;

    food.lifeitme = 200;
    
    FoodGroup.add(food);

  }

}

function end() {
  SurvivalTime = 0;
}