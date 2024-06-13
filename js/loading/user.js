const usernameTitle = document.querySelector('.username-title');
const profileDisplayImg = document.querySelector('.user-profile-img');

function loadUserDataToDisplay(){
    loadUsername();
    loadProfileIcon();
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

loadUserDataToDisplay();