const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var snakeHead, snakeBody, snakeBodyBit, steps, snakeDirection;
var pastX, pastY;

window.size = 0;
window.colorScheme = Math.round(Math.random() * 3);

var gamestate;
var speed;

var food1, food2, food3;
function growSnake(foodEaten) {
  if((snakeHead.body.position.x + 20 === foodEaten.body.position.x && snakeHead.body.position.y === foodEaten.body.position.y && snakeDirection === "right") ||
    (snakeHead.body.position.x - 20 === foodEaten.body.position.x && snakeHead.body.position.y === foodEaten.body.position.y && snakeDirection === "left") ||
    (snakeHead.body.position.x === foodEaten.body.position.x && snakeHead.body.position.y + 20 === foodEaten.body.position.y && snakeDirection === "down") ||
    (snakeHead.body.position.x === foodEaten.body.position.x && snakeHead.body.position.y - 20 === foodEaten.body.position.y && snakeDirection === "up")){
    window.size++;
    snakeBodyBit = new snakeBit(pastX[steps - window.size], pastY[steps - window.size]);
  
    snakeBody.push([snakeBodyBit, steps - window.size]);
  
    Matter.Body.setPosition(foodEaten.body, {x: round(random(1, 19)) * 20, y: round(random(1, 19)) * 20});
    for(var x = 0; x < window.size; x++){
      if(snakeBody[x][0].body.position.x === foodEaten.body.position.x || snakeBody[x][0].body.position.y === foodEaten.body.position.y ||
        snakeHead.body.position.x === foodEaten.body.position.x || snakeHead.body.position.y === foodEaten.body.position.y){
        Matter.Body.setPosition(foodEaten.body, {x: round(random(1, 19)) * 20, y: round(random(1, 19)) * 20});
      }
    }
  }
}

function setup() {
  //create canvas
  createCanvas(400,400);

  //setup
  engine = Engine.create();
  world = engine.world;

  //zero gravity
  engine.world.gravity.y = 0;

  //create the head of the snake
  snakeHead = new snakeBit(40, 40);
  snakeDirection = null;
  window.size = 0;
  steps = -1;

  //create the arrays for the rest of the snake bits
  snakeBody = [];
  pastX = [];
  pastY = [];

  //set variables
  gamestate = "playing";

  //create food
  food1 = new Food(round(random(1, 19)) * 20, round(random(1, 19)) * 20);
  food2 = new Food(round(random(1, 19)) * 20, round(random(1, 19)) * 20);
  food3 = new Food(round(random(1, 19)) * 20, round(random(1, 19)) * 20);
}

function draw() {
  //create background
  background(205,205,205);  

  //update engine if in play mode
  if(gamestate === "playing"){
    Engine.update(engine);
  }

  //display the food
  food1.display();
  food2.display();
  food3.display();

  //display the snake head
  snakeHead.display();

  //display the rest of the snake
  for(var x = 0; x < window.size; x++){
    snakeBody[x][0].display();
  }

  //set the snake direction
  if(keyIsDown(RIGHT_ARROW)){
    snakeDirection = "right";
  }

  if(keyIsDown(LEFT_ARROW)){
    snakeDirection = "left";
  }

  if(keyIsDown(UP_ARROW)){
    snakeDirection = "up";
  }

  if(keyIsDown(DOWN_ARROW)){
    snakeDirection = "down";
  }

  //change the speed
  speed = 15 - round(window.size/5);
  if(speed < 3){
    speed = 3;
  }

  //move the snake
  if(frameCount % speed === 0 && snakeDirection !== null && gamestate === "playing"){
    growSnake(food1);
    growSnake(food2);
    growSnake(food3);

    console.log(snakeHead.body.position.y);
    if(snakeDirection === "right"){
      if(snakeHead.body.position.x + 20 > 380){
        gamestate = "over";
      }else{
        Matter.Body.setPosition(snakeHead.body, {x: snakeHead.body.position.x + 20, y: snakeHead.body.position.y});
      }
    }
    if(snakeDirection === "left"){
      if(snakeHead.body.position.x - 20 < 0){
        gamestate = "over";
      }else{
        Matter.Body.setPosition(snakeHead.body, {x: snakeHead.body.position.x - 20, y: snakeHead.body.position.y});
      }
    }
    if(snakeDirection === "up"){
      if(snakeHead.body.position.y - 20 < 0){
        gamestate = "over";
      }else{
        Matter.Body.setPosition(snakeHead.body, {x: snakeHead.body.position.x, y: snakeHead.body.position.y - 20});
      }
    }
    if(snakeDirection === "down"){
      if(snakeHead.body.position.y + 20 > 380){
        gamestate = "over";
      }else{
        Matter.Body.setPosition(snakeHead.body, {x: snakeHead.body.position.x, y: snakeHead.body.position.y + 20});
      }
    }

    pastX.push(snakeHead.body.position.x);
    pastY.push(snakeHead.body.position.y);
    steps++;
    //move the other parts
    //console.log(window.size);

    for(var x = 0; x < window.size; x++){
      snakeBody[x][1]++;
      Matter.Body.setPosition(snakeBody[x][0].body, {x: pastX[snakeBody[x][1]], y: pastY[snakeBody[x][1]]});
    }
  }

  //used for debugging
  /*if(keyIsDown(32) && frameCount % speed === 0){
    window.size++;
    snakeBodyBit = new snakeBit(pastX[steps - window.size], pastY[steps - window.size]);

    snakeBody.push([snakeBodyBit, steps - window.size]);
  }*/

  if(snakeBody.length > 1){
    if(snakeBody[0][0].body.position.x % 20 !== 0 || snakeBody[0][0].body.position.y % 20 !== 0){
      gamestate = "over";
    }
  }

  //show game over text
  if(gamestate === "over"){
    fill(255, 0, 0);
    textSize(60);
    textAlign(CENTER);
    text("GAME\nOVER", 200, 200);
  }
}
