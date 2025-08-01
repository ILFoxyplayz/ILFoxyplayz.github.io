// === target all elements to save to constants ===

// page contents
const pageContent_1 = document.querySelector("#subtopic1-content");
const pageContent_2 = document.querySelector("#subtopic2-content");
const pageContent_3 = document.querySelector("#subtopic3-content");
const pageContent_4 = document.querySelector("#subtopic4-content");
const pageContent_5 = document.querySelector("#subtopic5-content");

// cards 
const card_container1 = document.querySelector("#subtopic2 .card-container");
const card_1 = document.querySelector("#card-1");
const card_2 = document.querySelector("#card-2");
const card_3 = document.querySelector("#card-3");

// guessing game
const game_1 = document.querySelector("#guessing-game");
const game_1_StartMenu = document.querySelector("#guessing-game .startUI");
const game_1_GameMenu = document.querySelector("#guessing-game .gameUI");
const game_1_CheckButton = document.querySelector("#guessing-game-checkButton");

// mini-game 
const game_2 = document.querySelector("#mini-game");
const game_2_StartMenu = document.querySelector("#mini-game .startUI");
const game_2_GameMenu = document.querySelector("#mini-game .gameUI");

// guessing game audio
const correctAudio = new Audio("audio/correct.mp3");
const wrongAudio = new Audio("audio/error.mp3");

// guessing game logic variables
let currentQuestionIndex = -1;
let usedQuestionIndex = [];
let maxQuestions = 5;
let game_1_score = 0;
var questions = [
    {
        question: "What is the primary function of a vacuum cleaner?",
        option_1: "To mop the floor",
        option_2: "To spray air",
        option_3: "To suck up dirt and dust",
        option_4: "To polish furniture",
        answer: 3
    },
    {
        question: "Who invented one of the first manual vacuum cleaning devices in 1860?",
        option_1: "Hubert Cecil Booth",
        option_2: "Ives W. McGaffey",
        option_3: "James Dyson",
        option_4: "Daniel Hess",
        answer: 2
    },
    {
        question: "What was the name of the hand-powered vacuum cleaner created by Ives W. McGaffey?",
        option_1: "Whirlwind",
        option_2: "Cyclone",
        option_3: "Dust Devil",
        option_4: "Suction Master",
        answer: 1
    },
    {
        question: "Which company was founded after James Murray Spangler sold his vacuum design?",
        option_1: "Dyson",
        option_2: "Electrolux",
        option_3: "Bissell",
        option_4: "Hoover",
        answer: 4
    },
    {
        question: "What is a major health benefit of using vacuum cleaners in the home?",
        option_1: "It freshens paint",
        option_2: "It moisturizes air",
        option_3: "It reduces allergens and dust mites",
        option_4: "It prevents mold growth",
        answer: 3
    },
    {
        question: "Which of the following is an example of a robotic vacuum brand?",
        option_1: "iRobot Roomba",
        option_2: "Shark Rotator",
        option_3: "Bissell Featherweight",
        option_4: "Miele Classic",
        answer: 1
    },
    {
        question: "What technology did James Dyson popularize in the 1990s?",
        option_1: "Steam cleaning",
        option_2: "Cyclonic separation",
        option_3: "Air freshening vacuums",
        option_4: "HEPA filters",
        answer: 2
    },
    {
        question: "Which of the following is NOT a type of vacuum cleaner?",
        option_1: "Upright",
        option_2: "Canister",
        option_3: "Rotary phone",
        option_4: "Handheld",
        answer: 3
    }
];

// === mini game logic variables ===
let backgroundMinHeight = 0;
let backgroundMaxHeight = 300;
let isMiniGameStart = false;
let playerPos = 0;
let playerMoveSpeed = 10;
let dirtMoveSpeed = 2;
let dirtSpawnDist = 550;
let platformHeight = 70;
let platformWidth = 10;
let game_2_lives = 3;
let game_2_score = 0;
let playedBefore = false;
let activeIntervals = [];
let activeDivs = [];

// timed events var
let playerUpdateInterval = null;
let dirtSpawnInterval = null;
let displayUpdateInterval = null;
let collisionUpdateInterval = null;

// structure
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
const menu = document.querySelector("#menu");
var allpages = document.querySelectorAll(".page");
var allpageContent = document.querySelectorAll(".page-content")
var allcards = document.querySelectorAll(".card");
var allgames = document.querySelectorAll(".game");

// others
const menuItemsList = document.querySelector("#menuItems")
const hamBtn = document.querySelector("#hamIcon")

