const usernameTitle = document.querySelector('.username-title');
const profileDisplayImg = document.querySelector('.user-profile-img');
const pointsDisplayBar = document.querySelector('.user-points-progress-bar');

function loadUserDataToDisplay(){
    loadUsername();
    loadProfileIcon();
    renderPoints();
}

function loadUsername(){
    database.ref("userdata/"+getStoredUser().uid+"/username").once("value").then(function(snapshot){
        usernameTitle.innerHTML = snapshot.val();
    })
}

function loadProfileIcon(){
    database.ref("userdata/"+getStoredUser().uid+"/profileIcon").once("value").then(function(snapshot){
        profileDisplayImg.setAttribute("src", snapshot.val());
    })
}

function renderPoints(){
    database.ref("userdata/"+getStoredUser().uid+"/points").once("value").then((snapshot)=>{
        pointsDisplayBar.setAttribute("value",snapshot.val());
    })

}

const isValidUrl = urlString => {
    let inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    return inputElement.checkValidity() && urlString!==null;
}
profileDisplayImg.addEventListener("click",function (){
   promptProfileIconChange();
});

loadUserDataToDisplay();