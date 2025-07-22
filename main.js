// === target all elements to save to constants ===
// navigation buttons
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");

// menu buttons
const m_page1btn = document.querySelector("#menu_page1btn");
const m_page2btn = document.querySelector("#menu_page2btn");
const m_page3btn = document.querySelector("#menu_page3btn");
const m_page4btn = document.querySelector("#menu_page4btn");
const m_page5btn = document.querySelector("#menu_page5btn");

// cards 
const card_1 = document.querySelector("#card-1");
const card_2 = document.querySelector("#card-2");
const card_3 = document.querySelector("#card-3");

// guessing game
const game_1 = document.querySelector("#guessing-game");
const game_1_StartButton = document.querySelector("#guessing-game-startButton");
const game_1_StartMenu = document.querySelector("#guessing-game .startUI");
const game_1_GameMenu = document.querySelector("#guessing-game .gameUI");
const game_1_CheckButton = document.querySelector("#guessing-game-checkButton");
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
var allpages = document.querySelectorAll(".page");
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
    footer.style.display = "none"; //remove footer
}

// Function to show selected page no
function show(pgno) {
    hideall();

    let onepage = document.querySelector("#subtopic" + pgno);
    onepage.style.display = "block"; //show the page

    footer.style.display = "block"; //show the footer

    if (pgno == 5) { //show guessing game on "development" page
        game_1.style.display = "block";
        endGuessingGame();
    }
    else {
        game_1.style.display = "none";
    }
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
    if (value == questions[currentQuestionIndex].answer) game_1_score++;

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
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
page5btn.addEventListener("click", function () {
    show(5);
});
m_page1btn.addEventListener("click", function () {
    show(1);
});
m_page2btn.addEventListener("click", function () {
    show(2);
});
m_page3btn.addEventListener("click", function () {
    show(3);
});
m_page4btn.addEventListener("click", function () {
    show(4);
});
m_page5btn.addEventListener("click", function () {
    show(5);
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
game_1_StartButton.addEventListener("click", function () {
    startGuessingGame();
});
game_1_CheckButton.addEventListener("click", function () {
    checkAnswer()
});