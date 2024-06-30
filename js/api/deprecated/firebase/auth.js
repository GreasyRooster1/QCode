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
           return "invalid-credentials";
        }
    }

    return errorCode;
}

function displayAuthErrors(errorType){
    switch (errorType){
        case "invalid-credentials": showAuthError("Username or password is incorrect"); return;
        case "auth/invalid-email": showAuthError("That username is not valid");return;
        case "auth/email-already-in-use": showAuthError("That account already exists!");return;
        case "auth/network-request-failed": showAuthError("Bad network!");return;
        case "something went wrong!": break;
    }
}

function storeUser(user){

}

function storeUserPermissions(perms){
    sessionStorage.setItem("currentUserPermissions",JSON.stringify(perms));
}

function clearStoredUser(){
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("currentUser",null);
    sessionStorage.setItem("currentUserPermissions",null);

}

function getStoredUser(){
    let jsonUser = sessionStorage.getItem("currentUser")
    if(jsonUser!==null){
        return JSON.parse(jsonUser);
    }
    return null;
}
function getStoredUserPermissions(){
    let jsonUserPerms = sessionStorage.getItem("currentUserPermissions")
    if(jsonUserPerms!==null){
        return JSON.parse(jsonUserPerms);
    }
    return null;
}
