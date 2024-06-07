let addedSteps = []
let currentStep = 0;

function createAddStepButton(){
    let buttonEl = document.createElement("div")
    buttonEl.innerHTML = "New Step";

    newStepButton = buttonEl;

    newStepButton.addEventListener("click",addStepClick);

    buttonContainer.appendChild(buttonEl);
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