const shareButton = document.querySelector('.share-button');
const popupContainer = document.querySelector('.share-popup-container');
const sharePopupButton = document.querySelector('.share-popup-button');
const closePopupButton = document.querySelector('.close-button');
const shareNameInput = document.querySelector('.share-popup-content .name-input');
const previewIframe = document.getElementById('share-preview-frame');

shareButton.addEventListener('click', (e) => {
    rawSave();
    showPopup();
    runPopupPreviewCode();
});

closePopupButton.addEventListener("click", (e) => {
    hidePopup();
})

sharePopupButton.addEventListener('click', (e) => {
    if(shareNameInput.value === ''){
        shareNameInput.style.border = "5px solid red";
        return;
    }
    let sharedProjectId = getSharedProjectId(projectId,getStoredUser().uid);

    //set metadata
    database.ref("sharedProjects/metadata/"+sharedProjectId).set({
        author:getStoredUser().uid,
        name:shareNameInput.value,
        timestamp:Date.now()/1000,
    }).then(()=> {
        //set projectData
        database.ref("sharedProjects/projectData/" + sharedProjectId).set(getCodeFromEditor());
    })
})

function showPopup(){
    popupContainer.style.opacity = "1";
    popupContainer.style.pointerEvents = "auto";
}

function hidePopup() {
    popupContainer.style.opacity = "0";
    popupContainer.style.pointerEvents = "none";
}

function runPopupPreviewCode(){
    previewIframe.contentWindow.location.reload();

    previewIframe.addEventListener("load", () => {
        previewIframe.contentWindow.postMessage(getCodeFromEditor())
    })
}

function checkSharedStatus(){
    database.ref("sharedProjects/metadata/"+getSharedProjectId(projectId,getStoredUser().uid)).once("value", (snap) => {
        if(snap.exists()){
            console.log("project is shared!");
            shareButton.innerText = "Update";
        }
    })
}

checkSharedStatus();