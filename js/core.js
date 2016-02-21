$(document).ready(function (){
  //init canvas
  var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create, update: update });
  var background, astro;
  
  
  var gravity=100;//set the gravity Acceleration of the world  ( goUp<0<goDown)
 
  
  
  
  function preload() {
    //load background image
    game.load.image("background", "img/background.png");
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

      
  }
  
  
  // FUNCTIONS
  
  function goRight() {
    astro.animations.play('right');
   var movement = setInterval(function(){
       
       
                 astro.body.x +=2.2;
             }, 10);
             
             setTimeout(function() {
        clearInterval(movement);
        astro.animations.stop(null,true);
    }, 1000);
  }
  
  function goLeft() {
    astro.animations.play('left');
    var movement = setInterval(function(){
      astro.body.x -= 2.2;
    }, 10);
     setTimeout(function() {
        clearInterval(movement);
        astro.animations.stop(null,true);
    }, 1000);
  }
  function alterGravity() {
   // game.add.tween(astro).to( { angle: 180 }, 280, Phaser.Easing.Sinusoidal.InOut, true);
    var movement = setInterval(function(){
      astro.y -= 4;
    }, 10);
  }
  
  
  
  $("#phaserContainer").click(function() {
    goRight();
  });
  
});