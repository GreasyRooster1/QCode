const buttonContainer = document.querySelector(".lesson-creator-new-button-container");
let newStepButton = null;
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