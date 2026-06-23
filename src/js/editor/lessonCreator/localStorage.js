import {getCodeFromEditor} from "../codeExecution.js";
import {currentChapter, loadCreatedChapter, saveChapter} from "./chapter.js";
import {writeToEditor} from "../utils/loadUtils.js";
import {scrollableSteps} from "../load.js";
import {createdLessonChapters, setCreatedLessonChapters} from "./save.js";
import {buttonContainer, createLessonCreatorChapterStep} from "./setup.js";

const lessonDataStorageLocation = "lessonDataAutoSave";
const codeStorageLocation = "lessonCodeAutoSave";
const autoSaveToLocalStorageMinutes = 3;

let lessonCreatorAutoSaveButton = null;

function autoSaveToLocalStorage(){
    saveChapter(currentChapter);
    setAutoSaveData(createdLessonChapters);
}

function loadAutoSave(){
    scrollableSteps.innerHTML = "";
    setCreatedLessonChapters(JSON.parse(localStorage.getItem(lessonDataStorageLocation)));
    writeToEditor(localStorage.getItem(codeStorageLocation));
    createLessonCreatorChapterStep();
    loadCreatedChapter(currentChapter);
}


function setAutoSaveData(data){
    localStorage.setItem(lessonDataStorageLocation,JSON.stringify(data));
    localStorage.setItem(codeStorageLocation,getCodeFromEditor());
}

function createAutoSaveButton(){
    lessonCreatorAutoSaveButton = document.createElement("div")
    lessonCreatorAutoSaveButton.innerHTML = "Load Auto Save";

    lessonCreatorAutoSaveButton.classList.add("auto-save-lesson-button");
    lessonCreatorAutoSaveButton.classList.add("lesson-creator-button");

    lessonCreatorAutoSaveButton.addEventListener("click",loadAutoSave);

    buttonContainer.appendChild(lessonCreatorAutoSaveButton);
}

setInterval(autoSaveToLocalStorage,autoSaveToLocalStorageMinutes*60_000);

export {createAutoSaveButton,setAutoSaveData,loadAutoSave,autoSaveToLocalStorage};