// Function to hide all pages
function hideall() {
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
    for (let onecard of allcards) { //go through all cards
        onecard.classList.remove("cardShow");
    }
    for (let onegame of allgames) { //go through all games
        onegame.style.display = "none";
    }
    for (let onepageContent of allpageContent) { //restart all sliding animations
        onepageContent.classList.remove("pageSlideIn");
    }
    footer.style.display = "none"; //remove footer

}

let currentNo = 0;
// Function to show selected page no
function show(pgno) {

    // if the page is the same, don't do anything
    if (pgno == currentNo) return;
    currentNo = pgno;
    hideall();

    let onepage = document.querySelector("#subtopic" + pgno);
    onepage.style.display = "block"; //show the page
    slideContent(pgno);

    footer.style.display = "block"; //show the footer

    if (pgno == 5) { //show guessing game on "development" page
        game_1.style.display = "block";
        endGuessingGame();
    }
    else {
        game_1.style.display = "none";
    }

    // show mini game on every page 
    game_2.style.display = "block";
    endMiniGame();
}

// Function to apply the slide effect when transitioning between pages
function slideContent(pgno) {

    // get the content to slide
    let pageContent = document.querySelector('#subtopic' + pgno + "-content");

    // apply the class
    pageContent.classList.add("pageSlideIn");
}

//open and close nav menu when viewport width < 800px
function toggleMenus() {
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    hamBtn.classList.toggle("spriteOpen");
}

//opening and closing header logic
function toggleHeader() {
    if (window.scrollY < 600) {
        header.classList.add("headerHide");
    }
    else {
        header.classList.remove("headerHide");
    }
}

//toggling card logic
function showCard(cardNo) {
    let cardTemp = document.querySelector("#card-" + cardNo);
    if (cardTemp.classList.contains("cardShow")) {
        cardTemp.classList.remove("cardShow");
    }
    else {
        cardTemp.classList.add("cardShow");
    }
}

// Function to start guessing game
function startGuessingGame() {
    game_1_StartMenu.style.opacity = "0";
    game_1_StartMenu.style.zIndex = "-1";

    game_1_GameMenu.style.opacity = "1";
    game_1_GameMenu.style.zIndex = "1";

    // Init the question
    game_1_score = 0;
    setUpQuestion();
}

// Function to set up question
function setUpQuestion() {
    let gameQuestion = document.querySelector("#question");

    // randomise the next question
    questionIndex = randomiseQuestion();
    if (questionIndex === -1) {
        endGuessingGame();
        return; //end game if index less than 0;
    }

    // set the question
    gameQuestion.innerHTML = questions[questionIndex].question;

    for (let i = 0; i < 4; i++) {
        // Set the options to the question
        let optionElement = document.querySelector("#label" + (i + 1));
        let optionKey = "option_" + (i + 1);
        optionElement.innerHTML = questions[questionIndex][optionKey];

        // Reset the checked property
        let inputElement = document.querySelector("#option" + (i + 1));
        inputElement.checked = false;
    }

    // reset the check button and the options
    resetQuestions();

    currentQuestionIndex = questionIndex;
}

// Function to reset display of buttons and questions
function resetQuestions() {

    // reset the check button
    game_1_CheckButton.classList.remove("continue");
    game_1_CheckButton.innerHTML = "Select!";

    // reset the options
    for (let i = 0; i < 4; i++) {
        let optionElement = document.querySelector("#label" + (i + 1));
        optionElement.style.color = "white";
        optionElement.style.opacity = "1";
    }
}

// Function to randomise questions
function randomiseQuestion() {
    // Check if number of used questions exceed limit, means game end
    if (usedQuestionIndex.length >= maxQuestions) {
        return -1;
    }

    // keep resetting the index to return if the generated index is already used
    let index;
    do {
        index = Math.floor(Math.random() * questions.length);
    } while (usedQuestionIndex.includes(index));

    // push into the array before returning
    usedQuestionIndex.push(index);
    return index;
}

// function to check asnwer upon button press
function checkAnswer() {

    let value = document.querySelector("input[name='mcq']:checked").value;
    let correctValue = questions[currentQuestionIndex].answer;

    if (value == correctValue) {
        game_1_score++;
        correctAudio.play();
    }
    else {
        wrongAudio.play();
    }

    // display correct answers
    displayAnswers(correctValue);
}

