$(document).ready(function (){
  //init canvas
  var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create});
  var background, astro;
  var keyCounter = 0;
  var instructions = ["goRight", "goLeft", "alterGravity"];
  var goRight = [71, 79, 82, 73, 71, 72, 84];
  var goLeft = [71, 79, 76, 69, 70, 84];
  var alterGravity = [65, 76, 84, 69, 82, 71, 82, 65, 86, 73, 84, 89];
  var codeLine = [];
  var autocomplete = false;
  var goRightCoincidence = false, goLeftCoincidence = false, alterCoincidence = false;
  var rightAutocomplete = false, leftAutocomplete = false, alterAutocomplete = false;
  function preload() {
    //load background image
    game.load.image("background", "img/background.png");
    game.load.atlasJSONHash('astronaut','img/astroSheet.png', 'astroSheet.json');
    game.load.image("platform", "img/platform.png");
  }
  
  function firstLevel() {
    platform_1 = game.add.sprite(50,700,'platform');
    platform_2 =game.add.sprite(50,400,'platform');
  }
  function create() {
    game.world.setBounds(0, 0, 600, 800);

    background = game.add.tileSprite(0, 0, 600, 800, "background");
    background.fixedToCamera = true;
    astro = game.add.sprite(70, 660, 'astronaut', 0); //Character sprites
    firstLevel();
    astro.scale.setTo(0.8, 0.8);
    astro.anchor.setTo(0.5, 0.5);
    astro.animations.add('right', ['6.png', '2.png', '6.png', '5.png', '6.png', '4.png'], 12, true);
    astro.animations.add('left', ['12.png', '8.png', '12.png', '11.png', '12.png', '10.png'], 12, true);
    //game.physics.enable(astro, true);
  }
  
  function goRight() {
    astro.animations.play('right');
    var movement = setInterval(function(){
      astro.x += 2.2;
    }, 10);
  }
  
  function alterGravity() {
    game.add.tween(astro).to( { angle: 180 }, 280, Phaser.Easing.Sinusoidal.InOut, true);
    var movement = setInterval(function(){
      astro.y -= 4;
    }, 10);
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
                //return instructionResult;
                instructionResultArray.push(instructionResult);
            } else {
                //return null;
                instructionResultArray = null;
            }
        }
        return instructionResultArray;
    }
  
});