let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset-btn");
let newBtn=document.querySelector(".new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");

let O=true;

let winningPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const enabledBoxes=()=>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const resetGame=()=>{
    O=true;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(O){
            box.innerText="O";
            box.style.color="yellow";
            O=false;
        }
        else{
            box.innerText="X";
            box.style.color="red";
            O=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const disabledBoxes=()=>{
    for(box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations ${winner} won the game !!!`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const checkWinner=()=>{
    let hasWin=false;
    for(let pattern of winningPattern){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                hasWin=true;
                return;
            }
        }
    }
    if(!hasWin){
        const allBoxes=[...boxes].every((box)=>
            box.innerText !== "");
        if(allBoxes){
            msgContainer.classList.remove("hide");
            msg.innerText=`Match Drawn`;
        }
    }
}

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);