// function to display answers upon the button press
function displayAnswers(correctAnswer) {

    // check through each element and highlight the correct one
    for (let i = 0; i < 4; i++) {

        // get each option elements
        let inputElement = document.querySelector("#option" + (i + 1));
        let optionElement = document.querySelector("#label" + (i + 1));

        if (inputElement.value == correctAnswer) {
            optionElement.style.color = "lightgreen";
        }
        else {
            optionElement.style.opacity = "0.5";
        }
    }

    // change the select button to next button to signal for when to move on to the next question
    game_1_CheckButton.classList.add("continue");
    game_1_CheckButton.innerHTML = "Continue";
}

// Function to end guessing game
function endGuessingGame() {
    game_1_StartMenu.style.opacity = "1";
    game_1_StartMenu.style.zIndex = "1";

    game_1_GameMenu.style.opacity = "0";
    game_1_GameMenu.style.zIndex = "-1";

    let scoreMessage = document.querySelector("#guessing-game-message");
    if (usedQuestionIndex.length > 0) {
        // display the score
        scoreMessage.innerHTML = `Your score is: ${game_1_score}/5`;
    }
    else {
        // display regular message
        scoreMessage.innerHTML = "Test your knowledge on vacuum cleaners!";
    }

    // reset the array
    usedQuestionIndex = [];
}

// function to start minigame
function startMiniGame() {
    game_2_StartMenu.style.opacity = "0";
    game_2_StartMenu.style.zIndex = "-1";

    game_2_GameMenu.style.opacity = "1";
    game_2_GameMenu.style.zIndex = "1";

    // reset game vars
    game_2_lives = 3;
    game_2_score = 0;

    // display game vars
    displayUpdateInterval = setInterval(updateDisplay, 200);

    // start game
    isMiniGameStart = true;
    if (!playedBefore) playedBefore = true
    setMiniGame();
}

// function to set the timed events
function setMiniGame() {
    let player = document.querySelector("#player");

    // Update moving function for player
    playerUpdateInterval = setInterval(function () {
        playerPos = Math.max(backgroundMinHeight, Math.min(playerPos, backgroundMaxHeight - 70));
        player.style.top = playerPos + "px";
    }, 10);
    // Set time delay for spawning of dirt
    setTimeout(spawnDirt, 5000);
}

// function to create the dirt stuff
function spawnDirt() {
    dirtSpawnInterval = setInterval(function () {

        // container for the dirt div
        let dirt = null;
        let dirtType = null;

        // randomise index for different types of dirt
        let index = GetRandom(0, 1);

        // spawn dirt type
        switch (index) {
            case 0:
                dirtType = "dirt";
                break;
            case 1:
                dirtType = "bigDirt";
                break;
        }

        dirt = createDirt(dirtType);

        // update movement for each type of dirt
        let dirtPos = dirtSpawnDist;

        let moveInterval = setInterval(function () {
            dirtPos -= dirtMoveSpeed;
            dirt.style.left = dirtPos + "px";
            updateCollision(dirt, dirtType, moveInterval);

            // check if this dirt div reaches threshold
            if (dirtPos < -50) {
                game_2_lives--;
                destroyDirt(dirt, moveInterval);
            }

        }, 10);

        // push into array to delete when player dies/leaves current page
        activeIntervals.push(moveInterval);
        activeDivs.push(dirt);

    }, 3000);
}

function GetRandom(min, max) {
    //this will select a number between min and max
    return Math.round(Math.random() * (max - min)) + min;
}

function createDirt(dirtType) {
    let background = document.querySelector("#background");

    // create dirt div
    let dirtDiv = document.createElement("div");

    // set id of dirt
    dirtDiv.classList.add(dirtType);

    // constrain spawn width
    let minSpawn = backgroundMinHeight;
    let maxSpawn = backgroundMaxHeight;

    if (dirtType === "dirt") {
        minSpawn += 30;
        maxSpawn -= 30;
    }
    else if (dirtType === "bigDirt") {
        minSpawn += 60;
        maxSpawn -= 60;
    }

    // randomise y pos of dirt
    dirtDiv.style.top = GetRandom(minSpawn, maxSpawn) + "px";

    // set it into background
    background.appendChild(dirtDiv);

    return dirtDiv;
}

function destroyDirt(dirtDiv, interval) {
    dirtDiv.remove();
    clearInterval(interval);
}

// function to move the player
function MovePlayer(moveDir) {
    playerPos -= moveDir * playerMoveSpeed;
}

// function to update display for score and lives
function updateDisplay() {
    let scoreDisplay = document.querySelector("#game-score");
    scoreDisplay.innerHTML = `Score: ${game_2_score}`;
    let livesDisplay = document.querySelector("#game-lives");
    livesDisplay.innerHTML = `Lives: ${game_2_lives}`;

    // check if lives <= 0. End game if it is
    if (game_2_lives <= 0) endMiniGame();
}

