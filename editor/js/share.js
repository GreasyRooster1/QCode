const shareButton = document.querySelector('.share-button');
const popupContainer = document.querySelector('.share-popup-container');
const sharePopupButton = document.querySelector('.share-popup-button');
const previewIframe = document.getElementById('share-preview-frame');

shareButton.addEventListener('click', (e) => {
    rawSave();
    showPopup();
    runPopupPreviewCode();
});

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


sharePopupButton.addEventListener('click', (e) => {

})