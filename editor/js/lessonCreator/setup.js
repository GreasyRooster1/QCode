const buttonContainer = document.querySelector(".lesson-creator-button-container");
let chapterStep;

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
    createSaveButton();
    createMetaButton();
    createMetaEditPane();

    chapterStep = createStep("[Lesson Name]","you dont need to modify this step","none","chapters",0);
}