// selecting all required elements 

const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBox = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonTxt = resultBox.querySelector(".won-txt"),
replyBtn = resultBox.querySelector("button");

window.onload = () => { //once window loaded

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerX button clicked
        playBox.classList.add("show"); //show the play board
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerO button clicked
        playBox.classList.add("show"); //show the play board
        players.setAttribute("class", "players active player");
    }
}
let playerXIcon = "far fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X"; //suppose player will be x
let runBot = true;

//user click function
function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        // if player selects O, we will change the playSign value to O
        element.setAttribute("id", playerSign);

    } else {

        element.innerHTML = `<i class='${playerXIcon}'></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner (); //calling the winner function
    element.style.pointerEvents = "none"; //once user click any box hten it can't be selected again
    playBox.style.pointerEvents = "none";

    let randomdelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomdelayTime);
}

// bot click function
function bot () {
     if (runBot) {
        playerSign = "O";
        let array = [];
     
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
                // console.log(i + "" + "has no children");
            }
        }
        let randomBox = array [Math.floor(Math.random() * array.length)]; 
    
        if (array.length > 0) {
            if (players.classList.contains("player")) {
        
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
                playerSign = "X"
                allBox[randomBox].setAttribute("id", playerSign);
        
            } else {
        
                allBox[randomBox].innerHTML = `<i class='${playerOIcon}'></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner ();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBox.style.pointerEvents = "auto";
        playerSign = "X" //passing the x value
     }
}

// select the winner
function getClass (idname) {
    return document.querySelector(".box" + idname).id;
}

function checkClass (val1, val2, val3, sign) {
    if (getClass (val1) == sign && 
    getClass (val2) == sign && 
    getClass (val3) == sign) {
        return true;
    }
}

function selectWinner () {
    if(
        checkClass(1, 2, 3, playerSign) || 
        checkClass(4, 5, 6, playerSign) || 
        checkClass(7, 8, 9, playerSign) || 
        checkClass(1, 4, 7, playerSign) || 
        checkClass(2, 5, 8, playerSign) || 
        checkClass(3, 6, 9, playerSign) ||
        checkClass(1, 5, 9, playerSign) ||
        checkClass(3, 5, 7, playerSign)
    ) {
        console.log (playerSign + " is the winner")
        //  once user win, stop the bot
        runBot = false;
        bot(runBot);

        // show winner with result box 
        setTimeout(() => {
            playBox.classList.remove("show");
            resultBox.classList.add("add");
        }, 700);

        wonTxt.innerHTML = `Player <p>${playerSign}</p> wins the game!`;
    } else {
        if (getClass(1) != "" && 
        getClass(2) != "" &&
        getClass(3) != "" &&
        getClass(4) != "" &&
        getClass(5) != "" &&
        getClass(6) != "" &&
        getClass(7) != "" &&
        getClass(8) != "" &&
        getClass(9) != "") {
            runBot = false;
            bot(runBot);

            // show winner with result box 
            setTimeout(() => {
                playBox.classList.remove("show");
                resultBox.classList.add("add");
            }, 700);

        wonTxt.textContent = `Match has been drawn!`;
    } else {

    }
    }
}

replyBtn.onclick = () => {
    window.location.reload(); //reload the current page
}