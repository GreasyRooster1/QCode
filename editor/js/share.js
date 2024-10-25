const shareButton = document.querySelector('.share-button');
const popupContainer = document.querySelector('.share-popup-container');
const sharePopupButton = document.querySelector('.share-popup-button');
const shareNameInput = document.querySelector('.share-name-input');
const previewIframe = document.getElementById('share-preview-frame');

shareButton.addEventListener('click', (e) => {
    rawSave();
    showPopup();
    runPopupPreviewCode();
});

sharePopupButton.addEventListener('click', (e) => {
    if(shareNameInput.value === ''){
        shareNameInput.style.border = "5px solid red";
        return;
    }
    let projectId = generateSharedProjectId()
    //set metadata
    database.ref("sharedProjects/metadata/"+projectId).set({
        author:getStoredUser(),
        name:shareNameInput.value,
        timestamp:Date.now()/1000,
    })
})

function showPopup(){
    popupContainer.style.opacity = "1";
    popupContainer.style.pointerEvents = "auto";
}

function runPopupPreviewCode(){
    previewIframe.contentWindow.location.reload();

    previewIframe.addEventListener("load", () => {
        previewIframe.contentWindow.postMessage(getCodeFromEditor())
    })
}
