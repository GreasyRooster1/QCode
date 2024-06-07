let addedSteps = []
let currentStep = 0;

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

    let head = stepEl.querySelector(".step-head-content");
    let textContent = stepEl.querySelector(".step-text-content");
    let type = stepEl.querySelector(".type-display");

    head.setAttribute("contenteditable","true");
    head.addEventListener("keypress",escapeOnEnter);

    type.addEventListener("click", swapTypes);

    textContent.setAttribute("contenteditable","true");
}

function swapTypes(e){
    let stepEl = e.target.closest(".step")
    let currentType = stepEl.getAttribute("type");
    let nextType;
    if(stepTypes.indexOf(currentType)>=stepTypes.length-1){
        nextType=stepTypes[0]
    }else {
        nextType = stepTypes[stepTypes.indexOf(currentType) + 1];
    }
    stepEl.setAttribute("type",nextType);
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