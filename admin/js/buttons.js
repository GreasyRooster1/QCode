const lessonCreatorButton = document.querySelector(".lesson-creator-button");
const homeButton = document.querySelector(".home-button");
const addUserButton = document.querySelector(".create-user-button");


lessonCreatorButton.addEventListener("click",(e) => {
    window.location.href = "../editor/editor.html?projectId=$$lesson$$creator$$"
})

homeButton.addEventListener("click",(e)=>{
    window.location.href = "../";
})

addUserButton.addEventListener("click",(e)=>{
    let username = prompt("enter new username:")

    if(username==null){
        return;
    }

    let password = prompt("enter password");
    let email = extractEmailFromUsername(username);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential.user);
            storeUser(userCredential.user);
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message);
        });
})