let scoreAqua = 0;
let scorePlayer = 0;
let timeOut = "";

let aqua = document.getElementById("chibi-aqua");

let splashScreen = document.getElementsByClassName("splash")[0];
let startGame = document.getElementsByClassName("start")[0];
let displayScoreAqua = document.getElementsByClassName("score-aqua")[0];
let displayScorePlayer = document.getElementsByClassName("score-player")[0];

let reset = document.getElementById("reset");
let rock = document.getElementById("rock");
let scissors = document.getElementById("scissors");
let paper = document.getElementById("paper");


if(localStorage.getItem("scoreAqua")){
    scoreAqua = localStorage.getItem("scoreAqua");
    displayScoreAqua.innerHTML = scoreAqua;
}

if(localStorage.getItem("scorePlayer")){
    scorePlayer = localStorage.getItem("scorePlayer");
    displayScorePlayer.innerHTML = scorePlayer;
}

startGame.addEventListener("click",()=>{
    splashScreen.style.top = "-120vh";
    splashScreen.style.transition = ".75s";
})

rock.addEventListener("click", ()=>{
    janken(0);
});

scissors.addEventListener("click", ()=>{
    janken(1);
});

paper.addEventListener("click", ()=>{
    janken(2);
});

reset.addEventListener("click", ()=>{
    if(confirm("Cette action va redémarrer le jeu, êtes-vous sûr ?")){
        scoreAqua = 0;
        scorePlayer = 0;
        displayScoreAqua.innerHTML = scoreAqua;
        displayScorePlayer.innerHTML = scorePlayer;
        localStorage.clear();
    }
})

function janken(hand){
    let jariaqua = Math.floor(Math.random()*3);

    switch(jariaqua){
        case 0:
            aqua.style.backgroundImage = "url('img/aqua-rock.png')";
            break;
        case 1:
            aqua.style.backgroundImage = "url('img/aqua-scissors.png')";
            break;
        default:
            aqua.style.backgroundImage = "url('img/aqua-paper.png')";
            break;
    }

    aqua.classList.remove("shake");

    switch(hand){
        case 0:
            if(jariaqua == 0){
                result("nul");
            }else if(jariaqua == 1){
                result("player");
            }else{
                result("aqua");
            }
            break;
        case 1:
            if(jariaqua == 0){
                result("aqua");
            }else if(jariaqua == 1){
                result("nul");
            }else{
                result("player");
            }
            break;
        default:
            if(jariaqua == 0){
                result("player");
            }else if(jariaqua == 1){
                result("aqua");
            }else{
                result("nul");
            }
            break;
    }
}

function result(who){
    clearTimeout(timeOut);
    switch(who){
        case "aqua":
            scoreAqua++;
            localStorage.setItem("scoreAqua", scoreAqua);
            displayScoreAqua.innerHTML = scoreAqua;
            console.log("Aqua gagne");
            break;
        case "player":
            scorePlayer++;
            localStorage.setItem("scorePlayer", scorePlayer);
            displayScorePlayer.innerHTML = scorePlayer;
            console.log("Vous gagnez");
            break;
        default:
            console.log("Match nul");
            break;
        
    }

    timeOut = setTimeout(()=>{
        aqua.style.removeProperty("background-image");
        aqua.classList.add("shake");
    },3000);
}
