const ball=document.getElementById("ball");
const grid= document.querySelector(".grid");
var paddle=document.getElementById("paddle");

var total=1;

var blocks=Array.from(document.querySelectorAll(".grid div"));
var ballDirectionY=1;
var ballDirectionX=1;
//moving the ball
function moveBall(){
    var ballLeft=parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop=parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    //changing left and top
    ball.style.left=(ballLeft+(10*ballDirectionX))+"px";
    ball.style.top=(ballTop-(10*ballDirectionY))+"px";

}

//change direction of ball on collision with walls
function changeDirection(){
    var ballLeft=parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop=parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    
    if(ballTop<0 || ballTop>innerHeight){
        ballDirectionY=-ballDirectionY;
    }
    else if(ballLeft<0 || ballLeft>innerWidth){
        ballDirectionX=-ballDirectionX;
    }
}

//removing blocks with ball bouncing function
function remove(){
    blocks.forEach((block)=>{
        var blockPosition=block.getBoundingClientRect();
        var ballPosition=ball.getBoundingClientRect();
        var removeBlock=block.classList.contains("remove");
       // console.log(blockPosition,ballPosition)
        if(blockPosition.left < ballPosition.right 
            && blockPosition.right > ballPosition.left 
            && blockPosition.top < ballPosition.bottom 
            && blockPosition.bottom>ballPosition.bottom && !removeBlock){
                block.style.visibility="hidden";
                block.classList.add("remove");
                ballDirectionY=-ballDirectionY;
                total= total+10;

        }else{
            console.log("nothing");
        }
      })
}
//control the paddle with mouse
window.addEventListener("mousemove",movePaddle)
function movePaddle(e){
    mousePosition={
        x:e.clientX,
        y:e.clientY
    }
    if(mousePosition.x<innerWidth-80){
        paddle.style.left=(mousePosition.x+0)+"px";
    }else{
        console.log("go inside")
    }
   
}

//ball bounce back
function collision(){
    var paddlePosition=paddle.getBoundingClientRect();
    var ballPosition=ball.getBoundingClientRect();
    if(paddlePosition.left < ballPosition.right 
        && paddlePosition.right > ballPosition.left 
        && paddlePosition.top < ballPosition.bottom 
        && paddlePosition.bottom>ballPosition.bottom && paddlePosition.bottom>ballPosition.top){
            ballDirectionY= -ballDirectionY;
        }

}

//game over function
function gameover(){
    var ballTop=parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if(ballTop>innerHeight){
        clearInterval(interval)
        const result=document.getElementById("result");
        result.style.display="block";
        grid.style.display="none";
        const box=document.getElementById("box");
        box.style.display="none";
    }else{
        console.log("nothing");
    }
}

function start(){
    moveBall()
    changeDirection()
    remove()
    collision()
    gameover()
}
const interval=setInterval(start,40)

function result(){
    //var score=document.getElementById("score");
    //score=total;
    

    document.getElementById("score").value =total;
    
   
   //document.write(score);
}