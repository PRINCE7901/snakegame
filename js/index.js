// constant and variable declaration
let inputDir={x:0, y:0};
const foodsound= new Audio('eat.mp3');
const gameoversound=new Audio('gameover.wav');
let lastpaintTime=0;
let speed=5;
let score=0;
let snakearr=[
    {x:13, y:15}
]
food={x:7, y:6};
//game function
function main(ctime)
{
    window.requestAnimationFrame(main);
   // console.log(ctime)
    if((ctime-lastpaintTime)/1000<1/speed)
    {
        return;
    }
    lastpaintTime=ctime;
    gameEngine();

    
}
function isCollide(snake){
    //if you bump in to your self
    for (let i = 1; i < snakearr.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y) 
        {
            return true;
        } 
    }
    //if you bump into the wall
        if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0)
        {
            return true;

        }
    
}
function gameEngine()
{
    //part1:updating the snake array and food
    if(isCollide(snakearr))
    {
        gameoversound.play();
        inputDir={x:0,y:0};
        alert("Game is over press any key to play again!");
        snakearr=[{x:13, y:15}];
        score=0;

    }
    //if you have eaten the food increment the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x=== food.x)
    {
        foodsound.play();
        score +=1;
        scoreBox.innerHTML="score:"+score;
        snakearr.unshift({x:snakearr[0].x+inputDir.x, y:snakearr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake 
    for(let i=snakearr.length-2; i>=0; i--)
    {
        snakearr[i+1]={...snakearr[i]};

    }
    snakearr[0].x +=inputDir.x;
    snakearr[0].y +=inputDir.y;
    //display the snake
board.innerHTML="";
snakearr.forEach((e,index)=>{
    snakeElement= document.createElement('div');
snakeElement.style.gridRowStart=e.y;
snakeElement.style.gridColumnStart=e.x;
snakeElement.classList.add('snake');
if(index===0)
{
    snakeElement.classList.add('head');
}
else{
    snakeElement.classList.add('snake');
}
board.appendChild(snakeElement);
});
//display food element
foodElement= document.createElement('div');
foodElement.style.gridRowStart=food.y;
foodElement.style.gridColumnStart=food.x;
foodElement.classList.add('food');
board.appendChild(foodElement);


    
}
















//main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir={x:0, y:1}//start the game
switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x=0;
        inputDir.y=-1;
        break;
    case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x=0;
        inputDir.y=1;
        break;
    case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x=-1;
        inputDir.y=0;
        break;
     case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x=1;
        inputDir.y=0;
        break;
}
});