import {projectType} from "./load";

const saveButton = document.querySelector('.save-button');
const saveAlert = document.querySelector('.save-alert');
let hasSavedRecently = false;

const saveAlertFadeDuration = .75;

function showSaveAlert(){
    saveAlert.style.opacity="1";
    let amountPerFrame = (1/saveAlertFadeDuration)/100;
    let fadeOutInterval = setInterval(function(){
        saveAlert.style.opacity=(saveAlert.style.opacity-amountPerFrame).toString();
        if(saveAlert.style.opacity<=0){
            clearInterval(fadeOutInterval);
        }
    },10)
}

function setupAutoSave() {
    window.addEventListener("beforeunload", function (e) {
        projectType.saveCode();
    });
}

function setHasSaved(val){
    hasSavedRecently = val;
}

export {setupAutoSave,hasSavedRecently,setHasSaved,showSaveAlert};