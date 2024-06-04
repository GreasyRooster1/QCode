const saveButton = document.querySelector('.save-button');
const saveAlert = document.querySelector('.save-alert');

const saveAlertFadeDuration = .75;

saveButton.addEventListener("click", function() {
    saveCode();
});

function saveCode() {
    let code = getCodeFromEditor();
    let user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+projectId+"/code").set(code);
    showSaveAlert();
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