import {setupDefaultPanes} from "../panes.js";
import {createAddStepButton} from "./edit.js";
import {createdLessonChapters, createSaveButton} from "./save.js";
import {createChapterButton} from "./chapter.js";
import {createLoadButton} from "./load.js";
import {createMetaButton, createMetaEditPane} from "./metadata.js";
import {createAutoSaveButton} from "./localStorage.js";
import {createStep, getChapterStepContentNoLink} from "../utils/loadUtils.js";
import {projectType} from "../load.js";

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
    setupDefaultPanes(true);

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
    chapterStep = createStep("[Chapter Name]",content,"none","chapters",0);
    chapterStep.querySelector(".step:first-child .step-head-content").setAttribute("contenteditable","true")
}

export {createLessonCreatorChapterStep,setupLessonCreator,defaultStep,chapterStep,buttonContainer}