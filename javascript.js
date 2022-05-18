
let gameBoard= (function(){
    let boardArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
    let alterBoard = function(boxname, newvalue){
        boxname=boxname-1;
        if(typeof(newvalue)=='string' && boxname<10 && typeof(boardArray[boxname]!='string')){
            boardArray[boxname] = newvalue.toUpperCase();
        }
        else if(typeof(newvalue)=='undefined'&& boxname<10){
            boardArray[boxname] = newvalue;
        }
    }
    return{
        boardArray,
        alterBoard
    }
})(box1=undefined, box2=undefined, box3=undefined, box4=undefined, box5=undefined, box6=undefined, box7=undefined, box8=undefined, box9=undefined);


let displayController = (function(){
    //map values of innercells
    let cellList = [...document.getElementsByClassName('cell')];
    let displayCurrentBoard = function(){
        let array= gameBoard.boardArray;
        cellList.map((e,i)=>{
            switch(array[i]){
                case 'X':
                    e.style.backgroundImage= "url(./images/cross.svg)";
                    break;
                case undefined:
                    e.style.backgroundImage="none";
                    break;
                case 'O':
                    e.style.backgroundImage= "url(./images/circle.svg)";
                    break;
                default:
                    console.log('error in gameboard switch case');
            }
        })  
    }
    //eventlistener for cell clicks
    let boardDiv = document.getElementById('gameblock');
    let evencount= 1;
    boardDiv.addEventListener('click', afterclicker);
    function afterclicker(e, restart=false){
        console.log(evencount);
        if(restart==true){
            evencount=1;
            restart=false;
            return;
        }
        else if(evencount%2==1 && typeof(gameBoard.boardArray[e.target.id-1])!='string'){
                gameBoard.alterBoard([e.target.id], 'x'); //x goes first
                evencount++;   
        }
        else if(evencount%2==0 && typeof(gameBoard.boardArray[e.target.id-1])!='string'){
            gameBoard.alterBoard([e.target.id], 'o');
            evencount++;
        }
        displayCurrentBoard();
        checkWin();
    }
    //congrats box
        let badname = document.getElementById('badname');
        let congratbox = document.createElement('div');
        congratbox.setAttribute('id', 'congrats');
        let congratmessage = document.createElement('p');
        congratbox.appendChild(congratmessage);
        let congratbutton = document.createElement('button');
        congratbutton.textContent= "Yay!";
        congratbox.appendChild(congratbutton);
        badname.after(congratbox);
    //event listener for congratbutton
    congratbutton.addEventListener('click', ()=>{
        congratbox.style.display = "none";
    });

    //check if win
    let checkWin = function(){
        let a = gameBoard.boardArray;
        // check name of winner
        let xname;
        let oname;
        let winname;
        if(typeof(game.playerxVal)=='string'){
            xname= game.playerxVal;
        }
        else{
            xname= 'X';
        }
        if(typeof(game.playeroVal)=='string'){
            oname= game.playeroVal;
        }
        else{
            oname= 'O';
        }
        function checkWinName(value){
            if(value=='X'){
                winname= xname;
            }
            else{
                winname= oname;
            }
            congratbox.style.display='flex';
        }
        if(a[0]==a[1]&& a[0]==a[2] && typeof(a[0])=='string'){
            checkWinName(a[0]);
            congratmessage.textContent= winname+ " won!"
        }
        else if(a[0]==a[3]&& a[3]==a[6] && typeof(a[0])=='string'){
            checkWinName(a[0]);
            congratmessage.textContent= winname+ " won!"

        }
        else if(a[0]==a[4]&& a[4]==a[8] && typeof(a[0])=='string'){
            checkWinName(a[0]);
            congratmessage.textContent= winname+ " won!"

        }
        //
        else if(a[4]==a[3]&& a[3]==a[5] && typeof(a[4])=='string'){
            checkWinName(a[4]);
            congratmessage.textContent= winname+ " won!"

        }
        else if(a[4]==a[1]&& a[1]==a[7] && typeof(a[4])=='string'){
            checkWinName(a[4]);
            congratmessage.textContent= winname+ " won!"

        }
        else if(a[4]==a[2]&& a[2]==a[6] && typeof(a[4])=='string'){
            checkWinName(a[4]);
            congratmessage.textContent= winname+ " won!"

        }
        //
        else if(a[8]==a[6]&& a[6]==a[7] && typeof(a[8])=='string'){
            checkWinName(a[8]);
            congratmessage.textContent= winname+ " won!"

        }
        else if(a[8]==a[2]&& a[2]==a[5] && typeof(a[8])=='string'){
            checkWinName(a[8]);
            congratmessage.textContent= winname+ " won!"

        }
        else if(a.every(e=>{return typeof(e)=='string'})){
            congratmessage.textContent= "It's a tie!"

        }
    }
    return{displayCurrentBoard, afterclicker}
})()

let game = (function(){
    //restart
    let restartbutton = document.getElementById('restart');
    let congratsbox =document.getElementById('congrats');
    let restart = function(){
        for(i=1;i<=gameBoard.boardArray.length;i++){
            gameBoard.alterBoard(i, undefined);
            congratsbox.style.display='none';
            displayController.afterclicker(e='0', restart=true);
        }
        displayController.displayCurrentBoard();
    }
    restartbutton.addEventListener('click', restart);

    //players
    //fill in names, click button(to be created), hide form until restart, send value to wincheck
    let playerx = document.getElementById('player1');
    let playero = document.getElementById('player2');
    let playerxVal= document.getElementById('player1').value;
    let playeroVal= document.getElementById('player2').value; 
    //update name eventlisteners
    playerx.addEventListener('input', ()=>{playerxVal = document.getElementById('player1').value; console.log(playerxVal)});
    playero.addEventListener('input', ()=>{playeroVal = document.getElementById('player2').value; console.log(playeroVal)});

    return{restart,
            playerxVal,
            playeroVal
        }
})();