const saveButton = document.querySelector('.save-button');
const saveAlert = document.querySelector('.save-alert');
let hasSavedRecently = false;

const saveAlertFadeDuration = .75;

saveButton.addEventListener("click", function() {
    saveCode();
});

function saveCode() {
    rawSave()
    hasSavedRecently = true;
    showSaveAlert();
}

function rawSave(){
    let code = getCodeFromEditor();
    let user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+projectId+"/code").set(code);
    if(hasLesson) {
        database.ref("userdata/" + user.uid + "/projects/" + projectId + "/currentStep").set(highestViewedStepCount);
    }
    database.ref("userdata/"+user.uid+"/projects/"+projectId+"/currentChapter").set(chapterNum);
}

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

window.addEventListener("beforeunload", function (e) {
    rawSave();
});