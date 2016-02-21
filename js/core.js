$(document).ready(function (){
  //init canvas
  var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create, update: update });
  var background, astro;
  
  //variables
  
  var gravity=100;//set the gravity Acceleration of the world  ( goUp<0<goDown)
  var PlayerGravity=gravity; // PlayerGravity us a varuabke that will depend if magnetboots are activated or not
  var MBoots = false ; // Set the MagnetBoots ON or OFF
  var UpsideDown=false; // it identifies if the user is upsidedown the screen. this variable will be used in altergravity function as pivot for animations
  
  
  function preload() {
    //load background image
    game.load.image("background", "img/bglevel1.jpg");
    game.load.atlasJSONHash('astronaut','img/astroSheet.png', 'astroSheet.json');
    game.load.image("platform", "img/platform.png");
  }
  
  function firstLevel() {
    platform_1 = game.add.sprite(150,700,'platform');
    platform_2 =game.add.sprite(150,400,'platform');
  }
  
  function create() {
    game.world.setBounds(0, 0, 600, 1200);
    
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    //  game.physics.p2.gravity.y=gravity;
    

    background = game.add.tileSprite(0, 0, 600, 800, "background");
    background.fixedToCamera=true;
    
     firstLevel();
     
    astro = game.add.sprite(70, 660, 'astronaut', 0); //Character sprites
    game.physics.p2.enable(astro);
    astro.scale.setTo(0.8, 0.8);
    astro.anchor.setTo(0.5, 0.5);
    
     astro.animations.add('right', ['1.png', '2.png', '6.png', '5.png', '6.png', '4.png'], 12, true);
    astro.animations.add('left', ['7.png', '8.png', '12.png', '11.png', '12.png', '10.png'], 12, true);
   
    // astro.animations.add('right', ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'], 10, true);
    // astro.animations.add('left', ['7.png', '8.png', '9.png', '10.png', '11.png', '12.png'], 10, true);
    
    
    
   // setting the mass, if an object collides with another object, the result will be determined by velocity and mass
     astro.body.mass = 0.1;
     
     // Objects that will enable physics when added to the canvas
     
     game.physics.enable( [
         
            platform_1,
            platform_2
            ], Phaser.Physics.P2JS);
         
    //Objects that will be static , wont move under any condition.     
         platform_1.body.static=true;
         platform_2.body.static=true;
         
         
    //Objects that wont get  angular rotation under any condition
    
       astro.body.fixedRotation=true;
       
  }
  
  function update(){
    game.physics.p2.gravity.y = gravity;
    if(MBoots==true){
       astro.body.velocity.y = PlayerGravity;
    }
  }
  
  
  // FUNCTIONS
  //HORIZONTAL MOVEMENT SECTION
  function goRight() {
      
      //Depending of the gravity and the magnetboots it will show the proper animation
      if(MBoots==false){
    
            if(gravity >=0){
             astro.animations.play('right');
            }
            if(gravity <0){
             astro.animations.play('left');}
       }
       if(MBoots==true){
            if(PlayerGravity >=0){
             astro.animations.play('right');
            }
            if(PlayerGravity <0){
             astro.animations.play('left');}
        }
        //end of animation section
        
        
        //The Astronaut will move to the right
       var movement = setInterval(function(){astro.body.x +=2.2;}, 10);
             
             //Timeout will finish the execution of the function    
                 setTimeout(function() {
                     clearInterval(movement);
                     astro.animations.stop(null,true);
                    }, 1000);
                
  }
  
  
  function goLeft() {
    //Depending of the gravity and the magnetboots it will show the proper animation
        if(MBoots==false){
             if(gravity >=0){
               astro.animations.play('left');}
             if(gravity <0){
               astro.animations.play('right');}
        }
    
        if(MBoots==true){
              if(PlayerGravity >=0){
                astro.animations.play('left');}
              if(PlayerGravity <0){
                astro.animations.play('Right');}
        }
       //end of animation section
      
       
        //The Astronaut will move to the left
          var movement = setInterval(function(){
          astro.body.x -= 2.2;
        }, 10);
        
         //Timeout will finish the execution of the function 
         setTimeout(function() {
            clearInterval(movement);
            astro.animations.stop(null,true);
        }, 1000);
  }
  
  
  // PLAYER FUNCTIONALITY GADGET SECTION
  function alterGravity() {
      
    //Altergravity main functionality
    gravity=gravity*-1;
    
    
    //This condition will switch between false and true each time the function is invoked
            if(UpsideDown==false){
                UpsideDown=true;}
            else{
                if(UpsideDown==true){
                    UpsideDown=false;
                }
            }
    //Asynchronimous section that will allow the main character to rotate once it use altergravity and lock the new angle
    setTimeout(function(){
        astro.body.fixedRotation=false;
        if(MBoots==false){
            astro.body.angle+=180;
          }
     },100)
    
    setTimeout(function(){
        astro.body.fixedRotation=true;
     },120);

      //end of Asynchronimous section
      
      
    }
  
  
   function magneticBoots() {
       
      
       
       if(MBoots ==false){MBoots=true;}
        else{
                if(MBoots==true){
                     if( PlayerGravity != gravity) {
                             astro.body.fixedRotation=false;
                             astro.body.angle+=180;
                       }
                    MBoots=false;
                  }
           }
    
        PlayerGravity=gravity;
        console.log("Mboots="+ MBoots);
     
  
    }
  
  
  
  //FOR TESTING PURPOSES ONLY
  $("#phaserContainer").click(function() {


  alterGravity();
       setTimeout(function() {
           magneticBoots();
        
             setTimeout(function() {
                 alterGravity();
            
                  setTimeout(function() {
                     magneticBoots();
            
            
            
                     }, 1000);
            
                }, 1000);
        
       }, 1000);
  });
  
});