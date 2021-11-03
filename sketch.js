var PLAY = 1;
var END = 0
var gameState = PLAY
var alien, alien2;
var hand, gem, invisibleGround
var score =0
var gameOver, restart 


function preload(){

    gameOverImg = loadImage('gameover2.png')
    marsImg = loadImage('mars.jpg')
    gemImg = loadImage('gem.png')
    runnerImg = loadImage('run1.png')
    runner2Img = loadImage('run2.png')
    handImg  = loadImage('hand.png')

}

function setup() {
    createCanvas(300,350)
    alien = createSprite(50,300,20,10)
    alien.scale =0.5
    alien.addImage(runnerImg)

    ground = createSprite(200,180,400,20)
    ground.x = ground.width/10
    ground.addImage(marsImg)
    ground.velocityX = -(5+4*score/100)

    gameOver = createSprite(150,150)
    gameOver.addImage(gameOverImg)
    gameOver.scale = 0.5
    
    restart = createSprite(150,150)
    restart.scale = 0.5

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(200,190,400,10)
    invisibleGround.visible = false;

    gemsGroup = new Group()
    obsticleGroup = new Group()

    score = 0


 
}

function draw() {
 
    background(225)
    
    text('Score: '+ score, 150,150)

    if(gameState===PLAY){
        score = score + Math.round(getFrameRate()/60)
        ground.velocityX = -(6 + 3*score/100)

        if(keyDown('space') && alien.y >= 30){
            alien.velocityY = -10
        }

        alien.velocityX = alien.velocityX+ 0.5

        if(ground.x <0){
            ground.x = ground.width/2
        }

        alien.collide(invisibleGround)
        spawngems()
        spawnobsticle()

        if(obsticleGroup.isTouching(alien)){
            gameState = END
        }

    }

    else if (gameState ===END){
        gameOver.visible = true 
        restart.visible = true

        ground.velocityX = 0
        alien.velocityX = 0
        obsticleGroup.setVelocityXEach(0)
        gemsGroup.setVelocityXEach(0)

        obsticleGroup.setLifetimeEach(-1)
        gemsGroup.setLifetimeEach(-1)

        if(mousePressedOver(restart)) {
            reset();
          }

    }

    drawSprites()
}

function spawngems(){
    if (frameCount % 60 === 0){
        var gem = createSprite(100,200,40,5)
        gem.x = Math.round(random(80,120))
        gem.addImage(gemImg)
        gem.scale = 0.1
        gem.velocityX = -3
        gem.lifetime = 200
        gem.depth = gem.depth
        alien.depth = alien.depth + 1
        gemsGroup.add(gem)
    }
}

function spawnobsticle(){
    if(frameCount % 60 ===0){
        var obsticle = createSprite(150,165,10,40)
        obsticle.velocityX = -(6 + 3*score/100)

        var rand = Math.round(random(1,6))
        switch(rand){
            case 1: obsticle.addImage(handImg)
            break;
        }

        obsticle.scale = 0.5;
        obsticle.lifetime = 300;
        obsticleGroup.add(obsticle);
    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obsticleGroup.destroyEach();
    gemsGroup.destroyEach();

    score = 0;
}