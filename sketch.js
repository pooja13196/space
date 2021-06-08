var PLAY = 1;
var END = 0;

var gameState=PLAY;
var bg,astronaut,astronautImg,comet1,cometImg1, comet2,cometImg2,potion,potionImg,mainRocket,mainRocketImg;
var potionS,GameS;
var Score=0;


function preload(){
  bg=loadImage("Background.gif");
  astronautImg=loadImage("Astronaut.png");
  cometImg1=loadImage("01.png");
  cometImg2=loadImage("02.png");
  potionImg=loadImage("Potion.png");
  mainRocketImg=loadImage("MainRocket.png");
 

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  astronaut=createSprite(400, 200, 50, 50);
  astronaut.addImage(astronautImg);

  comet1=createSprite(500,600,60,60);
  comet1.addImage(cometImg1);

  comet2=createSprite(500,600,60,60);
  comet2.addImage(cometImg2);

  potion=createSprite(200,600,60,60);
  potion.addImage(potionImg);
  potion.scale=0.3;

  mainRocket=createSprite(410,600,60,60);
  mainRocket.addImage(mainRocketImg);
  //mainRocket.scale=0.3;

  comet1Group = new Group();
  comet2Group = new Group();

  potionGroup = new Group();

  ground=createSprite(600, 480, 1200, 200);
    ground.visible=false;
    
    invisibleGround=createSprite(600, 500, 1200, 200);
    invisibleGround.visible=false;

  
  
}

function draw() {
  background(bg);  
  
  text("Score: "+ Score, 500,50);

  if (gameState===PLAY){
    bg.velocityX = -5;
    if(bg.x<0){
      bg.x = width/2;
    }
    ground.velocityX=-5
    if(ground.x<0){
      ground.x = width/2;
    }

    if(keyDown("space")) {
      astronaut.velocityY = -12;
    }
  
    astronaut.velocityY = astronaut.velocityY + 0.8
  
    spawncomet1();
    spawncomet2();
  
    if(comet2Group.isTouching(astronaut)||comet1Group.isTouching(astronaut)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   bg.velocityX = 0;

    
    //set velcity of each game object to 0
   
    astronaut.velocityY = 0;
    comet2Group.destroyEach();
    comet1Group.destroyEach();
   
    comet2Group.setLifetimeEach(0);
    comet1Group.setLifetimeEach(0);
    
    //if(mousePressedOver(restart)) {
      //reset();
    //}

    


  }
  astronaut.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;


 gameover.visible = false;
  restart.visible = false;
  
  comet2Group.destroyEach();
  comet1Group.destroyEach();
}

function spawncomet2() {
  //write code here to spawn the comet2s
  if (frameCount % 60 === 0) {
    var comet2 = createSprite(600,120,40,10);
    comet2.y = Math.round(random(30,80));
    comet2.addImage(cometImg2);
    comet2.scale = 0.5;
    comet2.velocityX = -3;
    
     //assign lifetime to the variable
    comet2.lifetime = 200;
    
    //adjust the depth
    comet2.depth = astronaut.depth;
    astronaut.depth = astronaut.depth + 1;
    
    //add each comet2 to the group
    comet2Group.add(comet2);
  }
}



function spawncomet1() {
  //write code here to spawn the comet2s
  if (frameCount % 100 === 0) {
    var comet1 = createSprite(600,120,40,10);
    comet1.y = Math.round(random(10,120));
    comet1.addImage(cometImg1);
    comet1.scale = 0.3;
    comet1.velocityX = -3;
    
     //assign lifetime to the variable
    comet1.lifetime = 200;
    
    //adjust the depth
    comet1.depth = astronaut.depth;
    astronaut.depth = astronaut.depth + 1;
    
    //add each comet2 to the group
    comet1sGroup.add(comet1);
  }
}