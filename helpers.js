
M.AutoInit();

let currentStep = 0;
let players = 0;


function notify(msg, cls="") {
    M.toast({
        html: msg,
        classes: 'rounded lighten-3 ' + cls
    })
};

function setStep(step) {
    return currentStep = step;
};
function nextStep() {
    return currentStep = currentStep +1;
};
function setQuestion() {
    return $('#question').text( questions[currentStep] );
};
function setProgress() {
    const protsess = (currentStep / questions.length) * 100;
    return $('#progress_bar').width( protsess + "%" );
};
const isAnswerCorrect = (inputElem) => {
    return answers[currentStep].includes( inputElem.val() );
    
};

const startGame = () => {
    if (gameStart) {
        setStep(0);
    } else {
        setStep(0);
    }
    gameStart = true;
    const elems = $('.hidden')
    elems.removeClass('hidden');
    elems.addClass('disply-hidden');
    return setQuestion();
};

const handleNextQuestion = () => {
    const inputElem = $('#answer');
    if ( isAnswerCorrect(inputElem) ) {

        notify( 'CORRETCTY!' , "green");
        nextStep();
        setProgress();
        setQuestion();
        inputElem.val('');
        
    }  else {
        inputElem.focus();
        notify( 'WRONNGII!' , "red");
    };
};
