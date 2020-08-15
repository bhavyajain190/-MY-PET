var garden,washroom,foodS,foodStock,currentTime,gameState,readState;
var database ,dog,dog1,dog2

var feed,addFood
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  garden = loadImage("Images/Garden.png")
  washroom = loadImage("Images/Wash Room.png")
  bedroom = loadImage("Images/Bed Room.png")
	
}

function setup() {
	createCanvas(400, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(200,400,150,150);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var foodStock = database.ref('Food');
  foodStock.on("value", readStock);

   Feedtime = database.ref('Feed Time');
Feedtime.on("value",function(data){
  lastFeed=data.val();
})
  
var readState = database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
})



feed = createButton("FEED THE DOG")
  feed.position(700,95)
  feed.mousePressed("feedDog")







  addFood = createButton("ADD FOOD")
  addFood.position(800,95)
  addFood.mousePressed(AddFood)

} 

function draw(){
 currentTime=hour();
if(currentTime==(lastFeed+1)){
  update("Playing");
  foodobject.garden();
}else if(currentTime==(lastFeed+2)){
  update("Sleeping");
  foodobject.bedroom();
}else if(currentTime>(lastFeed+2)&&currentTime<=(lastFeed+4)){
  update("Bathing");
foodobject.washroom();
}
  

drawSprites();
}
function feedDog(){
dog.addImage(dogimg2);
foodobject.updateFoodStock(foodobject.getFoodStock()-1);
database.ref('/').update({
Food:foodobject.getFoodStock(),
Feedtime:hour(),
gameState:"Hungry"

})
}
function addFood(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}
function gameState(){
  database.ref('/').update({
gameState:state
  })
}
















