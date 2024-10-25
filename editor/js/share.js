const shareButton = document.querySelector('.share-button');
const popupContainer = document.querySelector('.share-popup-container');

shareButton.addEventListener('click', (e) => {
    rawSave();
    showPopup();
});

function showPopup(){
    popupContainer.style.opacity = "1";
    popupContainer.style.pointerEvents = "auto";
}
