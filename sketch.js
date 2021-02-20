// define constants and variables
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var circleImg, playerImg, spikeImg, teleportImg;
var player, playerBody;
var playerRotate = true;
var points = [];

function preload()
{
  circleImg = loadImage("images/circle.png");
  playerImg = loadImage("images/player.png");
  spikeImg = loadImage("images/spike.png");
  teleportImg = loadImage("images/teleport.png");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);

  // create engine and put inside world
  engine = Engine.create();
  world = engine.world;

  player = createSprite(width/2, height/2, 10, 10);
  player.addImage(playerImg);
  player.scale = 0.58

  playerBody = new PlayerBody(width/2, height/2, 20);
  rope = new Rope(playerBody.body, {x: width/2, y: height/2});

  generateMap();

}

function draw()
{
  background(60);

  Engine.update(engine);
  player.x = playerBody.body.position.x;
  player.y = playerBody.body.position.y;
  
  camera.position.x = player.x;
  camera.position.y = player.y;


  console.log(mouseX, mouseY);
  if(mousePressedOver(player) || playerRotate === false)
  {
    player.rotationSpeed = 0;
    playerRotate = false;
  }
  else
  {
    player.rotationSpeed = 5;
  }
  playerBody.display();
  rope.display();

  drawSprites();
}
function mouseDragged()
{
  if(rope.sling.bodyA)
  {
    Matter.Body.setPosition(playerBody.body, {x: mouseX , y: mouseY});
  }
}
function mouseReleased()
{
  // to release object
  rope.fly()
}
function generateMap()
{
  // North
  point1 = createSprite(player.x, player.y -  height/3, 20, 20);
  // NorthEast
  point2 = createSprite(player.x + width/3, player.y - height/3, 20, 20);
  // East
  point3 = createSprite(player.x + width/3, player.y, 20, 20);
  // SouthEast
  point4 = createSprite(player.x + width/3, player.y + height/3, 20, 20);
  // South
  point5 = createSprite(player.x, player.y + height/3, 20, 20);
  // SouthWest
  point6 = createSprite(player.x-width/3, player.y + height/3, 20, 20);
  // West
  point7 = createSprite(player.x-width/3, player.y, 20, 20);
  // NorthWest
  point8 = createSprite(player.x - width/3, player.y - height/3, 20, 20);
  // make array with all points
  points.push(point1, point2, point3, point4, point5, point6, point7, point8);
  // for all points
  for(var i = 0; i< points.length; i++)
  {
    // make all sprites decidesprite 
   decideSprite(points[i]);
   // make all sprites have rotation
   points[i].rotationSpeed = -5;
  }
  
}
function decideSprite(point)
{
  rand = Math.round(random(1, 5));
  switch(rand)
  {
    case 1: point.addImage("circle", circleImg);
    point.scale = 0.05; break;
    case 2: point.addImage("circle", circleImg);
    point.scale = 0.05; break;
    case 3: point.addImage("spike", spikeImg);
    point.scale = 0.05; break;
    case 4: point.addImage("spike", spikeImg);
    point.scale = 0.05; break;
    case 5: point.addImage("teleport", teleportImg);
    point.scale = 0.05; break;
  }
}
