const buttonContainer = document.querySelector(".lesson-creator-new-button-container");
let newStepButton = null;
let addedSteps = []
const defaultStep = {
    head:"head",
    content:"content",
    image:"https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/missing.png?raw=true",
    type:"info",
    count:-1,
}

function setupLessonCreator(){
    setupPanes(true);
    createStepFromObj(defaultStep);

    createNewStepButton();
}
//todo: save steps to lesson
function createEditableStep(){
    createStepFromObj(defaultStep);
}

function createNewStepButton(){
    let buttonEl = document.createElement("div")
    buttonEl.innerHTML = "New Step";
    newStepButton = buttonEl;

    newStepButton.addEventListener("click",function () {
        createStepFromObj(defaultStep);
    })

    buttonContainer.appendChild(buttonEl);
}