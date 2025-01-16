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
    createChapterButton();
    createSaveButton();
    createLoadButton();
    createMetaButton();
    createMetaEditPane();
    createAutoSaveButton();

    createLessonCreatorChapterStep();
}

function createLessonCreatorChapterStep(){
    let content = "edit head to set chapter name"
    if(createdLessonChapters.length>0) {
        content = getChapterStepContentNoLink(createdLessonChapters)
    }
    chapterStep = createStep("[Lesson Name]",content,"none","chapters",0);
    chapterStep.querySelector(".step:first-child .step-head-content").setAttribute("contenteditable","true")
}