$(document).ready(function (){
  //init canvas
  var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create, update: update });
  var background, astro;
<<<<<<< HEAD
  var keyCounter = 0;
  var instructions = ["goRight", "goLeft", "alterGravity"];
  var goRight = [71, 79, 82, 73, 71, 72, 84];
  var goLeft = [71, 79, 76, 69, 70, 84];
  var alterGravity = [65, 76, 84, 69, 82, 71, 82, 65, 86, 73, 84, 89];
<<<<<<< HEAD
  var autocomplete = false;
  var goRightCoincidence = false, goLeftCoincidence = false, alterCoincidence = false;
=======
  var codeLine = [];
  var autocomplete = false;
  var goRightCoincidence = false, goLeftCoincidence = false, alterCoincidence = false;
  var rightAutocomplete = false, leftAutocomplete = false, alterAutocomplete = false;
>>>>>>> master
=======
  
  
  var gravity=100;//set the gravity Acceleration of the world  ( goUp<0<goDown)
  var PlayerGravity=gravity; // PlayerGravity us a varuabke that will depend if magnetboots are activated or not
  var MBoots = false ; // Set the MagnetBoots ON or OFF
  var UpsideDown=false; // it identifies if the user is upsidedown the screen. this variable will be used in altergravity function as pivot for animations
  
  
>>>>>>> a88c08a610eb565abd92c1e5165183c8e02a7f7f
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
<<<<<<< HEAD
    background.fixedToCamera = true;
=======
    background.fixedToCamera=true;
    
     firstLevel();
     
>>>>>>> a88c08a610eb565abd92c1e5165183c8e02a7f7f
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
       
       Mboots =!Mboots
       
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
  
  
  $("#phaserContainer").click(function() {
    alterGravity();
  });
  
  //complier
  $("#run").click(function(event){ 
    event.preventDefault();
    var objectResult = checkSyntax($("#editor").val()); 
    console.log(objectResult);
  });
  $(document).on('click', '.autocomplete-instruction', function() {
    $("#editor").val($(this).text());
    $(document).find('span').remove();
  });
  
  $("#editor").keydown(function(event) {
      if(event.keyCode == 13) {
        keyCounter = 0;
      } 
      if(event.keyCode == goRight[keyCounter]) {
        goRightCoincidence = true;
      } else {
        goRightCoincidence = false;
      }
      if(event.keyCode == goLeft[keyCounter]) {
        goLeftCoincidence = true;
        keyCounter++;
      } else {
        goLeftCoincidence = false;
      }
      if(event.keyCode == alterGravity[keyCounter]) {
        alterGravityCoincidence = true;
      } else {
        alterGravityCoincidence = false;
      }
      if(alterGravityCoincidence === true) {
        //console.log(goRight);
        if(autocomplete === false) {
          autocomplete = $(".editor").append('<span></span>');
        }
        $(autocomplete).find('span').html('<ul><li class=autocomplete-instruction>'+instructions[2]+'</li></ul>');
        
      }
      if(goRightCoincidence === true && goLeftCoincidence === true) {
        //console.log(goRight);
        if(autocomplete === false) {
          autocomplete = $(".editor").append('<span></span>');
        }
        $(autocomplete).find('span').html('<ul><li class="autocomplete-instruction">'+instructions[0]+'</li><li class="autocomplete-instruction">'+instructions[1]+'</li></ul>');
      }
      if(goRightCoincidence === true && goLeftCoincidence === false) {
        //console.log(goRight);
        if(autocomplete === false) {
          autocomplete = $(".editor").append('<span></span>');
        }
        $(autocomplete).find('span').html('<ul><li class=autocomplete-instruction>'+instructions[0]+'</li></ul>');
      }
      if(goRightCoincidence === false && goLeftCoincidence === true) {
        //console.log(goRight);
        if(autocomplete === false) {
          autocomplete = $(".editor").append('<span></span>');
        }
        $(autocomplete).find('span').html('<ul><li class=autocomplete-instruction>'+instructions[1]+'</li></ul>');
      }
  });
  
  function checkSyntax(editorVal) {
    var syntax = false;
    //commands list
    var instructionResultArray = [];
    var linesNumber = editorVal.split(/\n/g).length;
    var linesCode = editorVal.split(/\n/g);
        for(var i=0; i<linesNumber;i++) {
            var codeInstruction = linesCode[i].substring(0, linesCode[i].indexOf("("));
            var value = linesCode[i].substring(linesCode[i].indexOf("(") +1, linesCode[i].lastIndexOf(")"));
            if(
                codeInstruction == "alterGravity"
                &&
                linesCode[i].indexOf(")") == linesCode[i].length - 1
            ) {
                instructionResult = {type: instructions.indexOf(codeInstruction), value: null };
                syntax = true;
            }
            else if(
                instructions.indexOf(codeInstruction) != -1
                &&
                linesCode[i].indexOf(")") == linesCode[i].length - 1
                &&
                !isNaN(value)

            ) {
                instructionResult = {type: instructions.indexOf(codeInstruction), value: value };
                syntax = true;
            }

            if(syntax) {
                console.log("Index: "+instructionResult.type+" "+"Value: "+instructionResult.value);
                instructionResultArray.push(instructionResult);
            } else {
                instructionResultArray = null;
            }
        }
        return instructionResultArray;
    }
  
});