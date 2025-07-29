// === target all elements to save to constants ===

// page contents
const pageContent_1 = document.querySelector("#subtopic1-content");
const pageContent_2 = document.querySelector("#subtopic2-content");
const pageContent_3 = document.querySelector("#subtopic3-content");
const pageContent_4 = document.querySelector("#subtopic4-content");
const pageContent_5 = document.querySelector("#subtopic5-content");

// cards 
const card_1 = document.querySelector("#card-1");
const card_2 = document.querySelector("#card-2");
const card_3 = document.querySelector("#card-3");

// guessing game
const game_1 = document.querySelector("#guessing-game");
const game_1_StartMenu = document.querySelector("#guessing-game .startUI");
const game_1_GameMenu = document.querySelector("#guessing-game .gameUI");

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
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Menu"; //change button text open menu
    }
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

    currentQuestionIndex = questionIndex;
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

function checkAnswer() {

    let value = document.querySelector("input[name='mcq']:checked").value;
    if (value == questions[currentQuestionIndex].answer) {
        game_1_score++;
        correctAudio.play();
    }
    else {
        wrongAudio.play();
    }

    // Set new question
    setUpQuestion();
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

// ===== INIT FUNCTION WHEN RUNNING THE WEBSITE AT THE START ===== 
function Init() {

    // Initial Set up
    hideall();
    toggleHeader();

    // Ongoing functions

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

    //
    switch (button) {
        case "guessing-game-startButton":
            startGuessingGame();
            break;

        case "guessing-game-checkButton":
            checkAnswer();
            break;
    }
});

card_1.addEventListener("click", function () {
    showCard(1);
});
card_2.addEventListener("click", function () {
    showCard(2);
});
card_3.addEventListener("click", function () {
    showCard(3);
});
