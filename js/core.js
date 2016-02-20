$(document).ready(function (){
  //init canvas
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create});
  var background, astro;
  
  function preload() {
    //load background image
    game.load.image("background", "img/background.png");
    game.load.atlasJSONHash('astronaut','img/astroSheet.png', 'astroSheet.json');
  }
  
  function create() {
    game.world.setBounds(0, 0, 800, 800);
    background = game.add.tileSprite(0, 0, 800, 600, "background");
    background.fixedToCamera=true;
    astro = game.add.sprite(50, 430, 'astronaut',0); //Character sprites
    astro.scale.setTo(0.8, 0.8);
    astro.anchor.setTo(0.5, 0.5);
  }
  
});