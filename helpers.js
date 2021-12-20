
M.AutoInit();

const questions = [
    "How many differences are there between the two pictures?",
    "What is ((2*3) + 565 / 5 - 2 + (2*6)) - 2. It's definitely not 129 :)",
    "What's an array plus an array? ([] + [])?",
    "To pass the next stage, you must gather 20 points! (my clickbait)"
];
const answers = [
    [5, "5", "viis", "five"],
    ["127", 127],
    ["", "tühi string", "''", '""'],
    [true]
]

let gameStart = false;
let currentStep = 0;

const gridSize = {
    x: 10,
    y: 10
};

let grid2d = new Array(gridSize.y).fill().map( function() {
    return new Array(gridSize.x).fill(0);
});

const canvas = document.getElementById('aare');

function notify(msg, cls="") {
    M.toast({
        html: msg,
        classes: 'rounded lighten-3 ' + cls
    })
};

function clearCanvas() {
    canvas.getContext('2d').clearRect(
        0, 0, canvas.width, canvas.height
    );
};
function get2DContext(width = 300, height=150) {
    return Object.assign(
      document.getElementById('aare'),
      {width, height}
    ).getContext('2d');
}
function loadImage(url) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = e => res(img);
      img.onerror = rej;
    });
}
function paintCanvas() {
    const can = document.getElementById('aare');
    const ctx = can.getContext('2d');
    ctx.fillStyle = "black"; //canvas background
    ctx.fillRect(0, 0, can.width, can.height); //clear the can before drawing on it
    
    for (var y in grid2d) {
        for (var x in grid2d[y]) {
            if ( grid2d[y][x] == 0 ) {
                ctx.fillStyle = 'black' }
            else {
                ctx.fillStyle = 'red' }
                
            ctx.strokeStyle = 'grey'
            ctx.fillRect(
                x * can.width / gridSize.x,
                y * can.height / gridSize.y,
                can.width / gridSize.x,
                can.height / gridSize.y
            );
            ctx.rect(
                x * can.width / gridSize.x,
                y * can.height / gridSize.y,
                can.width / gridSize.x,
                can.height / gridSize.y
            );
            ctx.stroke();
        }
    }
};

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / (canvas.width /gridSize.x));
    const y = Math.floor((event.clientY - rect.top) / (canvas.height /gridSize.y));
    console.log("x: " + x + " y: " + y);
    return {x, y}
}

function checkIfSquareClicked(event) {
    const curCanvas = document.getElementById('aare');
    const {x, y} = getCursorPosition(curCanvas, event)
    // console.log(x, y);
    let newGrid = [...grid2d];
    newGrid[y][x] = 1;
    paintCanvas();
    if ( isGridCorrect() ) console.log('FUCK YEA')
}

function setStep(step) {
    return currentStep = step;
};
function nextStep() {
    return currentStep = currentStep +1;
};
function setProgress() {
    const protsess = (currentStep / questions.length) * 100;
    return $('#progress_bar').width( protsess + "%" );
};

function setQuestion() {
    clearCanvas();
    const parent = $('#canvasWrap');
    Object.assign(
        canvas,
        { width:parent.width(), height:parent.height() }
    );
    
    if (currentStep === 0 ) {
        getImg();
        $('canvas').css('width', '100%')
    } else if (currentStep === 3) {
        canvas.addEventListener("click", checkIfSquareClicked );
        paintCanvas();
    } else {
        const ct = canvas.getContext('2d');
        ct.font = "24px Arial";
        ct.fillText( questions[currentStep] , 0, canvas.height/2 )
    }
    $('#question').text( questions[currentStep] );
    return
};


const isAnswerCorrect = (inputElem) => {
    return answers[currentStep].includes(
        inputElem.val()
    );
};

const sBtn = $("#startBtn");
const hideElems = $(".hide-after-start");


const startGame = () => {
    if (gameStart) {
        setStep(0);
    } else {
        setStep(0);
    }
    gameStart = true;
    const elems = $('.hidden');
    elems.removeClass('hidden');
    elems.addClass('disply-hidden');
    hideElems.hide();
    setProgress();
    return setQuestion();
};

function setFinish() {
    setProgress(questions.length);
    $('.fin').removeClass('fin');
    $('.disply-hidden').css('display', 'none');
    document.getElementById('restart_game').addEventListener('click', function() {
        location.reload();
    });
}

function rndImg(min=0, max=2) { // min and max included 
    const someFurls = ['/puud.webp', '/hobene.webp', '/vesi.webp']
    const idx = Math.floor(Math.random() * (max - min + 1) + min)
    return someFurls[idx];
}

const getImg = async () => {
    const imgUrl = rndImg();
    let img = await loadImage(imgUrl);
    if(typeof window.createImageBitmap === 'function') {
      img = await createImageBitmap(img);
    }
    const ctx = get2DContext(img.width, img.height);
    // const ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0);
    return 'done'
};

const handleNextQuestion = () => {
    const inputElem = $('#answer');
    if ( isAnswerCorrect(inputElem) ) {
        if (currentStep === 0 ) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        notify( 'CORRETCTY!' , "green");
        nextStep();
        setProgress();
        get2DContext()
        setQuestion();
        inputElem.val('');
        
    }  else {
        inputElem.focus();
        notify( 'WRONNGII!' , "red");
    };
};

const isGridCorrect = () => {
    if (
        grid2d[4][0] == 1 &&
        grid2d[4][1] == 1 &&
        grid2d[6][1] == 1 &&
        grid2d[6][8] == 1
    ) return setFinish();
    else return false;
}