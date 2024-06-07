const buttonContainer = document.querySelector(".lesson-creator-new-button-container");
let newStepButton = null;
let addedSteps = []
let currentStep = 0;

const defaultStep = {
    head:"head",
    content:"content",
    image:"https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/missing.png?raw=true",
    type:"info",
    count:1,
}

function setupLessonCreator(){
    setupPanes(true);

    createAddStepButton();
}

function createAddStepButton(){
    let buttonEl = document.createElement("div")
    buttonEl.innerHTML = "New Step";

    newStepButton = buttonEl;

    newStepButton.addEventListener("click",addStepClick);

    buttonContainer.appendChild(buttonEl);
}

function createEditableStep(count){
    defaultStep.count = count;
    let stepEl = createStepFromObj(defaultStep);
    stepEl.querySelector(".step-head-content").setAttribute("contenteditable","true");
    stepEl.querySelector(".step-head-content").addEventListener("keypress",escapeOnEnter);

    stepEl.querySelector(".step-text-content").setAttribute("contenteditable","true");

}

function escapeOnEnter(e){
    if(e.key==="Enter"){
        e.preventDefault();
        e.target.blur();
    }
}

function addStepClick(){
    currentStep++;
    createEditableStep(currentStep);
}