// function for collision between platform and circle;
function updateCollision(dirtDiv, dirtType, dirtInterval) {
    // player's boundaries
    let minLeft = 0;
    let maxLeft = 0 + 10;
    let minTop = playerPos;
    let maxTop = playerPos + 70;

    console.log(minLeft, maxLeft, minTop, maxTop);

    let radius = 0;
    // dirt circle's boundaries
    if (dirtType === "dirt") {
        radius = 15;
    }
    else if (dirtType === "bigDirt") {
        radius = 30;
    }
    let circleLeft = parseFloat(dirtDiv.style.left) + radius;
    let circleTop = parseFloat(dirtDiv.style.top) + radius;

    console.log(radius, circleLeft, circleTop);

    // check boundaries
    // horizontal collsion check
    let horizontalCollision = ((circleLeft - radius) <= maxLeft) && ((circleLeft + radius) >= minLeft);
    // vertical collision check
    let verticalCollision = ((circleTop - radius) <= maxTop) && ((circleTop + radius) >= minTop);

    // collision resolution
    if (horizontalCollision && verticalCollision) {
        game_2_score++;
        destroyDirt(dirtDiv, dirtInterval);
    }
}

// function to destroy the timed events
function destroyMiniGame() {

    // clear out any active timed events
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];

    // clear out any divs
    activeDivs.forEach(deleteDiv);
    activeDivs = [];

    clearInterval(playerUpdateInterval);
    clearInterval(dirtSpawnInterval);
    clearInterval(displayUpdateInterval);
}

function deleteDiv(div) {
    div.remove();
}

// function to end minigame
function endMiniGame() {
    game_2_StartMenu.style.opacity = "1";
    game_2_StartMenu.style.zIndex = "1";

    game_2_GameMenu.style.opacity = "0";
    game_2_GameMenu.style.zIndex = "-1";

    // display final score
    let gameMessage = document.querySelector("#mini-game-message");
    if (playedBefore) gameMessage.innerHTML = `Score: ${game_2_score}`;

    // destroy any intervals
    destroyMiniGame();
    isMiniGameStart = false;
}

// ===== INIT FUNCTION WHEN RUNNING THE WEBSITE AT THE START ===== 
function Init() {

    // Initial Set up
    hideall();
}
Init();

// ===== EVENT LISTENERS ===== 
hamBtn.addEventListener("click", toggleMenus);
addEventListener("scroll", toggleHeader);

// delegate page nav to header
header.addEventListener("click", function (e) {
    let id = e.target.id;

    switch (id) {
        case "page1btn":
            show(1);
            break;
        case "page2btn":
            show(2);
            break;
        case "page3btn":
            show(3);
            break;
        case "page4btn":
            show(4);
            break;
        case "page5btn":
            show(5);
            break;
    }
});

// delegate menu btns to menu
menu.addEventListener("click", function (e) {
    let id = e.target.id;

    switch (id) {
        case "menu_page1btn":
            show(1);
            break;
        case "menu_page2btn":
            show(2);
            break;
        case "menu_page3btn":
            show(3);
            break;
        case "menu_page4btn":
            show(4);
            break;
        case "menu_page5btn":
            show(5);
            break;
    }
})

// delegate quiz btns to guessing game section
game_1.addEventListener("click", function (e) {
    let button = e.target.id;

    switch (button) {
        case "guessing-game-startButton":
            startGuessingGame();
            break;

        case "guessing-game-checkButton":
            if (e.target.classList.contains("continue")) {
                // set up next question when continue in classlist
                setUpQuestion();
            }
            else {
                // check answer when selecting option on a question
                checkAnswer();
            }
            break;
    }
});

game_2.addEventListener("click", function (e) {
    let button = e.target.id;

    switch (button) {
        case "mini-game-startButton":
            startMiniGame();
            break;

        case "mini-game-upInput":
            MovePlayer(1);
            break;

        case "mini-game-downInput":
            MovePlayer(-1);
            break;
    }
})

card_1.addEventListener("click", function () {
    showCard(1);
});
card_2.addEventListener("click", function () {
    showCard(2);
});
card_3.addEventListener("click", function () {
    showCard(3);
});

document.addEventListener('keydown', function (kbEvt) {
    //kbEvt: an event object passed to callback function
    console.log(kbEvt); //see what is returned
    if (kbEvt.code === "KeyS") {
        MovePlayer(-1);
    }
    if (kbEvt.code === "KeyW") {
        MovePlayer(1);
    }
    //Better option: use switch case instead
});
