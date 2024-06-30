let currentStep = 0;
let newStepButton = null;

function createAddStepButton(){
    newStepButton = document.createElement("div")
    newStepButton.innerHTML = "New Step";

    newStepButton.classList.add("add-step-button");
    newStepButton.classList.add("lesson-creator-button");

    newStepButton.addEventListener("click",addStepClick);

    buttonContainer.appendChild(newStepButton);
}

function createDefaultEditableStep(count){
    let stepData = defaultStep;
    stepData.count = count;
    createEditableStep(stepData);
}

function createEditableStep(data){
    let stepEl = createStepFromObj(data);

    let head = stepEl.querySelector(".step-head-content");
    let textContent = stepEl.querySelector(".step-text-content");
    let type = stepEl.querySelector(".type-display");
    let image = stepEl.querySelector(".step-image");


    head.setAttribute("contenteditable","true");
    head.addEventListener("keypress",escapeOnEnter);

    type.addEventListener("click", swapTypes);

    image.addEventListener("click", changeImage);

    textContent.setAttribute("contenteditable","true");
}

function createEditableStepFromData(head,content,image,type,count){
    createEditableStep({head:head,content:content,image:image,type:type,count:count});
}

function swapTypes(e){
    e.preventDefault()
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

function changeImage(e){
    let stepEl = e.target.closest(".step")
    stepEl.setAttribute("image", prompt("Enter image link"));
}

function escapeOnEnter(e){
    if(e.key==="Enter"){
        e.preventDefault();
        e.target.blur();
    }
}

function addStepClick(){
    currentStep++;
    let bufferSpace = document.querySelector(".buffer")
    if (bufferSpace!==null) {
        bufferSpace.remove();
    }
    createDefaultEditableStep(currentStep);
    createBufferSpace();
}