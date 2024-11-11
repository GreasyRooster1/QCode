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

function promptProfileIconChange(){
    let imageLink = prompt("Enter link to profile");
    if(isValidUrl(imageLink)){
        database.ref("userdata/"+getStoredUser().uid+"/profileIcon").set(imageLink);
        profileDisplayImg.setAttribute("src", imageLink);
    }else{
        console.log("not a url");
    }
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