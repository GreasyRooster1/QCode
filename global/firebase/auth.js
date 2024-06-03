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
    if(errorCode==="auth/email-already-in-use"){
        return "email already in use";
    }
    return "ok";
}

function displayAuthErrors(errorType){
    switch (errorType){
        case "invalid credentials": showAuthError("Username or password is incorrect"); return;
        case "invalid email": showAuthError("That username is not valid");return;
        case "email already in use": showAuthError("That account already exists!");return;
        case "ok": break;
    }
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


//firebase auth requires email, but users should log in and create an account based on a username
//i am aware this is bad
function extractEmailFromUsername(username){
    return username+"@thisisnotanemail.noreply.com"
}

function extractUsernameFromEmail(email){
    return email.replace("@thisisnotanemail.noreply.com","");
}