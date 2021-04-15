var coin,coinImg;
var diamond,diamondImg;
var kid,kidImg;
var monster,monsterImg;
var monsterGroup,coinsGroup,diamondsGroup;
var ground,groundImg
var gameState="play";
var score=0;
var coinSound;

function preload(){
    coinImg=loadImage("coin.png")
    diamondImg=loadImage("diamond.png")
    monsterImg=loadImage("monster.png")
    kidImg=loadImage("kid.png")
    groundImg=loadImage("background.png")
    coinSound=loadSound("coin.wav")
}

function setup(){
    createCanvas(600,400)  

    ground=createSprite(600,200,600,350)
    ground.addImage(groundImg)
    ground.x=ground.width/2
    ground.velocityX=-3
    ground.scale=1.5

    kid=createSprite(300,350,10,10)
    kid.addImage(kidImg);
    kid.scale=0.2;

    edges=createEdgeSprites();
    coinsGroup =new Group();
    diamondsGroup= new Group();
    monstersGroup= new Group();  
}

function draw(){
    background(0)
    drawSprites();
    if(gameState==="play"){
      
    if(ground.x<0){
        ground.x=ground.width/2
    }
    
    if(keyDown("space")&&kid.y>=100){
        kid.velocityY=-10;
    }
  
    kid.velocityY=kid.velocityY+0.8


    if(keyDown("right")){
        kid.x=kid.x+5;
    }

    if(keyDown("left")){
        kid.x=kid.x-5;
    }

    spawnCoins();
    spawnDiamonds();
    spawnMonster(); 
    kid.collide(edges);

    if(monstersGroup.isTouching(kid)){
    gameState="end";
    
    }
              if(coinsGroup.isTouching(kid)||diamondsGroup.isTouching(kid)){
    score=score+25
    coinSound.play();          
    coinsGroup[0].destroy();
    diamondsGroup[0].destroy();
    }
    }
    else if(gameState==="end"){
    ground.velocityX=0
    kid.velocityX=0;
    kid.velocityY=0
      
    monstersGroup.setVelocityXEach(0)
    coinsGroup.setVelocityXEach(0)
    diamondsGroup.setVelocityXEach(0)
     
    monstersGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    diamondsGroup.setLifetimeEach(-1);
    
    monstersGroup.destroyEach();
    coinsGroup.destroyEach();
    diamondsGroup.destroyEach();
    kid.destroy();
      
    fill("black");
    strokeWeight(4)
    stroke("green")
    textSize(30)
    text("GAME OVER",200,220)
    }
    textSize(20);
    fill("white");
    text("Score: "+score,400,40)
    
}

function spawnMonster(){
    if(frameCount%240===0){
        monster=createSprite(100,200,10,10)
        monster.addImage(monsterImg);
        monster.y=Math.round(random(10,150));
        monster.scale=0.3;
        monster.velocityX=3
      monster.lifetime=400
    monstersGroup.add(monster)
    }
    
}


function spawnCoins(){
if(frameCount%80===0) {
      var position=Math.round(random(1,2));
      coin=createSprite(400,200,20,20);
      coin.y=Math.round(random(0,300))
      coin.addImage(coinImg);
      coin.scale=0.06

      if(position==1){
            coin.x=600;
            coin.velocityX=-3
      }
      else if(position==2){
            coin.x=0
            coin.velocityX=3
      }
      coin.lifetime=400  
      coinsGroup.add(coin);
    }
}


function spawnDiamonds(){
if(frameCount%80===0) {
    diamond=createSprite(400,200,20,20);
    diamond.addImage(diamondImg);
    var position=Math.round(random(1,2));
    diamond.y=Math.round(random(0,300))
  
        if(position==1){
            diamond.x=600;
            diamond.velocityX=-3
        }
        else if(position==2){
            diamond.x=0
            diamond.velocityX=3
        }
    diamond.scale=0.2;
    diamond.lifetime=400 
    diamondsGroup.add(diamond)
}
}    
    
