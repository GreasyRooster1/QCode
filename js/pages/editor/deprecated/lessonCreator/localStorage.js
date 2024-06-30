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
    createdLessonChapters = JSON.parse(localStorage.getItem(lessonDataStorageLocation));
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