
const questions = [
    "What is the object that is different between the two pictures?",
    "What is (2*3) + 565 / 5 - 2 + (2*6). It's definitely not 129 :)",
    "What's an array plus an array? ([] + [])?",
    "To pass the next stage, you must gather 20 points! (my clickbait)"
];
const answers = [
    ["tere", ""],
    ["129", 129],
    ["", "tühi string", "''", '""'],
    [true]
]

let currentQuestion = "";
let gameStart = false;

const canvas = document.getElementById('aare');
