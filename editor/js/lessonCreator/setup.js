const buttonContainer = document.querySelector(".lesson-creator-new-button-container");

function setupLessonCreator(){
    setupPanes(true);
    createStep("demo step head","demo step content","https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/missing.png?raw=true","info","-1");

    createNewStepButton();
}

function createNewStepButton(){
    let buttonEl = document.createElement("div")
    buttonEl.innerHTML = "New Step";
    buttonContainer.appendChild(buttonEl);
}