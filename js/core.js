$(document).ready(function (){
  //init canvas
  var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create});
  var background, astro;
  
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
    background.fixedToCamera=true;
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
  
});