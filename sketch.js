var sprite;
var targetGroup;
var target1;
var gameState="start";
var maxCount=30;
var count=maxCount;
var startAt;
var nowAt;
var diffS;
var flag="home";
var cnt=0,incr=0;

function preload()
{
  targetImg=loadImage("targetRed.png");
  homeImg=loadImage("AimTrainer.png");
}


//Single Destroy

function solo()
{
  background("black");
  
 if(diffS>29.8)
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
      incr++;
      count--;
      gameState="done";  
      
    }
}

function multi()
{
  if(cnt<3&&count!==cnt)
  {
    targetf = createSprite(random(300,800),random(200,700),50,100)
    targetf.addImage("target1",targetImg);
    targetf.scale=0.2;
    cnt+=1;
    targetGroup.add(targetf)
  }
  for(var x=0;x<cnt;x++)
  {
    if(mousePressedOver(targetGroup[x]))
    {
        incr++;
        targetGroup[x].destroy();
        cnt--;
        count--;
     }
  }
  if(diffS>29.8)
  {
    gameState="Lost";
  }
  if(count===0)
  {
    gameState="Won";
  }


  
}


function setup()
 {
      createCanvas(windowWidth,windowHeight);
      single=createButton("Solo Target");
      Frenzy = createButton("Tile Frenzy")
      targetGroup=new Group();    
      home=createButton("HomePage");
  }


function draw()
 {
      background("lightblue");
    
      //When button is clicked for homepage
      if(flag==="home")
      {
        homepage();
      }

     //console.log(gameState);


      if((gameState==="ready")||(gameState==="done"))
      {
        nowAt=new Date();
        diffS=Math.round((nowAt-startAt)/1000);
        
          if(flag==="multi")
          {
            multi();
          }
          
          if(flag==="solo")
          {
            solo();
          }
          // console.log(incr);
        textAlign(CENTER)
        textSize(30);
        //fill("white");
        text("Targets Hit "+incr,windowWidth/2+100,windowHeight/10);  
        text("Targets Remaining "+count,windowWidth/4,windowHeight/10);  
        text("Time Spent "+diffS+" sec",windowWidth/2-100,windowHeight/6);
      }
      else if(gameState==="Won"||gameState==="Lost")
      {
        if(target1!==undefined)
        {
          target1.destroy();
        }
        if(targetGroup!==undefined)
        {
          targetGroup.destroyEach();
        }
        textSize(30);
        text("Average Time "+Math.round((diffS/incr)*100)/100+" sec",windowWidth/2-100,windowHeight/2);
        home.position(width/2,windowHeight/4);
        home.mousePressed(function(){
          home.hide();
          flag="home";
          gameState="start";

        })
      }


      drawSprites();
      //text(mouseX+" "+mouseY,mouseX,mouseY)
}

function homepage()
 {
    background(homeImg);
    
    single.show();
    Frenzy.show();

    single.position(width-300,windowHeight/2)
    Frenzy.position(width/2+100, windowHeight/2)
    
    single.mousePressed(function(){
      single.hide();
      Frenzy.hide();
      gameState="done";
      incr=0;
      count=maxCount;
      flag="solo";
      startAt=new Date();
    })


    Frenzy.mousePressed(function(){
      single.hide();
      Frenzy.hide();
      incr=0;
      count=maxCount;
      gameState="done";
      flag="multi";
      startAt=new Date();
      //multi();
    })

}
