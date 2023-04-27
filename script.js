let inputDir = { x: 0, y: 0 };
let speed = 10;
let score=0;
const foodSound=new Audio('food.wav');
const gameOverSound=new Audio('gameover.wav');
const musicSound=new Audio('music.mp3');
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };




//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}




function isCollide(snake){
    //bump into urself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //bump into wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }

    return false;
}





function gameEngine() {
    //updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    // when eat food, increase score, regen food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a + (b-a)* Math.random()),y:Math.round(a + (b-a)* Math.random())};

    }
    // moving snake
    for(let i=snakeArr.length -2 ; i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //display snake and food 
    //display sanke
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    musicSound.play();

    switch (e.key) {
        case "ArrowUp":
                inputDir.x=0;
                inputDir.y=-1;    
        break;
        case "ArrowDown":
                inputDir.x=0;
                inputDir.y=1;    
        break;
        case "ArrowLeft":
                inputDir.x=-1;
                inputDir.y=0;    
        break;
        case "ArrowRight":
                inputDir.x=1;
                inputDir.y=0;    

            break;
        default:
            break;
    }
})