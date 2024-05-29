//https://stackoverflow.com/questions/59935608/solved-get-user-auth-data-from-firebase-add-it-to-firebase-db

function createUserDefault(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("created user");
            storeUser(userCredential.user);
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message);
        });
}

function logInUserDefault(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("logged in user");
            storeUser(userCredential.user);
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message);
        });

}

function logOutUserDefault(){
    firebase.auth().signOut().then(() => {
        console.log("logged out user");
        clearStoredUser();
    }).catch((error) => {
        handleAuthErrors(error.code,error.message);
    });
}

function handleAuthErrors(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    console.error("Auth error: ",errorCode,errorMessage);
    if(errorCode==="auth/internal-error"){
        let errorObj = JSON.parse(errorMessage).error;
        if(errorObj.message==="INVALID_LOGIN_CREDENTIALS"){
           return "invalid credentials";
        }
    }
    if(errorCode==="auth/invalid-email"){
        return "invalid email";
    }
    return "ok";
}

function storeUser(user){
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("currentUser",JSON.stringify(user));
}

function clearStoredUser(){
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("currentUser",null);
}

function getStoredUser(){
    let jsonUser = sessionStorage.getItem("currentUser")
    if(jsonUser!==null){
        return JSON.parse(jsonUser);
    }
    return null;
}

function isLoggedIn(){
    return sessionStorage.getItem("isLoggedIn")==="true";
}