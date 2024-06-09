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
    createMetaButton();
    createMetaEditPane();

    createLessonCreatorChapterStep();
}

function createLessonCreatorChapterStep(){
    let content = "edit this steps head to set this chapters name"
    if(createdLessonChapters.length>0) {
        content = getChapterStepContent(createdLessonChapters)
    }
    chapterStep = createStep("[Lesson Name]",content,"none","chapters",0);
}