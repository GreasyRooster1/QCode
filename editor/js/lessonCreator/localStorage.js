const localStorageLocation = "lessonCreatorAutoSave";
const autoSaveToLocalStorageMinutes = 3;

let lessonCreatorAutoSaveButton = null;

function autoSaveToLocalStorage(){
    saveChapter(currentChapter);
    setAutoSaveData(createdLessonChapters);
}

function loadAutoSave(){
    createdLessonChapters = getAutoSaveData();
    loadCreatedChapter(currentChapter);
}

function getAutoSaveData(){
    return JSON.parse(localStorage.getItem(localStorageLocation));
}

function setAutoSaveData(data){
    return localStorage.setItem(localStorageLocation,JSON.stringify(data))
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