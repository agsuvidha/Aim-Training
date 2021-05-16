var sprite;
var targetGroup;
var target1;
var gameState="done";
var maxCount=3;
var count=maxCount;
var startAt=new Date();
var nowAt;
var diffS;
var flag="home";


function preload()
{
  targetImg=loadImage("target.png");
}




function solo()
{
  background("lightblue");
  
 if(diffS>30)
    {
      gameState="Lost";
    }

 if(count===0)
    {
      gameState="Won";
    }

  if(gameState==="done"&&count>0)
    {
      gameState="ready"
      target1 = createSprite(50,50,50,100)
      target1.addImage("target",targetImg)
      target1.scale = 0.2;
      target1.x = Math.round(random(100,width-200))
      target1.y = Math.round(random(100,height-200))
    }

    if((gameState==="ready")&&(mousePressedOver(target1)))
    {
      target1.destroy();
      count--;
      gameState="done";  
      
    }
    

}




function setup()
 {
      createCanvas(windowWidth,windowHeight);
      single=createButton("Solo Target");
      Frenzy = createButton("Tile Frenzy")
    
}

function draw()
 {
      background("lightblue");
    
      if(flag==="home")
      {
        homepage();
        
      }
    
      if(((gameState==="ready")||(gameState==="done"))&&flag==="solo")
      {
        nowAt=new Date();
        diffS=Math.round((nowAt-startAt)/1000);
        solo();  
        text("Targets Remaining "+count,windowWidth/2-100,windowHeight/10);  
        text("Time "+diffS,windowWidth/2-100,windowHeight/8);
      }
      else if(gameState==="Won"||gameState==="Lost")
      {
        text("Avg. Time "+Math.round((diffS/maxCount-count)),windowWidth/2-100,windowHeight/2);
      }

      drawSprites();
  
}

function homepage()
 {
    background("red");
    
    textSize(50)
    textFont("Impact")
    fill("")
    text("Valorant Aim Trainer",windowWidth/3,windowHeight/3);
    
    text("Welcome to Rithwik's Aim Trainer",windowWidth/4,windowHeight/5)

    single.position(windowWidth/2,windowHeight/2)
    Frenzy.position(windowWidth/4, windowHeight/2)
    
    single.mousePressed(function(){
      single.hide();
      Frenzy.hide();
      flag="solo";
      
    })

}
