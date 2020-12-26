var trex, trexRunning, trexCollided
var ground, groundImage
var inGround
var cloudIm
var obs1, obs2, obs3, obs5, obs5, obs6
var obstaclesGroup, cloudsGroup
var gameState, PLAY, END
var dead
var check
var jump
var score


function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudIm = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
  dead = loadSound("die.mp3")
  check = loadSound("checkPoint.mp3")
  jump = loadSound("jump.mp3")

}

function setup() {
  createCanvas(600, 200);


  trex = createSprite(75, 160, 10, 15)
  trex.addAnimation("steveRun", trexRunning)
  trex.addAnimation("stevestill", trexCollided)
  trex.scale = 0.45
  ground = createSprite(300, 180, 600, 5)
  ground.addImage("ground", groundImage)
  inGround = createSprite(300, 185, 600, 5)
  inGround.visible = false
  obstaclesGroup = createGroup()
  cloudsGroup = createGroup()
  PLAY = 1
  END = 0
  gameState = PLAY
  trex.debug = true

trex.setCollider("circle", -1,-1, 22)
  
  score = 0

}

function draw() {
  background(255);
  text("Score: "+ score, 500, 50)
  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate()/60)
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -10
jump.play()
    }
    trex.velocityY += 0.8

    
    ground.velocityX = -10
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    spawnClouds();
    spawnObs();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END
    dead.play()
  }
    
    //console.log(trex.y) 
  }
else if(gameState === END){
  trex.velocityY = 0
  ground.velocityX = 0
  cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setVelocityXEach(0)
  
  
  cloudsGroup.setLifetimeEach(-1)
obstaclesGroup.setLifetimeEach(-1)
  trex.changeAnimation("stevestill")
}
  drawSprites();

  trex.collide(inGround)

}

function spawnClouds() {

  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);

    cloud.y = random(80, 120);
    cloud.addImage(cloudIm);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;



    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObs() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 160, 15, 20)

    obstacle.velocityX = -10;
    var x = Math.round(random(1, 6))
    console.log(x)

    obstacle.scale = 0.5

    switch (x) {
      case 1:
        obstacle.addImage(obs1)
        break;
      case 2:
        obstacle.addImage(obs2)
        break;
      case 3:
        obstacle.addImage(obs3)
        break;
      case 4:
        obstacle.addImage(obs4)
        break;
      case 5:
        obstacle.addImage(obs5)
        break;
      case 6:
        obstacle.addImage(obs6)
        break;
      default:
        break

    }
    obstacle.lifetime = 70
    obstaclesGroup.add(obstacle)
  }









}